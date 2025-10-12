import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Delhi',
    text: 'Our stay at the Loktak Lake View Homestay was magical. The hosts treated us like family and showed us the real beauty of Manipur. The floating phumdis are a must-see!',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Mumbai',
    text: 'The Mountain Retreat in Ukhrul was the perfect escape from city life. We enjoyed trekking, local cuisine, and the warm hospitality of our hosts. Will definitely return!',
    rating: 4,
    image: 'https://i.pravatar.cc/150?img=53',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    location: 'London',
    text: 'The heritage villa in Imphal gave us authentic insights into Manipuri culture. The traditional dance performance arranged by our host was the highlight of our trip.',
    rating: 5,
    image: 'https://i.pravatar.cc/150?img=47',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto">
        <h2 className="section-title text-center">What Our Guests Say</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Hear from travelers who have experienced the magic of Manipur through
          our homestays
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {/* Stars */}
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < testimonial.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
