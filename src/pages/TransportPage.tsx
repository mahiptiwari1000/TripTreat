import React, { useState } from 'react';
 import Navbar from '../components/Navbar';
 import Footer from '../components/Footer';
 import { Button } from '@/components/ui/button';
 import { Car, Truck } from 'lucide-react';
 import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
 import TransportBookingDialog from '@/components/TransportBookingDialog';
 import { toast } from 'sonner';
 
 const transportOptions = [
   {
     id: 'cab',
     title: 'Book a Cab',
     description: 'Request a cab for local or outstation travel in Manipur',
     icon: Car,
     image: '/lovable-uploads/taxi.jpg'
   },
   {
     id: 'rental',
     title: 'Rent a Vehicle',
     description: 'Self-drive options available for daily or weekly rentals',
     icon: Truck,
     image: '/lovable-uploads/rental.jpeg'
   }
 ];
 
 const TransportPage = () => {
   const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState<string | null>(null);
 
   const handleOptionSelect = (optionId: string) => {
     setSelectedOption(optionId);
     setBookingDialogOpen(true);
     
     toast.info(`${optionId === 'cab' ? 'Cab booking' : 'Vehicle rental'} dialog opened`, {
       description: "Complete the form to proceed with your request"
     });
   };
 
   return (
     <div className="min-h-screen flex flex-col">
       <Navbar />
       
       <main className="flex-1 container mx-auto px-4 py-8">
         <div className="space-y-8">
           <div className="text-center max-w-3xl mx-auto">
             <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in">
               Transportation Services
             </h1>
             <p className="text-muted-foreground mb-8 animate-fade-in">
               Explore Manipur with ease using our reliable transportation services.
               Choose between booking a cab or renting a vehicle for your convenience.
             </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {transportOptions.map((option) => (
               <Card 
                 key={option.id} 
                 className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in h-full flex flex-col"
               >
                 <div className="aspect-video overflow-hidden">
                   <img 
                     src={option.image} 
                     alt={option.title}
                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                   />
                 </div>
                 
                 <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                     <option.icon className="h-5 w-5 text-primary" />
                     {option.title}
                   </CardTitle>
                   <CardDescription>{option.description}</CardDescription>
                 </CardHeader>
                 
                 <CardContent className="flex-grow">
                   <ul className="space-y-2 text-sm">
                     {option.id === 'cab' ? (
                       <>
                         <li className="flex items-center gap-2">
                           <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                           Airport pickups and drops
                         </li>
                         <li className="flex items-center gap-2">
                           <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                           Local sightseeing tours
                         </li>
                         <li className="flex items-center gap-2">
                           <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                           Outstation travel options
                         </li>
                       </>
                     ) : (
                       <>
                         <li className="flex items-center gap-2">
                           <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                           Cars, SUVs, and minivans available
                         </li>
                         <li className="flex items-center gap-2">
                           <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                           Daily and weekly rental options
                         </li>
                         <li className="flex items-center gap-2">
                           <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                           Self-drive or chauffeur-driven
                         </li>
                       </>
                     )}
                   </ul>
                 </CardContent>
                 
                 <CardFooter>
                   <Button 
                     onClick={() => handleOptionSelect(option.id)}
                     className="w-full bg-primary hover:bg-primary/90 group"
                   >
                     <option.icon className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                     {option.id === 'cab' ? 'Book Cab Now' : 'Rent Vehicle'}
                   </Button>
                 </CardFooter>
               </Card>
             ))}
           </div>
           
           <div className="mt-16 bg-muted/30 rounded-lg p-6 max-w-4xl mx-auto text-center">
             <h2 className="text-xl font-semibold mb-4">Why Choose Our Transport Services?</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-background p-4 rounded-lg shadow-sm">
                 <h3 className="font-medium text-primary mb-2">Reliable</h3>
                 <p className="text-sm text-muted-foreground">Well-maintained vehicles and professional drivers ensuring your safety.</p>
               </div>
               <div className="bg-background p-4 rounded-lg shadow-sm">
                 <h3 className="font-medium text-primary mb-2">Convenient</h3>
                 <p className="text-sm text-muted-foreground">Easy booking process with flexible scheduling and pickup options.</p>
               </div>
               <div className="bg-background p-4 rounded-lg shadow-sm">
                 <h3 className="font-medium text-primary mb-2">Local Expertise</h3>
                 <p className="text-sm text-muted-foreground">Our drivers are locals who know the best routes throughout Manipur.</p>
               </div>
             </div>
           </div>
         </div>
       </main>
       
       <Footer />
       
       {/* Transport Booking Dialog */}
       <TransportBookingDialog 
         isOpen={bookingDialogOpen}
         onClose={() => setBookingDialogOpen(false)}
         transportType={selectedOption}
       />
     </div>
   );
 };
 
 export default TransportPage;