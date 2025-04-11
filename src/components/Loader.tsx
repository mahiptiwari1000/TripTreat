
import React from 'react';
 
 const Loader = () => {
   return (
     <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
       <div className="mb-8 text-5xl md:text-6xl font-bold flex items-end">
         <span className="text-[#147B58] animate-bounce-staggered-1">T</span>
         <span className="text-[#147B58] animate-bounce-staggered-2">r</span>
         <span className="text-[#147B58] animate-bounce-staggered-3">i</span>
         <span className="text-[#147B58] animate-bounce-staggered-4">p</span>
         <span className="text-[#E07A5F] animate-bounce-staggered-5 mx-1">&</span>
         <span className="text-[#147B58] animate-bounce-staggered-6">T</span>
         <span className="text-[#147B58] animate-bounce-staggered-7">r</span>
         <span className="text-[#147B58] animate-bounce-staggered-8">e</span>
         <span className="text-[#147B58] animate-bounce-staggered-9">a</span>
         <span className="text-[#147B58] animate-bounce-staggered-10">t</span>
       </div>
       
       {/* Loading indicator */}
       <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
         <div className="h-full bg-gradient-to-r from-[#147B58] via-[#E07A5F] to-[#147B58] animate-[loader_10s_linear]"></div>
       </div>
       <p className="text-gray-500 mt-4 animate-pulse">Discovering From Homestays to Hidden Trails...</p>
     </div>
   );
 };
 
 export default Loader;