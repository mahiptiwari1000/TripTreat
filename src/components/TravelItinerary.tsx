import React from 'react';
 import { Card, CardContent } from '@/components/ui/card';
 import { Button } from '@/components/ui/button';
 import { Bookmark, Calendar, ArrowDownToLine, Share2 } from 'lucide-react';
 
 interface TravelItineraryProps {
   itinerary: string;
   onSave?: () => void;
   alreadySaved?: boolean;
 }
 
 const TravelItinerary: React.FC<TravelItineraryProps> = ({ 
   itinerary, 
   onSave,
   alreadySaved = false
 }) => {
   // Function to convert markdown-style content to HTML-like display
   const formatItineraryContent = (text: string) => {
     // Split the text by newlines
     const lines = text.split('\n');
     
     return lines.map((line, index) => {
       // Check if line is a header
       if (line.startsWith('# ')) {
         return <h2 key={index} className="text-xl font-bold mt-4 mb-2">{line.slice(2)}</h2>;
       }
       if (line.startsWith('## ')) {
         return <h3 key={index} className="text-lg font-semibold mt-3 mb-1">{line.slice(3)}</h3>;
       }
       if (line.startsWith('### ')) {
         return <h4 key={index} className="text-base font-semibold mt-2 mb-1">{line.slice(4)}</h4>;
       }
       
       // Check if line is a list item
       if (line.match(/^\d+\./)) {
         return <div key={index} className="ml-4 my-1">• {line.replace(/^\d+\./, '')}</div>;
       }
       if (line.startsWith('- ') || line.startsWith('* ')) {
         return <div key={index} className="ml-4 my-1">• {line.slice(2)}</div>;
       }
       
       // Check if line is empty (for spacing)
       if (line.trim() === '') {
         return <div key={index} className="my-2"></div>;
       }
       
       // Regular paragraph
       return <p key={index} className="my-1">{line}</p>;
     });
   };
 
   return (
     <Card className="w-full bg-white shadow-md border-0">
       <CardContent className="pt-6">
         <div className="prose max-w-none">
           {formatItineraryContent(itinerary)}
         </div>
         
         <div className="mt-6 flex flex-wrap gap-2">
           {!alreadySaved && onSave && (
             <Button 
               onClick={onSave} 
               variant="outline" 
               className="flex items-center gap-2"
             >
               <Bookmark size={16} />
               Save Itinerary
             </Button>
           )}
           
           <Button
             variant="outline"
             className="flex items-center gap-2"
             onClick={() => {
               // Create a blob with the itinerary content
               const blob = new Blob([itinerary], { type: 'text/plain' });
               const url = URL.createObjectURL(blob);
               const a = document.createElement('a');
               a.href = url;
               a.download = 'manipur-travel-itinerary.txt';
               document.body.appendChild(a);
               a.click();
               document.body.removeChild(a);
               URL.revokeObjectURL(url);
             }}
           >
             <ArrowDownToLine size={16} />
             Download
           </Button>
           
           <Button
             variant="outline"
             className="flex items-center gap-2"
             onClick={() => {
               if (navigator.share) {
                 navigator.share({
                   title: 'My Manipur Travel Itinerary',
                   text: 'Check out my travel itinerary for Manipur!',
                 })
                 .catch(console.error);
               }
             }}
           >
             <Share2 size={16} />
             Share
           </Button>
           
           <Button
             variant="outline"
             className="flex items-center gap-2"
             onClick={() => window.print()}
           >
             <Calendar size={16} />
             Print
           </Button>
         </div>
       </CardContent>
     </Card>
   );
 };
 
 export default TravelItinerary;