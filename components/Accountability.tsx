
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const Accountability: React.FC = () => {
  const [mode, setMode] = useState<'chat' | 'call'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Simulate existing chat messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: 'assistant', content: 'Warrior_42: Stayed strong today! Praying for all of you.', timestamp: new Date(), userAlias: 'Warrior_42' },
        { role: 'assistant', content: 'LightSeeker: Day 12 and feeling the clarity. Don’t give up.', timestamp: new Date(), userAlias: 'LightSeeker' },
        { role: 'assistant', content: 'BrotherInArms: Just hit the gym to kill an urge. It works!', timestamp: new Date(), userAlias: 'BrotherInArms' },
      ]);
    }
  }, []);

  // --- AUDIO UTILITIES ---
  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  const startCall = async () => {
    try {
      setIsCalling(true);
      setCallDuration(0);
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopCall(),
          onerror: (e) => console.error('Call error:', e),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
          systemInstruction: 'You are an Accountability Partner on a live call. Be supportive, firm but kind, and help the user stay focused on their goals. Use a calm, reassuring tone.'
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start call', err);
      setIsCalling(false);
    }
  };

  const stopCall = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    setIsCalling(false);
  };

  useEffect(() => {
    let timer: any;
    if (isCalling) {
      timer = setInterval(() => setCallDuration(d => d + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isCalling]);

  const handleSendChat = () => {
    if (!input.trim()) return;
    const newMsg: Message = { role: 'user', content: `You: ${input}`, timestamp: new Date(), userAlias: 'You' };
    setMessages([...messages, newMsg]);
    setInput('');
    // Simulate auto-response from community
    setTimeout(() => {
      const responses = [
        "Warrior_99: We're with you, brother!",
        "Grace_Wins: Stay strong! You've got this.",
        "FaithfulOne: Romans 8:37 - More than conquerors!"
      ];
      const randomMsg: Message = { 
        role: 'assistant', 
        content: responses[Math.floor(Math.random() * responses.length)], 
        timestamp: new Date(), 
        userAlias: 'Community' 
      };
      setMessages(prev => [...prev, randomMsg]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <header>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white serif">Accountability Circle</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Connect anonymously for strength and support.</p>
      </header>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        <button 
          onClick={() => setMode('chat')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'chat' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-500'}`}
        >
          COMMUNITY CHAT
        </button>
        <button 
          onClick={() => setMode('call')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'call' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300' : 'text-slate-500 dark:text-slate-500'}`}
        >
          LIVE SUPPORT CALL
        </button>
      </div>

      {mode === 'chat' ? (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-2xl text-sm shadow-sm ${m.userAlias === 'You' ? 'bg-indigo-600 dark:bg-indigo-700 text-white ml-auto max-w-[80%]' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 max-w-[80%]'}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Encourage others..."
              className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
            <button onClick={handleSendChat} className="bg-indigo-600 dark:bg-indigo-700 text-white p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-indigo-900 dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          {/* Animated Background Rings */}
          <div className={`absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none ${isCalling ? 'animate-pulse' : ''}`}>
             <div className="w-64 h-64 border border-white rounded-full scale-150"></div>
             <div className="w-48 h-48 border border-white rounded-full absolute"></div>
          </div>

          {!isCalling ? (
            <div className="text-center z-10 space-y-6">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <span className="text-4xl">📞</span>
              </div>
              <h3 className="text-2xl font-bold serif">Anonymous Live Support</h3>
              <p className="text-indigo-200 dark:text-slate-400 text-sm max-w-xs mx-auto">Connect instantly with a compassionate accountability AI voice. Perfect for moments of intense temptation.</p>
              <button 
                onClick={startCall}
                className="w-full bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-400 dark:hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl transition-all active:scale-95"
              >
                Start Support Call
              </button>
            </div>
          ) : (
            <div className="text-center z-10 space-y-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-indigo-500/30 dark:bg-indigo-600/30 rounded-full flex items-center justify-center animate-bounce mb-4 border-2 border-white/40">
                  <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-3xl text-indigo-600 dark:text-indigo-400">🎙️</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-indigo-100 dark:text-slate-300">Call in Progress</h3>
                <p className="text-3xl font-mono mt-2">
                  {Math.floor(callDuration / 60)}:{(callDuration % 60).toString().padStart(2, '0')}
                </p>
              </div>
              
              <div className="flex items-center space-x-4 bg-indigo-800/50 dark:bg-slate-800/50 p-4 rounded-2xl backdrop-blur-md">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <p className="text-xs font-medium text-indigo-100 dark:text-slate-300">"Speak freely. I am listening and here to help you stay strong."</p>
              </div>

              <button 
                onClick={stopCall}
                className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-rose-600 transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white rotate-[135deg]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accountability;
