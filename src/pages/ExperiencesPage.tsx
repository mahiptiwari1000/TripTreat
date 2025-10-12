import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Clock,
  Star,
  Users,
  Calendar as CalendarIcon,
  Info,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ExperienceDetailsDialog from '@/components/ExperienceDetailsDialog';

const experiences = [
  {
    id: 1,
    name: 'Traditional Manipuri Cooking Class',
    location: 'Imphal, Manipur',
    description:
      'Learn to cook authentic Manipuri dishes with a local chef, including Eromba, Chamthong, and traditional black rice desserts.',
    image: '/file-uploads/foodcar1.png',
    price: 1200,
    duration: '3 hours',
    maxParticipants: 8,
    rating: 4.9,
    reviews: 24,
    category: 'Culinary',
    host: 'Bina Devi',
    hostImage: 'https://i.pravatar.cc/150?img=32',
    included: [
      'All ingredients',
      'Recipe booklet',
      'Tea and snacks',
      'Cooking equipment',
    ],
  },
  {
    id: 2,
    name: 'Phumdis Boat Tour on Loktak Lake',
    location: 'Moirang, Manipur',
    description:
      'Experience the unique floating islands of Loktak Lake on a traditional boat. Learn about the ecosystem and visit local fishing communities.',
    image: '/file-uploads/loktakView.webp',
    price: 800,
    duration: '2 hours',
    maxParticipants: 6,
    rating: 4.8,
    reviews: 36,
    category: 'Nature',
    host: 'Tomba Singh',
    hostImage: 'https://i.pravatar.cc/150?img=68',
    included: ['Boat ride', 'Life jackets', 'Local tea', 'Photography spots'],
  },
  {
    id: 3,
    name: 'Manipuri Classical Dance Workshop',
    location: 'Imphal, Manipur',
    description:
      'Learn the basics of Manipuri classical dance, one of the eight major classical dance forms of India, with a renowned dancer.',
    image: '/file-uploads/dance.jpg',
    price: 1500,
    duration: '4 hours',
    maxParticipants: 10,
    rating: 4.7,
    reviews: 18,
    category: 'Cultural',
    host: 'Radha Devi',
    hostImage: 'https://i.pravatar.cc/150?img=47',
    included: [
      'Dance costume rental',
      'Professional instruction',
      'Certificate of participation',
      'Cultural refreshments',
    ],
  },
  {
    id: 4,
    name: 'Handloom Weaving Experience',
    location: 'Wangkhei, Imphal',
    description:
      'Try your hand at traditional Manipuri handloom weaving. Create your own piece of fabric under the guidance of skilled artisans.',
    image: '/file-uploads/hand.jpg',
    price: 1000,
    duration: '3 hours',
    maxParticipants: 4,
    rating: 4.9,
    reviews: 12,
    category: 'Crafts',
    host: 'Ibemhal Devi',
    hostImage: 'https://i.pravatar.cc/150?img=24',
    included: [
      'Materials',
      'Small loom to take home',
      'Finished product to keep',
      'Refreshments',
    ],
  },
  {
    id: 5,
    name: 'Sunrise Photography at Shirui Hills',
    location: 'Ukhrul, Manipur',
    description:
      'Capture the breathtaking sunrise from Shirui Hills. Perfect for photography enthusiasts of all levels.',
    image: '/file-uploads/sun.jpg',
    price: 1800,
    duration: '5 hours',
    maxParticipants: 6,
    rating: 4.8,
    reviews: 9,
    category: 'Photography',
    host: 'Rahul Sharma',
    hostImage: 'https://i.pravatar.cc/150?img=53',
    included: [
      'Transportation to viewpoint',
      'Professional photography tips',
      'Breakfast picnic',
      'Hot beverages',
    ],
  },
  {
    id: 6,
    name: 'Traditional Pottery Workshop',
    location: 'Andro Village, Manipur',
    description:
      'Learn the ancient pottery techniques of Andro village, known for its unique black pottery tradition passed down through generations.',
    image: '/file-uploads/pot.jpg',
    price: 950,
    duration: '4 hours',
    maxParticipants: 8,
    rating: 4.6,
    reviews: 15,
    category: 'Crafts',
    host: 'Chaoba Singh',
    hostImage: 'https://i.pravatar.cc/150?img=60',
    included: [
      'All materials',
      'Firing of your creation',
      'Village tour',
      'Traditional lunch',
    ],
  },
];

const categories = [
  'All',
  'Culinary',
  'Nature',
  'Cultural',
  'Crafts',
  'Photography',
];

const ExperiencesPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'All') {
      setFilteredExperiences(
        experiences.filter(
          exp =>
            exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exp.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredExperiences(
        experiences.filter(
          exp =>
            exp.category === value &&
            (exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              exp.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (activeTab === 'All') {
      setFilteredExperiences(
        experiences.filter(
          exp =>
            exp.name.toLowerCase().includes(term.toLowerCase()) ||
            exp.description.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredExperiences(
        experiences.filter(
          exp =>
            exp.category === activeTab &&
            (exp.name.toLowerCase().includes(term.toLowerCase()) ||
              exp.description.toLowerCase().includes(term.toLowerCase()))
        )
      );
    }
  };

  const handleSeeDetails = experience => {
    setSelectedExperience(experience);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img
          src="/file-uploads/expcar.jpg"
          alt="Manipur Experiences"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
            Authentic Experiences
          </h1>
          <p className="text-xl text-white/90 animate-fade-in transition-all duration-500 delay-150">
            Immerse yourself in the culture and traditions of Manipur
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search experiences..."
              className="md:max-w-sm"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <Tabs
            defaultValue="All"
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <TabsList className="inline-flex h-auto flex-wrap gap-2 mb-6 bg-transparent">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExperiences.map(experience => (
                    <Card
                      key={experience.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:scale-[1.01] group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={experience.image}
                          alt={experience.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-sm font-semibold flex items-center">
                          <Star
                            size={16}
                            className="text-yellow-500 mr-1 fill-yellow-500"
                          />
                          {experience.rating}{' '}
                          <span className="text-muted-foreground ml-1">
                            ({experience.reviews})
                          </span>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-primary animate-fade-in">
                          {experience.category}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <img
                            src={experience.hostImage}
                            alt={experience.host}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-medium">
                              Hosted by {experience.host}
                            </h4>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">
                          {experience.name}
                        </h3>

                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span className="text-sm">{experience.location}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-sm">
                            <Clock
                              size={14}
                              className="mr-1 text-muted-foreground"
                            />
                            <span>{experience.duration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users
                              size={14}
                              className="mr-1 text-muted-foreground"
                            />
                            <span>Up to {experience.maxParticipants}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {experience.description}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="text-lg font-bold text-primary">
                            ₹{experience.price}
                            <span className="text-xs text-muted-foreground font-normal">
                              /person
                            </span>
                          </div>
                          <Button
                            className="bg-primary hover:bg-primary/90 flex items-center gap-1 transition-all duration-300"
                            size="sm"
                            onClick={() => handleSeeDetails(experience)}
                          >
                            <Info size={14} />
                            See Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredExperiences.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      No experiences found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try a different search term or category
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveTab('All');
                        setFilteredExperiences(experiences);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="bg-muted/30 rounded-lg p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Want to Host Your Own Experience?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Share your skills, knowledge, or unique cultural perspective with
            travelers. Become a host and earn while showcasing the best of
            Manipur.
          </p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/become-host">Apply to Become a Host</Link>
          </Button>
        </div>
      </div>

      <ExperienceDetailsDialog
        experience={selectedExperience}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ExperiencesPage;
