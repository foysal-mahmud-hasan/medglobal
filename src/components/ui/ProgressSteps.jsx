import React from 'react';

export default function ProgressSteps({ current, total, labels = [] }) {
  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: total }).map((_, i) => (
          <React.Fragment key={i}>
            <div className={`flex flex-col items-center`}>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  i < current 
                    ? 'bg-emerald-500 text-white' 
                    : i === current 
                      ? 'bg-sky-500 text-white ring-4 ring-sky-200' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i < current ? '✓' : i + 1}
              </div>
              {labels[i] && (
                <span className={`text-xs mt-1 ${i <= current ? 'text-gray-700' : 'text-gray-400'}`}>
                  {labels[i]}
                </span>
              )}
            </div>
            {i < total - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded ${i < current ? 'bg-emerald-500' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}