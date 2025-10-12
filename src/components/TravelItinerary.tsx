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
  alreadySaved = false,
}) => {
  const extractTotalBudget = (text: string) => {
    const budgetMatch = text.match(/Total Budget:.*?₹(\d+)/);
    return budgetMatch ? budgetMatch[1] : '0';
  };

  const cleanContentView = (text: string) => {
    return text
      .replace(/\*\*/g, '')
      .replace(/#+/g, '')
      .replace(/- /g, '• ')
      .replace(/\d+\./g, '•')
      .replace(/\|/g, ' ')
      .replace(/₹+/g, '₹')
      .replace(/(₹\s*)+/g, '₹ ')
      .replace(/^₹$/gm, '')
      .replace(/--+/g, '──────────────────────────────────')
      .replace(/Travel Itinerary for Manipur, India\n/g, '')
      .replace(/Duration:.*?\n/g, '');
  };

  const formatItineraryContent = (text: string) => {
    const lines = cleanContentView(text).split('\n');
    let hasProcessedHeader = false;
    const totalBudget = extractTotalBudget(itinerary);

    return lines
      .map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Main header processing
        if (trimmed.startsWith('Total Budget:')) {
          if (hasProcessedHeader) return null;
          hasProcessedHeader = true;

          return (
            <div key={index} className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Travel Itinerary for Manipur, India
              </h1>
              <div className="mt-2 text-lg font-semibold text-green-600">
                {trimmed.replace(/₹/, '₹ ')}
              </div>
            </div>
          );
        }

        // Section headers
        if (trimmed.match(/^[A-Z\s-]{15,}/)) {
          return <hr key={index} className="my-4 border-t border-gray-200" />;
        }

        // Day headers
        if (trimmed.startsWith('Day ')) {
          return (
            <h2
              key={index}
              className="text-xl font-bold mt-6 mb-3 text-blue-800"
            >
              {trimmed.replace(/₹/g, '').trim()}
            </h2>
          );
        }

        // Budget breakdown
        if (trimmed.startsWith('Day ') || trimmed.startsWith('Total')) {
          const parts = trimmed.split(/(₹|\s{2,})/).filter(Boolean);
          const item = parts.slice(0, -2).join(' ').trim();
          const cost = parts.slice(-1)[0].trim();

          return (
            <div key={index} className="flex justify-between my-1 px-2">
              <span className="text-gray-700">{item}</span>
              <span className="font-medium text-green-700">₹{cost}</span>
            </div>
          );
        }

        // Section titles
        if (trimmed.endsWith(':')) {
          return (
            <div key={index} className="font-semibold mt-3 mb-1 text-gray-700">
              {trimmed.replace(/:/, '')}
            </div>
          );
        }

        // List items
        if (trimmed.startsWith('•')) {
          return (
            <div key={index} className="ml-4 my-1 flex items-start">
              <span className="mr-2">•</span>
              <span className="flex-1 text-gray-600">
                {trimmed.slice(1).trim().replace(/₹+/g, '₹ ')}
              </span>
            </div>
          );
        }

        // Final note correction
        if (trimmed.includes('Enjoy your trip')) {
          return (
            <p key={index} className="mt-4 text-sm italic text-gray-500">
              {trimmed.replace(/₹ •/, `₹${totalBudget}`).replace('•', '')}
            </p>
          );
        }

        // Regular text
        return (
          <p key={index} className="my-2 text-gray-600">
            {trimmed.replace(/₹+/g, '₹ ')}
          </p>
        );
      })
      .filter(Boolean);
  };

  const getPrintableContent = () => {
    const totalBudget = extractTotalBudget(itinerary);
    return itinerary
      .replace(/\*\*/g, '')
      .replace(/#+/g, '')
      .replace(/- /g, '• ')
      .replace(/\d+\./g, '•')
      .replace(/\|/g, ' ')
      .replace(/--+/g, '──────────────────────────────────')
      .replace(/₹ •/, `₹${totalBudget}`)
      .split('\n')
      .map(line => line.trim())
      .filter(line => !line.match(/^₹+$/))
      .join('\n');
  };

  return (
    <Card className="w-full bg-white shadow-lg border-0">
      <CardContent className="pt-4">
        <div className="itinerary-content font-sans text-sm">
          {formatItineraryContent(itinerary)}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {!alreadySaved && onSave && (
            <Button
              onClick={onSave}
              variant="outline"
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50"
            >
              <Bookmark size={16} className="text-blue-600" />
              <span className="text-blue-700">Save Plan</span>
            </Button>
          )}

          <Button
            variant="outline"
            className="flex items-center gap-2 border-green-200 hover:bg-green-50"
            onClick={() => {
              const blob = new Blob([getPrintableContent()], {
                type: 'text/plain',
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'manipur-travel-plan.txt';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
          >
            <ArrowDownToLine size={16} className="text-green-600" />
            <span className="text-green-700">Download</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 border-purple-200 hover:bg-purple-50"
            onClick={() => window.print()}
          >
            <Calendar size={16} className="text-purple-600" />
            <span className="text-purple-700">Print</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelItinerary;
