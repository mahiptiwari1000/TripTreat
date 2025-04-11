
import React from 'react';
 
 const Loader = () => {
   return (
     <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
       <div className="mb-8 text-5xl md:text-6xl font-bold">
         <span className="text-[#147B58]">Trip</span>
         <span className="text-[#E07A5F]">&</span>
         <span className="text-[#147B58]">Treat</span>
       </div>
       
       {/* Loading indicator */}
       <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
         <div className="h-full bg-gradient-to-r from-[#147B58] via-[#E07A5F] to-[#147B58] animate-[loader_10s_linear]"></div>
       </div>
     </div>
   );
 };
 
 export default Loader;