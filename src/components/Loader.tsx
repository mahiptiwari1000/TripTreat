import React from 'react';

interface LoaderProps {
  progress?: number;
}

const Loader: React.FC<LoaderProps> = ({ progress = 0 }) => {
  // Calculate the percentage to display (0-100)
  const displayProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      role="status"
      aria-label="Loading application"
    >
      <div className="mb-8 text-5xl md:text-6xl font-bold flex items-end">
        <span className="text-[#147B58] animate-bounce-staggered-1">T</span>
        <span className="text-[#147B58] animate-bounce-staggered-2">r</span>
        <span className="text-[#147B58] animate-bounce-staggered-3">i</span>
        <span className="text-[#147B58] animate-bounce-staggered-4">p</span>
        <span className="text-[#E07A5F] animate-bounce-staggered-5 mx-1">
          &
        </span>
        <span className="text-[#147B58] animate-bounce-staggered-6">T</span>
        <span className="text-[#147B58] animate-bounce-staggered-7">r</span>
        <span className="text-[#147B58] animate-bounce-staggered-8">e</span>
        <span className="text-[#147B58] animate-bounce-staggered-9">a</span>
        <span className="text-[#147B58] animate-bounce-staggered-10">t</span>
      </div>

      {/* Loading indicator */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-[#147B58] via-[#E07A5F] to-[#147B58] animate-[loader_10s_linear]"
          role="progressbar"
          aria-valuenow={displayProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Loading progress: ${displayProgress}%`}
        ></div>
      </div>
      <p className="text-gray-500 mt-4 animate-pulse">
        Discovering From Homestays to Hidden Trails...
      </p>
    </div>
  );
};

export default Loader;
