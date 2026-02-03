import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Volume2 } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function CallScreen({ type = 'audio', onEnd }) {
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Simulate connecting
    const connectTimer = setTimeout(() => {
      setConnected(true);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    let interval;
    if (connected) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connected]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-50 flex flex-col"
    >
      {/* Video background for video calls */}
      {type === 'video' && (
        <div className="absolute inset-0 bg-gray-900">
          {/* Self video preview */}
          <div className="absolute bottom-32 right-4 w-32 h-44 bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              {videoOff ? <VideoOff className="w-8 h-8" /> : '📷'}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Doctor avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-32 h-32 rounded-full bg-violet-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl mb-6"
        >
          Dr
        </motion.div>

        <h2 className="text-white text-2xl font-bold">Dr. Sarah</h2>
        <p className="text-white/60 mt-1">MedGlobal Doctor</p>

        {/* Status */}
        <div className="mt-6">
          {!connected ? (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex items-center gap-2 text-white/80"
            >
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              Connecting...
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              {formatDuration(duration)}
            </div>
          )}
        </div>

        {/* Audio wave animation for audio calls */}
        {type === 'audio' && connected && (
          <div className="flex items-center gap-1 mt-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['20px', '40px', '20px'] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                className="w-2 bg-violet-400 rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-8 pb-12">
        <div className="flex justify-center gap-6">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              muted ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
            }`}
          >
            {muted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          <button
            onClick={onEnd}
            className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30"
          >
            <PhoneOff className="w-9 h-9" />
          </button>

          {type === 'video' && (
            <button
              onClick={() => setVideoOff(!videoOff)}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                videoOff ? 'bg-rose-500 text-white' : 'bg-white/20 text-white'
              }`}
            >
              {videoOff ? <VideoOff className="w-7 h-7" /> : <Video className="w-7 h-7" />}
            </button>
          )}

          {type === 'audio' && (
            <button
              className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <Volume2 className="w-7 h-7" />
            </button>
          )}
        </div>

        <p className="text-white/40 text-center text-sm mt-6">
          Tap the red button to end the call
        </p>
      </div>
    </motion.div>
  );
}