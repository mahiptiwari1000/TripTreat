import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Users,
  Globe,
  Award,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const team = [
  {
    name: 'Rajkumar Singh',
    role: 'Founder & CEO',
    image: '/file-uploads/raj.jpg',
    bio: 'Born and raised in Imphal, Raj founded Trip & Treat to showcase the authentic beauty of his homeland to travelers from around the world.',
  },
  {
    name: 'Bina Devi',
    role: 'Community Manager',
    image: '/file-uploads/bina.jpg',
    bio: 'With deep connections to local communities, Bina ensures that our homestays and experiences maintain cultural authenticity while delivering quality service.',
  },
  {
    name: 'Tomba Singh',
    role: 'Head of Experiences',
    image: '/file-uploads/tomba.jpg',
    bio: 'A former tour guide with 15+ years of experience, Tomba carefully curates and vets all tours and experiences on the platform.',
  },
];

const milestones = [
  {
    year: '2019',
    title: 'The Beginning',
    description:
      'Trip & Treat was founded in Imphal, starting with just 5 homestays around Loktak Lake.',
  },
  {
    year: '2020',
    title: 'Digital Expansion',
    description:
      "Launched our first website and app, making Manipur's hidden gems accessible to digital travelers.",
  },
  {
    year: '2021',
    title: 'Community Growth',
    description:
      'Expanded to 50+ homestays across Manipur and began offering authentic local experiences.',
  },
  {
    year: '2022',
    title: 'Awards & Recognition',
    description:
      'Received "Best Sustainable Tourism Initiative" award from Northeast Tourism Forum.',
  },
  {
    year: '2023',
    title: 'International Reach',
    description:
      'Started welcoming guests from over 15 countries, putting Manipur on the global tourism map.',
  },
  {
    year: '2024',
    title: 'Impact Milestone',
    description:
      'Proudly supported 100+ local families through sustainable tourism, preserving cultural heritage.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[400px] mb-12">
        <img
          src="/file-uploads/stocar.jpg"
          alt="About Trip & Treat"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Connecting travelers with authentic Manipuri culture, nature, and
            hospitality since 2019
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mission & Vision */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <Badge className="mb-4 bg-primary text-white">Our Mission</Badge>
          <h2 className="text-3xl font-bold mb-6">
            Showcasing Manipur&apos;s Hidden Treasures
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Trip & Treat was born from a simple idea: to share the incredible
            beauty, culture, and hospitality of Manipur with the world while
            empowering local communities through sustainable tourism. We believe
            that travel should benefit both visitors seeking authentic
            experiences and the communities that host them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Authentic Experiences
              </h3>
              <p className="text-muted-foreground">
                We offer genuine cultural connections, not generic tourist
                experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
              <p className="text-muted-foreground">
                Every booking directly benefits local families and preserves
                cultural heritage.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sustainable Tourism
              </h3>
              <p className="text-muted-foreground">
                We promote responsible travel practices that respect the
                environment.
              </p>
            </div>
          </div>
        </div>

        {/* Journey So Far */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary text-white">Our Journey</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Milestones Along The Way
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to becoming Manipur&apos;s leading tourism
              platform, our journey has been filled with growth and gratitude.
            </p>
          </div>

          <div className="relative border-l-2 border-primary/30 ml-4 md:mx-auto md:max-w-3xl pl-8 md:pl-0">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`mb-12 relative ${index % 2 === 0 ? 'md:text-right md:pr-8 md:ml-0 md:mr-auto' : 'md:text-left md:pl-8 md:ml-auto md:mr-0'}`}
              >
                <div className="absolute -left-10 md:left-auto md:-ml-[9px] bg-primary text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md relative">
                  <Badge variant="outline" className="mb-2">
                    {milestone.year}
                  </Badge>
                  <h3 className="text-xl font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-manipur-pink text-white">Our Team</Badge>
            <h2 className="text-3xl font-bold mb-6">
              Meet The Faces Behind Trip & Treat
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re a passionate team of Manipur locals and tourism experts
              dedicated to sharing our homeland with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20 bg-muted/30 p-8 rounded-lg">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-manipur-brown text-white">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from the local hosts, guides, and community members who
              collaborate with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=44"
                  alt="Testimonial"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">Leima Devi</h3>
                  <p className="text-sm text-muted-foreground">
                    Homestay Host, Moirang
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                &quot;Partnering with Trip & Treat has transformed my life.
                I&apos;ve welcomed guests from all over the world to my home by
                Loktak Lake, sharing our culture while earning an income that
                supports my family and our traditional crafts.&quot;
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=61"
                  alt="Testimonial"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">Maipak Singh</h3>
                  <p className="text-sm text-muted-foreground">
                    Local Guide, Ukhrul
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                &quot;As a guide, I&apos;ve been able to share the beauty of my
                hometown&apos;s mountains with visitors while educating them
                about conservation. Trip & Treat has helped me build a
                sustainable tourism business that respects our
                environment.&quot;
              </p>
            </Card>
          </div>
        </div>

        {/* Join Us */}
        <div className="mb-20 text-center">
          <Badge className="mb-4 bg-manipur-blue text-white">
            Partner With Us
          </Badge>
          <h2 className="text-3xl font-bold mb-6">Be Part of Our Story</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Whether you&apos;re a potential host, guide, or want to collaborate
            with us, we&apos;re always looking to expand our family of partners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 flex flex-col items-center text-center">
              <Award size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Host Your Property</h3>
              <p className="text-muted-foreground mb-4">
                Share your home with travelers and earn income while
                representing Manipuri hospitality.
              </p>
              <Button
                className="mt-auto bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/become-host">Become a Host</Link>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center">
              <ThumbsUp size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Offer Experiences</h3>
              <p className="text-muted-foreground mb-4">
                Turn your skills, knowledge, or passion into unique experiences
                for visitors.
              </p>
              <Button
                className="mt-auto bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/become-host">Apply as Guide</Link>
              </Button>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center">
              <MessageCircle size={48} className="text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Partnerships</h3>
              <p className="text-muted-foreground mb-4">
                Businesses, NGOs, and organizations can collaborate with us on
                sustainable tourism initiatives.
              </p>
              <Button
                className="mt-auto bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
