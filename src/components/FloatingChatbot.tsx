import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  X, 
  Map, 
  UtensilsCrossed, 
  Phone, 
  Home,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type ChatbotProps = {
  className?: string;
}

const FloatingChatbot: React.FC<ChatbotProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "👋 Hi there! I'm your Trip & Treat assistant. How can I help you today?", isUser: false}
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHotspotDialog, setShowHotspotDialog] = useState(false);
  const [showHostDialog, setShowHostDialog] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([
        {text: "👋 Hi there! I'm your Trip & Treat assistant. How can I help you today?", isUser: false}
      ]);
      setSelectedOption(null);
    }
  };

  const handleOptionSelect = (option: string) => {
    setMessages([...messages, {text: option, isUser: true}]);
    
    setTimeout(() => {
      let response = '';
      switch(option) {
        case "I'm looking for places to visit":
          response = "Great! What kind of places are you interested in?";
          setSelectedOption('places');
          break;
        case "Where can I eat?":
          response = "Manipur offers many delicious dining options! What are you in the mood for?";
          setSelectedOption('eateries');
          break;
        case "I need contact details":
          response = "I'd be happy to help with contact information. What are you looking for?";
          setSelectedOption('contact');
          break;
        case "Homestay information":
          response = "Excellent choice! Our homestays offer authentic Manipuri experiences. What would you like to know?";
          setSelectedOption('homestay');
          break;
        default:
          response = "I'm not sure I understand. Could you select one of the options?";
      }
      setMessages(prev => [...prev, {text: response, isUser: false}]);
    }, 600);
  };

  const handleSubOptionSelect = (category: string) => {
    setMessages([...messages, {text: category, isUser: true}]);
    
    setTimeout(() => {
      if (selectedOption === 'places') {
        setShowHotspotDialog(true);
        setMessages(prev => [...prev, {text: "Opening the hotspots for " + category + "...", isUser: false}]);
      } else if (selectedOption === 'eateries') {
        setMessages(prev => [...prev, {text: "Here are some " + category + " recommendations in Manipur. For more options, visit our Eateries page.", isUser: false}]);
      } else if (selectedOption === 'contact') {
        if (category === 'Host contact details') {
          setShowHostDialog(true);
          setMessages(prev => [...prev, {text: "Please provide the name of the host or location you're inquiring about.", isUser: false}]);
        } else {
          setMessages(prev => [...prev, {text: "For " + category + ", you can reach our support team at support@tripandtreat.com or call +91-98765-43210.", isUser: false}]);
        }
      } else if (selectedOption === 'homestay') {
        setMessages(prev => [...prev, {text: "For information about " + category + ", please visit our Homestays page. Would you like me to direct you there?", isUser: false}]);
      }
    }, 600);
  };

  const renderOptions = () => {
    const optionStyle = "text-xs px-3 py-1 h-8 rounded-full";
    const subOptionStyle = "text-xs px-3 py-1 h-8 rounded-full whitespace-nowrap";

    if (!selectedOption) {
      return (
        <div className="flex flex-wrap gap-2 mt-3">
          <Button 
            variant="outline" 
            className={`${optionStyle} border-blue-200 text-blue-600 hover:bg-blue-50`}
            onClick={() => handleOptionSelect("I'm looking for places to visit")}
          >
            <Map size={14} className="mr-1" />
            Places
          </Button>
          <Button 
            variant="outline" 
            className={`${optionStyle} border-orange-200 text-orange-600 hover:bg-orange-50`}
            onClick={() => handleOptionSelect("Where can I eat?")}
          >
            <UtensilsCrossed size={14} className="mr-1" />
            Eateries
          </Button>
          <Button 
            variant="outline" 
            className={`${optionStyle} border-green-200 text-green-600 hover:bg-green-50`}
            onClick={() => handleOptionSelect("I need contact details")}
          >
            <Phone size={14} className="mr-1" />
            Contacts
          </Button>
          <Button 
            variant="outline" 
            className={`${optionStyle} border-purple-200 text-purple-600 hover:bg-purple-50`}
            onClick={() => handleOptionSelect("Homestay information")}
          >
            <Home size={14} className="mr-1" />
            Homestays
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
        {selectedOption === 'places' && (
          <>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Historical Sites")}>
              🏛️ Historical
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Natural Attractions")}>
              🌿 Nature
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Cultural Places")}>
              🎭 Cultural
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Adventure Locations")}>
              ⛰️ Adventure
            </Button>
          </>
        )}

        {selectedOption === 'eateries' && (
          <>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Traditional Manipuri")}>
              🍲 Traditional
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Vegetarian")}>
              🌱 Vegetarian
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Street Food")}>
              🥡 Street Food
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Fine Dining")}>
              🍽️ Fine Dining
            </Button>
          </>
        )}

        {selectedOption === 'contact' && (
          <>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Support Team")}>
              🛟 Support
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Host contact details")}>
              👤 Host Contact
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Tour Guides")}>
              🧭 Tour Guides
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Emergency")}>
              🆘 Emergency
            </Button>
          </>
        )}

        {selectedOption === 'homestay' && (
          <>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Availability")}>
              📅 Availability
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Pricing")}>
              💰 Pricing
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Amenities")}>
              🛁 Amenities
            </Button>
            <Button variant="outline" className={subOptionStyle} onClick={() => handleSubOptionSelect("Booking Process")}>
              📖 Booking
            </Button>
          </>
        )}
      </div>
    );
  };

  const handleHostLookup = () => {
    toast.info("Host information", { 
      description: "We've sent the host's contact details to your registered email address.",
      duration: 5000
    });
    setShowHostDialog(false);
    setMessages(prev => [...prev, {
      text: "For privacy reasons, we've sent the host's contact details to your registered email. If you haven't received it, please check your spam folder or contact our support team.",
      isUser: false
    }]);
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <button
          onClick={toggleChatbot}
          className={`relative p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isOpen ? 'bg-red-500' : 'bg-primary'
          }`}
        >
          {isOpen ? <X size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        </button>
        
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 h-[480px] bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in border border-gray-200">
            <div className="bg-primary p-3 text-white flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle size={18} className="mr-2" />
                <h3 className="font-medium">Trip & Treat Assistant</h3>
              </div>
              <button onClick={toggleChatbot} className="text-white/80 hover:text-white">
                <X size={18} />
              </button>
            </div>
            
            <div className="h-[calc(100%-140px)] overflow-y-auto p-3 space-y-3">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-2.5 rounded-xl max-w-[85%] text-sm ${
                    msg.isUser 
                      ? 'bg-primary text-white ml-8 rounded-br-none' 
                      : 'bg-gray-100 mr-8 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
              {renderOptions()}
            </div>
          </div>
        )}
      </div>

      <Dialog open={showHotspotDialog} onOpenChange={setShowHotspotDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Map size={20} className="text-primary" />
              <h3 className="text-lg font-medium">Explore Hotspots</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover amazing places in Manipur. Visit our Hotspots page for a complete list of attractions.
            </p>
            <div className="grid grid-cols-1 gap-2">
              <Button asChild>
                <a href="/hotspots">View All Hotspots</a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showHostDialog} onOpenChange={setShowHostDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User size={20} className="text-primary" />
              <h3 className="text-lg font-medium">Host Information</h3>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Enter host name or location</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Loktak Lake View Homestay"
              />
            </div>
            <Button onClick={handleHostLookup} className="w-full">
              Get Contact Details
            </Button>
            <p className="text-xs text-muted-foreground">
              For privacy reasons, host contact information will be sent to your registered email address.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatbot;