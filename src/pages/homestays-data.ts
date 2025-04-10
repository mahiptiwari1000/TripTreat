export interface Homestay {
    id: number;
    name: string;
    location: string;
    description: string;
    images: string[];
    price: number;
    rating: number;
    reviews: number;
    guests: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
    amenities: string[];
    rooms?: Array<{ id: number; name: string; capacity: number; price: number }>;
    host?: {
      name: string;
      image: string;
      joinedDate: string;
      languages: string[];
      responseRate: number;
    };
    reviews_list?: Array<{
      id: number;
      name: string;
      avatar: string;
      date: string;
      rating: number;
      comment: string;
    }>;
    location_description?: string;
  }
  


export const allHomestays: Homestay[] = [
    {
        id: 1,
        name: 'Loktak Lake View Homestay',
        location: 'Moirang, Manipur',
        description: 'Enjoy panoramic views of the floating phumdis on Loktak Lake in this traditional Manipuri home. This authentic homestay offers a unique opportunity to experience the local culture and cuisine while enjoying breathtaking views of Loktak Lake, the largest freshwater lake in Northeast India. The homestay is owned by a warm, welcoming family who will introduce you to traditional Manipuri hospitality.',
        images: [
          '/lovable-uploads/loktakView.webp',
          '/lovable-uploads/loktakComplete.png',
          '/lovable-uploads/h1.jpg',
          '/lovable-uploads/loktakView.webp',
          '/lovable-uploads/lok1.jpg',
        ],
        price: 1200,
        rating: 4.9,
        reviews: 28,
        guests: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        rooms: [
          { id: 1, name: 'Lake View Room', capacity: 2, price: 1200 },
          { id: 2, name: 'Garden Room', capacity: 2, price: 1000 }
        ],
        amenities: [
          'Wifi', 
          'Traditional Meals', 
          'Lake View', 
          'Guided Tours',
          'Free Parking',
          'Hot Water',
          'Kitchen Access',
          'Traditional Clothing Experience'
        ],
        host: {
          name: 'Rajkumar Singh',
          image: 'https://i.pravatar.cc/150?img=68',
          joinedDate: 'January 2020',
          languages: ['English', 'Manipuri', 'Hindi'],
          responseRate: 98
        },
        location_description: 'Located on the banks of the beautiful Loktak Lake, just 48 km from Imphal. The homestay is a short 10-minute boat ride from the main shore, offering spectacular views and peaceful surroundings.',
        reviews_list: [
          {
            id: 1,
            name: 'Priya Sharma',
            avatar: 'https://i.pravatar.cc/150?img=32',
            date: '2 months ago',
            rating: 5,
            comment: "Our stay at the Loktak Lake View Homestay was magical. The hosts treated us like family and showed us the real beauty of Manipur. The floating phumdis are a must-see!"
          },
          {
            id: 2,
            name: 'Rahul Mehta',
            avatar: 'https://i.pravatar.cc/150?img=53',
            date: '3 months ago',
            rating: 4,
            comment: "Great location and very authentic experience. The traditional meals were delicious and the host was very knowledgeable about the area. The boat tour of the lake was the highlight of our trip."
          },
          {
            id: 3,
            name: 'Sarah Johnson',
            avatar: 'https://i.pravatar.cc/150?img=47',
            date: '4 months ago',
            rating: 5,
            comment: "This homestay gave us authentic insights into Manipuri culture. The traditional dance performance arranged by our host was the highlight of our trip. Would highly recommend for anyone looking to experience the real Manipur."
          }
        ]
      },
      {
        id: 2,
        name: 'Heritage Villa Imphal',
        location: 'Imphal East, Manipur',
        description: 'Experience royal Manipuri hospitality in this heritage home with traditional architecture. Located in a serene part of Imphal East, this villa offers traditional architecture with modern amenities. The property boasts beautiful gardens and showcases authentic Manipuri design elements.',
        images: [
          '/lovable-uploads/h6.avif',
          '/lovable-uploads/h115.avif',
          '/lovable-uploads/h4.avif',
          '/lovable-uploads/h9.avif',
          '/lovable-uploads/g144.avif',
        ],
        price: 1500,
        rating: 4.7,
        reviews: 42,
        guests: 6,
        bedrooms: 3,
        beds: 4,
        bathrooms: 2,
        rooms: [
          { id: 1, name: 'Royal Suite', capacity: 2, price: 1500 },
          { id: 2, name: 'Garden Room', capacity: 2, price: 1300 },
          { id: 3, name: 'Family Room', capacity: 4, price: 1800 }
        ],
        amenities: [
          'Wifi', 
          'Garden', 
          'Traditional Meals', 
          'Cultural Activities',
          'Free Parking',
          'Hot Water',
          'Air Conditioning',
          'Historical Tour'
        ],
        host: {
          name: 'Thoibi Devi',
          image: 'https://i.pravatar.cc/150?img=48',
          joinedDate: 'March 2019',
          languages: ['English', 'Manipuri', 'Hindi', 'Bengali'],
          responseRate: 96
        },
        location_description: 'Located in the eastern part of Imphal, just 5 km from the city center. The homestay is situated in a quiet residential area with easy access to major tourist attractions in the city.',
        reviews_list: [
          {
            id: 1,
            name: 'Anand Kumar',
            avatar: 'https://i.pravatar.cc/150?img=12',
            date: '1 month ago',
            rating: 5,
            comment: "The Heritage Villa exceeded our expectations. The architecture is stunning, and the hosts made us feel like royalty. The cultural performances arranged for us were authentic and memorable."
          },
          {
            id: 2,
            name: 'Maya Singh',
            avatar: 'https://i.pravatar.cc/150?img=23',
            date: '2 months ago',
            rating: 4,
            comment: "Beautiful property with excellent service. The traditional meals were exceptional, and the rooms were spacious and comfortable. Highly recommend the historical tour offered by the host."
          },
          {
            id: 3,
            name: 'Thomas Wilson',
            avatar: 'https://i.pravatar.cc/150?img=67',
            date: '3 months ago',
            rating: 5,
            comment: "A perfect blend of tradition and modern comfort. The hosts were extremely knowledgeable about local history and culture. The villa's garden is a peaceful retreat after a day of sightseeing."
          }
        ]
      },
      {
        id: 3,
        name: 'Sunrise Peak Homestay',
        location: 'Churachandpur, Manipur',
        description: 'Wake up to breathtaking sunrises over the hills with cozy rooms and local breakfast delights. Features a sunrise viewing deck and guided morning nature walks.',
        images: [
          '/lovable-uploads/s71.avif',
          '/lovable-uploads/s72.avif',
          '/lovable-uploads/s73.avif',
          '/lovable-uploads/s74.avif',
          '/lovable-uploads/s75.avif'
        ],
        price: 1050,
        rating: 4.7,
        reviews: 22,
        guests: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        rooms: [
          { id: 1, name: 'Hill View Suite', capacity: 2, price: 1050 },
          { id: 2, name: 'Valley Room', capacity: 2, price: 950 }
        ],
        amenities: [
          'Wifi',
          'Scenic Views',
          'Local Breakfast',
          'Hiking Trails',
          'Sunrise Deck',
          'Hot Water',
          'Guided Tours',
          'Traditional Decor'
        ],
        host: {
          name: 'Sanatomba Singh',
          image: 'https://i.pravatar.cc/150?img=22',
          joinedDate: 'November 2020',
          languages: ['English', 'Manipuri', 'Hindi'],
          responseRate: 97
        },
        location_description: 'Nestled in the hills of Churachandpur district, 60 km southwest of Imphal. Offers panoramic valley views and direct access to sunrise viewing points.',
        reviews_list: [
          {
            id: 1,
            name: 'Neha Gupta',
            avatar: 'https://i.pravatar.cc/150?img=41',
            date: '2 months ago',
            rating: 5,
            comment: "The sunrise views are worth waking up early for! Hosts arranged perfect morning tea service on the viewing deck."
          },
          {
            id: 2,
            name: 'Arjun Meitei',
            avatar: 'https://i.pravatar.cc/150?img=13',
            date: '3 months ago',
            rating: 4,
            comment: "Cozy rooms with great insulation against mountain chill. The guided nature walks were informative."
          },
          {
            id: 3,
            name: 'Emily Chen',
            avatar: 'https://i.pravatar.cc/150?img=5',
            date: '1 month ago',
            rating: 5,
            comment: "Perfect blend of comfort and nature experience. Local breakfasts featured unique hill tribe recipes."
          }
        ]
      },
    
      
      {
        id: 4,
        name: 'Meghalay Cottage',
        location: 'Moreh, Manipur',
        description: 'A charming cottage blending modern comfort with traditional Manipuri aesthetics. Features handwoven textiles and daily cultural demonstrations.',
        images: [
          '/lovable-uploads/m81.avif',
          '/lovable-uploads/m82.avif',
          '/lovable-uploads/m83.avif',
          '/lovable-uploads/m84.avif',
          '/lovable-uploads/m85.avif'
        ],
        price: 1150,
        rating: 4.8,
        reviews: 18,
        guests: 3,
        bedrooms: 1,
        beds: 2,
        bathrooms: 1,
        rooms: [
          { id: 1, name: 'Artisan Suite', capacity: 3, price: 1150 }
        ],
        amenities: [
          'Wifi',
          'Local Meals',
          'Cultural Evenings',
          'Artisan Workshops',
          'Handloom Demonstrations',
          'Border Market Tours',
          'Library',
          'Custom Tours'
        ],
        host: {
          name: 'Memi Devi',
          image: 'https://i.pravatar.cc/150?img=44',
          joinedDate: 'August 2021',
          languages: ['English', 'Manipuri', 'Hindi', 'Tangkhul'],
          responseRate: 98
        },
        location_description: 'Situated 110 km southeast of Imphal near the Myanmar border. Offers unique access to cross-border cultural experiences and markets.',
        reviews_list: [
          {
            id: 1,
            name: 'Rakesh Sharma',
            avatar: 'https://i.pravatar.cc/150?img=19',
            date: '1 month ago',
            rating: 5,
            comment: "Fascinating cultural blend. The textile weaving workshop was unforgettable."
          },
          {
            id: 2,
            name: 'Lalita Devi',
            avatar: 'https://i.pravatar.cc/150?img=27',
            date: '2 months ago',
            rating: 4,
            comment: "Comfortable stay with authentic decor. Border market tour needs better organization."
          },
          {
            id: 3,
            name: 'Thomas Ng',
            avatar: 'https://i.pravatar.cc/150?img=11',
            date: '3 weeks ago',
            rating: 5,
            comment: "Exceptional cultural immersion. Host's knowledge of local history was impressive."
          }
        ]
      },
      
{
    id: 5,
    name: 'Whispering Pines Homestay',
    location: 'Khurai, Manipur',
    description: 'Set amongst verdant pine forests, enjoy nature walks and a peaceful ambiance. Features a central bonfire area and guided forest therapy sessions.',
    images: [
      '/lovable-uploads/w91.avif',
      '/lovable-uploads/w92.avif',
      '/lovable-uploads/w93.avif',
      '/lovable-uploads/w94.avif',
      '/lovable-uploads/w95.avif'
    ],
    price: 980,
    rating: 4.6,
    reviews: 20,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Pine View Room', capacity: 2, price: 980 },
      { id: 2, name: 'Forest Suite', capacity: 2, price: 850 }
    ],
    amenities: [
      'Nature Walks',
      'Bonfire',
      'Local Cuisine',
      'Wifi',
      'Forest Bathing',
      'Bird Watching',
      'Hot Water',
      'Outdoor Seating'
    ],
    host: {
      name: 'Akoijam Tomba',
      image: 'https://i.pravatar.cc/150?img=35',
      joinedDate: 'October 2021',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 95
    },
    location_description: 'Located 25 km northeast of Imphal in Khurai district. Surrounded by protected pine forests with well-marked nature trails.',
    reviews_list: [
      {
        id: 1,
        name: 'Rahul Verma',
        avatar: 'https://i.pravatar.cc/150?img=16',
        date: '3 weeks ago',
        rating: 4,
        comment: "The pine scent throughout the property was amazing. Evening bonfires with local snacks were a highlight."
      },
      {
        id: 2,
        name: 'Meena Devi',
        avatar: 'https://i.pravatar.cc/150?img=38',
        date: '2 months ago',
        rating: 5,
        comment: "Perfect digital detox location. The forest bathing sessions helped us reconnect with nature."
      },
      {
        id: 3,
        name: 'David Kim',
        avatar: 'https://i.pravatar.cc/150?img=9',
        date: '1 month ago',
        rating: 4,
        comment: "Cozy rooms with great forest views. Bring warm clothes for the chilly evenings."
      }
    ]
  },
  {
    id: 6,
    name: 'Tranquil Meadows Inn',
    location: 'Tamei, Manipur',
    description: 'Experience tranquility in open meadows with organic meals and scenic outdoor spaces. Features morning yoga sessions and herbal gardens.',
    images: [
      '/lovable-uploads/t101.avif',
      '/lovable-uploads/t102.avif',
      '/lovable-uploads/t103.avif',
      '/lovable-uploads/t104.avif',
      '/lovable-uploads/t105.avif'
    ],
    price: 1300,
    rating: 4.8,
    reviews: 27,
    guests: 5,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Meadow View Suite', capacity: 3, price: 1300 },
      { id: 2, name: 'Herbal Garden Room', capacity: 2, price: 1100 }
    ],
    amenities: [
      'Organic Meals',
      'Picnic Area',
      'Bike Rentals',
      'Wifi',
      'Yoga Deck',
      'Herbal Garden',
      'Guided Meditation',
      'Farm Tours'
    ],
    host: {
      name: 'Gyaneshori Devi',
      image: 'https://i.pravatar.cc/150?img=50',
      joinedDate: 'March 2022',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 96
    },
    location_description: 'Situated in Tamei district, 65 km west of Imphal. Features 5 acres of open meadows surrounded by rolling hills.',
    reviews_list: [
      {
        id: 1,
        name: 'Anjali Roy',
        avatar: 'https://i.pravatar.cc/150?img=26',
        date: '2 weeks ago',
        rating: 5,
        comment: "Morning yoga with meadow views was divine. The herbal tea from their garden was unforgettable."
      },
      {
        id: 2,
        name: 'Vikram Singh',
        avatar: 'https://i.pravatar.cc/150?img=34',
        date: '1 month ago',
        rating: 4,
        comment: "Great for family stays. Children loved the open spaces and farm animals."
      },
      {
        id: 3,
        name: 'Sophie Martin',
        avatar: 'https://i.pravatar.cc/150?img=7',
        date: '3 weeks ago',
        rating: 5,
        comment: "Perfect blend of relaxation and activities. The organic farm-to-table meals were exceptional."
      }
    ]
  },
  {
    id: 7,
    name: 'Heritage Cottage',
    location: 'Kangpokpi, Manipur',
    description: 'A blend of heritage charm and modern comforts in a quiet village setting. Features traditional weapon displays and cultural demonstrations.',
    images: [
      '/lovable-uploads/h111.avif',
      '/lovable-uploads/h112.avif',
      '/lovable-uploads/h113.avif',
      '/lovable-uploads/h114.avif',
      '/lovable-uploads/h115.avif'
    ],
    price: 1250,
    rating: 4.5,
    reviews: 15,
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Heritage Suite', capacity: 2, price: 1250 },
      { id: 2, name: 'Village View Room', capacity: 1, price: 900 }
    ],
    amenities: [
      'Historical Tours',
      'Local Crafts',
      'Traditional Meals',
      'Wifi',
      'Cultural Workshops',
      'Library',
      'Courtyard',
      'Weaving Demonstrations'
    ],
    host: {
      name: 'Thoudam Ibomcha',
      image: 'https://i.pravatar.cc/150?img=63',
      joinedDate: 'May 2021',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 93
    },
    location_description: 'Located in Kangpokpi district, 40 km north of Imphal. Showcases traditional Naga-Manipuri architecture.',
    reviews_list: [
      {
        id: 1,
        name: 'Priyanka Das',
        avatar: 'https://i.pravatar.cc/150?img=31',
        date: '1 month ago',
        rating: 4,
        comment: "Fascinating cultural displays. The traditional weapon demonstration was unique."
      },
      {
        id: 2,
        name: 'Rohit Sharma',
        avatar: 'https://i.pravatar.cc/150?img=20',
        date: '2 months ago',
        rating: 5,
        comment: "Authentic heritage experience. Host's knowledge of local history was impressive."
      },
      {
        id: 3,
        name: 'Emily Wong',
        avatar: 'https://i.pravatar.cc/150?img=8',
        date: '3 weeks ago',
        rating: 4,
        comment: "Comfortable stay with cultural immersion. Evening storytelling sessions were memorable."
      }
    ]
  },
  {
    id: 8,
    name: 'Serenity Hilltop Retreat',
    location: 'Wangkhei, Manipur',
    description: 'Relax in this hilltop retreat offering stunning views and a serene environment. Features infinity pool and spa services.',
    images: [
      '/lovable-uploads/s121.avif',
      '/lovable-uploads/s122.avif',
      '/lovable-uploads/s123.avif',
      '/lovable-uploads/s124.avif',
      '/lovable-uploads/s125.avif'
    ],
    price: 1450,
    rating: 4.9,
    reviews: 30,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Panorama Suite', capacity: 2, price: 1450 },
      { id: 2, name: 'Sunset Room', capacity: 2, price: 1300 }
    ],
    amenities: [
      'Panoramic Views',
      'Spa Services',
      'Local Cuisine',
      'Wifi',
      'Infinity Pool',
      'Yoga Pavilion',
      'Massage Therapy',
      'Sunset Deck'
    ],
    host: {
      name: 'Binodini Devi',
      image: 'https://i.pravatar.cc/150?img=55',
      joinedDate: 'December 2019',
      languages: ['English', 'Manipuri', 'Hindi', 'Bengali'],
      responseRate: 98
    },
    location_description: 'Perched on a hilltop in Wangkhei, 8 km from Imphal city center. Offers 360-degree views of the valley.',
    reviews_list: [
      {
        id: 1,
        name: 'Ananya Roy',
        avatar: 'https://i.pravatar.cc/150?img=30',
        date: '2 weeks ago',
        rating: 5,
        comment: "The infinity pool with valley views is worth every penny. Spa treatments were world-class."
      },
      {
        id: 2,
        name: 'Rajat Kapoor',
        avatar: 'https://i.pravatar.cc/150?img=21',
        date: '1 month ago',
        rating: 5,
        comment: "Perfect romantic getaway. Sunset cocktails on the deck were magical."
      },
      {
        id: 3,
        name: 'Sophia Kim',
        avatar: 'https://i.pravatar.cc/150?img=6',
        date: '3 weeks ago',
        rating: 4,
        comment: "Luxurious amenities with local touch. Breakfast spread was exceptional."
      }
    ]
  },
  {
    id: 9,
    name: 'Rustic Charm Homestay',
    location: 'Thoubal, Manipur',
    description: 'Enjoy a rustic escape with wood-fired fireplaces, local arts, and crafts. Features pottery workshops and traditional music nights.',
    images: [
      '/lovable-uploads/r131.avif',
      '/lovable-uploads/r132.avif',
      '/lovable-uploads/r133.avif',
      '/lovable-uploads/r134.avif',
      '/lovable-uploads/r135.avif'
    ],
    price: 990,
    rating: 4.4,
    reviews: 12,
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Potter\'s Den', capacity: 2, price: 990 },
      { id: 2, name: 'Artisan Loft', capacity: 1, price: 850 }
    ],
    amenities: [
      'Fireplace',
      'Local Crafts',
      'Traditional Meals',
      'Wifi',
      'Pottery Workshops',
      'Live Music',
      'Farm-to-Table',
      'Bicycle Rentals'
    ],
    host: {
      name: 'Nongthombam Prem',
      image: 'https://i.pravatar.cc/150?img=66',
      joinedDate: 'July 2022',
      languages: ['English', 'Manipuri'],
      responseRate: 90
    },
    location_description: 'Located in Thoubal district, 30 km southeast of Imphal. Set in a traditional Manipuri village known for pottery.',
    reviews_list: [
      {
        id: 1,
        name: 'Riya Chatterjee',
        avatar: 'https://i.pravatar.cc/150?img=36',
        date: '1 month ago',
        rating: 4,
        comment: "Loved the pottery workshop! Host family made us feel part of their community."
      },
      {
        id: 2,
        name: 'Amit Joshi',
        avatar: 'https://i.pravatar.cc/150?img=17',
        date: '2 months ago',
        rating: 5,
        comment: "Authentic rural experience. The wood-fired meals were delicious."
      },
      {
        id: 3,
        name: 'Lily Chen',
        avatar: 'https://i.pravatar.cc/150?img=4',
        date: '3 weeks ago',
        rating: 4,
        comment: "Charming rustic decor. Evening music sessions around the fire were unforgettable."
      }
    ]
  },
  {
    id: 10,
    name: 'Garden Oasis Homestay',
    location: 'Senapati, Manipur',
    description: 'A quaint homestay with expansive gardens and an emphasis on organic living. Features floral arrangement workshops and garden-to-table dining.',
    images: [
      '/lovable-uploads/g141.avif',
      '/lovable-uploads/g142.avif',
      '/lovable-uploads/g143.avif',
      '/lovable-uploads/g144.avif',
      '/lovable-uploads/g145.avif'
    ],
    price: 1120,
    rating: 4.6,
    reviews: 19,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Rose Cottage', capacity: 2, price: 1120 },
      { id: 2, name: 'Lavender Room', capacity: 2, price: 980 }
    ],
    amenities: [
      'Organic Garden',
      'Local Meals',
      'Guided Walks',
      'Wifi',
      'Floral Workshops',
      'Butterfly Garden',
      'Herb Nursery',
      'Outdoor Dining'
    ],
    host: {
      name: 'Langpoklakpbi Devi',
      image: 'https://i.pravatar.cc/150?img=49',
      joinedDate: 'April 2021',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 97
    },
    location_description: 'Situated in Senapati district, 45 km north of Imphal. Features 2 acres of landscaped gardens with rare floral species.',
    reviews_list: [
      {
        id: 1,
        name: 'Neha Reddy',
        avatar: 'https://i.pravatar.cc/150?img=37',
        date: '2 weeks ago',
        rating: 5,
        comment: "A floral paradise! The garden-to-table meals were fresh and beautifully presented."
      },
      {
        id: 2,
        name: 'Rajesh Kumar',
        avatar: 'https://i.pravatar.cc/150?img=24',
        date: '1 month ago',
        rating: 4,
        comment: "Perfect for nature lovers. The butterfly garden was a hit with our kids."
      },
      {
        id: 3,
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        date: '3 weeks ago',
        rating: 5,
        comment: "The floral arrangement workshop was therapeutic. Host's gardening knowledge is impressive."
      }
    ]
  },
    
{
    id: 11,
    name: 'Cultural Haven Inn',
    location: 'Kokrajhar, Manipur',
    description: 'Immerse yourself in local traditions through daily craft workshops and cultural performances. Features a traditional dance stage and artisan market.',
    images: [
      '/lovable-uploads/c151.jpg',
      '/lovable-uploads/c152.avif',
      '/lovable-uploads/c153.avif',
      '/lovable-uploads/c154.avif',
      '/lovable-uploads/c155.avif'
    ],
    price: 1380,
    rating: 4.7,
    reviews: 21,
    guests: 5,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Cultural Suite', capacity: 3, price: 1380 },
      { id: 2, name: 'Artisan Room', capacity: 2, price: 1150 }
    ],
    amenities: [
      'Cultural Activities',
      'Local Cuisine',
      'Workshops',
      'Wifi',
      'Dance Performances',
      'Craft Market',
      'Traditional Library',
      'Community Kitchen'
    ],
    host: {
      name: 'Moirangthem Bina',
      image: 'https://i.pravatar.cc/150?img=57',
      joinedDate: 'September 2020',
      languages: ['English', 'Manipuri', 'Hindi', 'Bodo'],
      responseRate: 95
    },
    location_description: 'Located in Kokrajhar district, 120 km west of Imphal. Adjacent to a living cultural museum of Manipuri traditions.',
    reviews_list: [
      {
        id: 1,
        name: 'Anika Patel',
        avatar: 'https://i.pravatar.cc/150?img=29',
        date: '3 weeks ago',
        rating: 5,
        comment: "The daily dance performances were mesmerizing. We learned traditional weaving techniques in the workshops."
      },
      {
        id: 2,
        name: 'Rohan Singh',
        avatar: 'https://i.pravatar.cc/150?img=18',
        date: '2 months ago',
        rating: 4,
        comment: "Great cultural immersion. The artisan market had authentic handicrafts at reasonable prices."
      },
      {
        id: 3,
        name: 'Lily Zhang',
        avatar: 'https://i.pravatar.cc/150?img=10',
        date: '1 month ago',
        rating: 5,
        comment: "Perfect for understanding Manipur's cultural diversity. Host family involved us in festival preparations."
      }
    ]
  },
  {
    id: 12,
    name: 'Mountain Retreat Ukhrul',
    location: 'Ukhrul, Manipur',
    description: 'Nestled in the hills of Ukhrul, this cozy retreat offers stunning mountain views and tranquility. Perfect for nature lovers and those seeking peace away from the city, this mountain homestay provides panoramic views of the surrounding hills and valleys. The architecture incorporates elements of traditional Tangkhul design.',
    images: [
      '/lovable-uploads/uhk.jpg',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h1.jpg',
      '/lovable-uploads/h9.avif',
    ],
    price: 950,
    rating: 4.8,
    reviews: 19,
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Mountain View Room', capacity: 2, price: 950 },
      { id: 2, name: 'Valley View Room', capacity: 1, price: 850 }
    ],
    amenities: [
      'Mountain View', 
      'Trekking Tours', 
      'Organic Meals', 
      'Local Crafts',
      'Fireplace',
      'Hot Water',
      'Nature Walks',
      'Stargazing Deck'
    ],
    host: {
      name: 'Somi Shimray',
      image: 'https://i.pravatar.cc/150?img=33',
      joinedDate: 'July 2021',
      languages: ['English', 'Tangkhul', 'Hindi', 'Manipuri'],
      responseRate: 100
    },
    location_description: 'Located in the hills of Ukhrul district, about 85 km from Imphal. The homestay sits at an elevation offering breathtaking views of the valleys below and mountains beyond.',
    reviews_list: [
      {
        id: 1,
        name: 'Rebecca Thomas',
        avatar: 'https://i.pravatar.cc/150?img=45',
        date: '3 weeks ago',
        rating: 5,
        comment: "The perfect getaway from city life. The mountain views are spectacular, especially at sunrise. The host arranged a wonderful trekking tour that showed us the natural beauty of the area."
      },
      {
        id: 2,
        name: 'Vijay Sharma',
        avatar: 'https://i.pravatar.cc/150?img=56',
        date: '1 month ago',
        rating: 5,
        comment: "Absolutely stunning location. The organic meals prepared with local ingredients were delicious. The host's knowledge of local flora and fauna made our nature walks very informative."
      },
      {
        id: 3,
        name: 'Linda Kim',
        avatar: 'https://i.pravatar.cc/150?img=17',
        date: '2 months ago',
        rating: 4,
        comment: "Beautiful retreat in the mountains. The stargazing deck was magical on clear nights. The rooms were cozy and comfortable, though a bit small. The hospitality was outstanding."
      }
    ]
  },
  {
    id: 13,
    name: 'Eco Farm Cottage',
    location: 'Bishnupur, Manipur',
    description: 'A sustainable eco-friendly cottage surrounded by organic farms and traditional crafts workshops. This environmentally conscious homestay is set on an organic farm where guests can participate in farming activities and learn about sustainable practices. The cottage is built using locally sourced materials and traditional techniques.',
    images: [
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h6.avif',
      '/lovable-uploads/loktakComplete.png',
    ],
    price: 1100,
    rating: 4.6,
    reviews: 31,
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Farm View Cottage', capacity: 2, price: 1100 }
    ],
    amenities: [
      'Organic Farm', 
      'Cooking Classes', 
      'Wifi', 
      'Bicycle Rental',
      'Craft Workshops',
      'Rainwater Harvesting',
      'Solar Power',
      'Farm-to-Table Meals'
    ],
    host: {
      name: 'Laishram Biren',
      image: 'https://i.pravatar.cc/150?img=42',
      joinedDate: 'April 2020',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 95
    },
    location_description: 'Located in the Bishnupur district, about 35 km from Imphal. The cottage is situated on an organic farm with easy access to Loktak Lake and other natural attractions in the area.',
    reviews_list: [
      {
        id: 1,
        name: 'Emma Johnson',
        avatar: 'https://i.pravatar.cc/150?img=25',
        date: '1 month ago',
        rating: 5,
        comment: "A wonderful experience for eco-conscious travelers. We loved the cooking classes using fresh ingredients from the farm. The cottage is simple but comfortable and very well designed."
      },
      {
        id: 2,
        name: 'Raj Patel',
        avatar: 'https://i.pravatar.cc/150?img=37',
        date: '2 months ago',
        rating: 4,
        comment: "Great place to learn about sustainable living. The bicycle tour of the surrounding villages was a highlight. The host is very knowledgeable about organic farming techniques."
      },
      {
        id: 3,
        name: 'Sophie Chen',
        avatar: 'https://i.pravatar.cc/150?img=29',
        date: '3 months ago',
        rating: 5,
        comment: "The perfect place to disconnect and learn about sustainable living. The craft workshop was so interesting, and we got to make our own pottery. The farm-to-table meals were exceptional."
      }
    ]
  },
  {
    id: 14,
    name: 'Riverside Haven',
    location: 'Tamenglong, Manipur',
    description: 'Peaceful riverside homestay offering fishing, bamboo rafting, and bird watching experiences. Set alongside a pristine river in Tamenglong district, this tranquil homestay is perfect for nature lovers and those seeking adventure activities. The property features beautiful gardens and river-facing rooms.',
    images: [
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h6.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/uhk.jpg',
    ],
    price: 1350,
    rating: 4.5,
    reviews: 16,
    guests: 5,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Riverside Suite', capacity: 3, price: 1350 },
      { id: 2, name: 'Garden Room', capacity: 2, price: 1200 }
    ],
    amenities: [
      'River View', 
      'Fishing Equipment', 
      'Traditional Meals', 
      'Guided Tours',
      'Bird Watching',
      'Bamboo Rafting',
      'Bonfire',
      'Nature Trails'
    ],
    host: {
      name: 'Kamei Robert',
      image: 'https://i.pravatar.cc/150?img=54',
      joinedDate: 'September 2020',
      languages: ['English', 'Rongmei', 'Manipuri', 'Hindi'],
      responseRate: 92
    },
    location_description: 'Located in Tamenglong district, about 100 km from Imphal. The homestay sits on the banks of a river surrounded by lush forests and hills.',
    reviews_list: [
      {
        id: 1,
        name: 'David Miller',
        avatar: 'https://i.pravatar.cc/150?img=15',
        date: '1 month ago',
        rating: 4,
        comment: "A wonderful place for nature enthusiasts. The bamboo rafting experience was unforgettable, and we saw so many bird species during our stay. The rooms are comfortable with beautiful river views."
      },
      {
        id: 2,
        name: 'Sunita Rai',
        avatar: 'https://i.pravatar.cc/150?img=39',
        date: '2 months ago',
        rating: 5,
        comment: "Perfect getaway in nature. The sound of the river is so relaxing, and the fishing experience was great fun. The host prepared delicious meals with our catch of the day!"
      },
      {
        id: 3,
        name: 'Michael Wong',
        avatar: 'https://i.pravatar.cc/150?img=61',
        date: '3 months ago',
        rating: 4,
        comment: "Beautiful location by the river. The bonfire evenings with local stories were memorable. The rooms are spacious and clean. The nature trails around the property are worth exploring."
      }
    ]
  },
  {
    id: 15,
    name: 'Sangai Valley Lodge',
    location: 'Sendra, Manipur',
    description: 'Traditional lodge near Keibul Lamjao National Park with opportunities to spot the rare Sangai deer. This lodge is ideally situated for wildlife enthusiasts, offering easy access to India\'s only floating national park. The design incorporates traditional Manipuri architecture with modern comforts.',
    images: [
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/loktakView.webp',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h6.avif',
      '/lovable-uploads/h4.avif',
    ],
    price: 1600,
    rating: 4.9,
    reviews: 24,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Park View Room', capacity: 2, price: 1600 },
      { id: 2, name: 'Lake View Room', capacity: 2, price: 1700 }
    ],
    amenities: [
      'National Park Access', 
      'Wildlife Tours', 
      'Traditional Meals', 
      'Cultural Performances',
      'Boat Rides',
      'Binoculars',
      'Guided Nature Walks',
      'Evening Campfire'
    ],
    host: {
      name: 'Manihar Singh',
      image: 'https://i.pravatar.cc/150?img=59',
      joinedDate: 'February 2019',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 99
    },
    location_description: 'Located in Sendra, on the edge of Keibul Lamjao National Park, about 50 km from Imphal. The lodge offers stunning views of Loktak Lake and the floating phumdis.',
    reviews_list: [
      {
        id: 1,
        name: 'James Wilson',
        avatar: 'https://i.pravatar.cc/150?img=18',
        date: '2 weeks ago',
        rating: 5,
        comment: "An amazing place for wildlife enthusiasts. We were lucky enough to spot the rare Sangai deer during our wildlife tour. The cultural performances in the evening were exceptional."
      },
      {
        id: 2,
        name: 'Anjali Desai',
        avatar: 'https://i.pravatar.cc/150?img=28',
        date: '1 month ago',
        rating: 5,
        comment: "Perfect location for exploring Keibul Lamjao National Park. The boat ride on Loktak Lake was unforgettable. The rooms are spacious and comfortable with great views."
      },
      {
        id: 3,
        name: 'Robert Chen',
        avatar: 'https://i.pravatar.cc/150?img=58',
        date: '2 months ago',
        rating: 5,
        comment: "The lodge exceeded our expectations. The wildlife tours were well organized, and the guides were very knowledgeable. The traditional Manipuri meals were delicious and authentic."
      }
    ]
  },
  {
    id: 16,
    name: 'Mystic Valley Lodge',
    location: 'Karong, Manipur',
    description: 'Secluded valley retreat offering mystical sunrise views and guided meditation sessions. Features ancient stone pathways and natural springs.',
    images: [
      '/lovable-uploads/m161.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1550,
    rating: 4.8,
    reviews: 25,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Valley View Suite', capacity: 2, price: 1550 },
      { id: 2, name: 'Mystic Cave Room', capacity: 2, price: 1400 }
    ],
    amenities: [
      'Valley Views',
      'Hiking',
      'Local Meals',
      'Guided Nature Walks',
      'Meditation Caves',
      'Natural Spring Baths',
      'Astronomy Deck',
      'Herbal Therapy'
    ],
    host: {
      name: 'Khangembam Boby',
      image: 'https://i.pravatar.cc/150?img=62',
      joinedDate: 'January 2021',
      languages: ['English', 'Manipuri', 'Tangkhul'],
      responseRate: 96
    },
    location_description: 'Nestled in Karong valley, 85 km north of Imphal. Accessible via a scenic mountain trail with ancient monoliths along the path.',
    reviews_list: [
      {
        id: 1,
        name: 'Arjun Mehta',
        avatar: 'https://i.pravatar.cc/150?img=23',
        date: '2 weeks ago',
        rating: 5,
        comment: "The valley views at dawn look straight out of a fantasy novel. Meditation sessions were transformative."
      },
      {
        id: 2,
        name: 'Priyanka Rao',
        avatar: 'https://i.pravatar.cc/150?img=33',
        date: '1 month ago',
        rating: 4,
        comment: "Unique cave-style rooms. The natural spring bath experience was rejuvenating."
      },
      {
        id: 3,
        name: 'Daniel Kim',
        avatar: 'https://i.pravatar.cc/150?img=12',
        date: '3 weeks ago',
        rating: 5,
        comment: "Night sky observation with the host's telescope was unforgettable. Saw the Milky Way clearly!"
      }
    ]
  },
  {
    id: 17,
    name: 'Rustic Riverfront Home',
    location: 'Sadar Hills, Manipur',
    description: 'Authentic riverside experience with fishing excursions and riverside barbecues. Features traditional bamboo cottages and canoeing.',
    images: [
      '/lovable-uploads/r171.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1280,
    rating: 4.5,
    reviews: 17,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Riverfront Cottage', capacity: 2, price: 1280 },
      { id: 2, name: 'Bamboo Suite', capacity: 2, price: 1100 }
    ],
    amenities: [
      'River View',
      'Fishing',
      'Barbecue',
      'Wifi',
      'Canoeing',
      'Riverside Campfire',
      'Traditional Boat Making',
      'Local Cuisine'
    ],
    host: {
      name: 'Ningthoujam Doren',
      image: 'https://i.pravatar.cc/150?img=65',
      joinedDate: 'March 2022',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 92
    },
    location_description: 'Situated along the Barak River in Sadar Hills, 70 km northwest of Imphal. Offers direct river access and fishing equipment.',
    reviews_list: [
      {
        id: 1,
        name: 'Sneha Reddy',
        avatar: 'https://i.pravatar.cc/150?img=39',
        date: '1 month ago',
        rating: 4,
        comment: "Loved the early morning canoe rides. Host taught us traditional fishing techniques."
      },
      {
        id: 2,
        name: 'Aryan Kapoor',
        avatar: 'https://i.pravatar.cc/150?img=24',
        date: '2 months ago',
        rating: 5,
        comment: "Perfect family getaway. Children enjoyed learning to make bamboo fishing traps."
      },
      {
        id: 3,
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=3',
        date: '3 weeks ago',
        rating: 4,
        comment: "Riverside barbecues under the stars were magical. Bring mosquito repellent."
      }
    ]
  },
  {
    id: 18,
    name: 'Starry Night Homestay',
    location: 'Andro, Manipur',
    description: 'Ideal for astronomy enthusiasts with telescope facilities and night photography workshops. Features light pollution-free skies.',
    images: [
      '/lovable-uploads/s181.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1180,
    rating: 4.7,
    reviews: 14,
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Stargazer Suite', capacity: 2, price: 1180 },
      { id: 2, name: 'Celestial Loft', capacity: 1, price: 950 }
    ],
    amenities: [
      'Stargazing',
      'Local Meals',
      'Bonfire',
      'Wifi',
      'Telescopes',
      'Astrophotography',
      'Night Sky Tours',
      'Observation Deck'
    ],
    host: {
      name: 'Atom Sunil',
      image: 'https://i.pravatar.cc/150?img=70',
      joinedDate: 'November 2019',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 98
    },
    location_description: 'Located in Andro, 25 km east of Imphal. Situated in a dark sky preserve area with minimal light pollution.',
    reviews_list: [
      {
        id: 1,
        name: 'Ravi Verma',
        avatar: 'https://i.pravatar.cc/150?img=15',
        date: '2 weeks ago',
        rating: 5,
        comment: "Saw Saturn's rings through the telescope! Host's astronomy knowledge is phenomenal."
      },
      {
        id: 2,
        name: 'Ananya Das',
        avatar: 'https://i.pravatar.cc/150?img=40',
        date: '1 month ago',
        rating: 4,
        comment: "Unique experience for space enthusiasts. Night photography workshop was insightful."
      },
      {
        id: 3,
        name: 'Tom Chen',
        avatar: 'https://i.pravatar.cc/150?img=1',
        date: '3 weeks ago',
        rating: 5,
        comment: "Milky Way visibility here is incredible. Cozy rooms with celestial-themed decor."
      }
    ]
  },
  {
    id: 19,
    name: 'Mystical Forest Retreat',
    location: 'Singjamei, Manipur',
    description: 'Dense forest surroundings with guided night walks and medicinal plant tours. Features treehouse accommodations and canopy walks.',
    images: [
      '/lovable-uploads/m191.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1400,
    rating: 4.8,
    reviews: 23,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Treehouse Suite', capacity: 2, price: 1400 },
      { id: 2, name: 'Canopy Room', capacity: 2, price: 1250 }
    ],
    amenities: [
      'Forest Walks',
      'Local Cuisine',
      'Eco Tours',
      'Wifi',
      'Medicinal Garden',
      'Zip Line',
      'Bird Watching',
      'Night Safari'
    ],
    host: {
      name: 'Rajeshori Devi',
      image: 'https://i.pravatar.cc/150?img=53',
      joinedDate: 'June 2020',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 97
    },
    location_description: 'Located in Singjamei forest reserve, 15 km southwest of Imphal. Part of a private conservation initiative.',
    reviews_list: [
      {
        id: 1,
        name: 'Neha Gupta',
        avatar: 'https://i.pravatar.cc/150?img=41',
        date: '1 month ago',
        rating: 5,
        comment: "The treehouse stay was magical. Night safari revealed rare civets and owls."
      },
      {
        id: 2,
        name: 'Rohan Kapoor',
        avatar: 'https://i.pravatar.cc/150?img=25',
        date: '2 weeks ago',
        rating: 4,
        comment: "Adrenaline-packed zip line experience. Medicinal plant tour was educational."
      },
      {
        id: 3,
        name: 'Sophia Li',
        avatar: 'https://i.pravatar.cc/150?img=6',
        date: '3 weeks ago',
        rating: 5,
        comment: "Perfect blend of adventure and relaxation. Canopy walk at dawn was breathtaking."
      }
    ]
  },
  {
    id: 20,
    name: 'Tranquility Homestay',
    location: 'Khongjom, Manipur',
    description: 'Peaceful retreat featuring meditation gardens and traditional healing therapies. Offers yoga sessions with mountain views.',
    images: [
      '/lovable-uploads/t201.webp',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1320,
    rating: 4.6,
    reviews: 20,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Zen Garden Suite', capacity: 2, price: 1320 },
      { id: 2, name: 'Lotus Room', capacity: 2, price: 1150 }
    ],
    amenities: [
      'Cultural Tours',
      'Local Meals',
      'Tranquil Gardens',
      'Wifi',
      'Ayurvedic Treatments',
      'Yoga Shala',
      'Meditation Caves',
      'Herbal Tea Lounge'
    ],
    host: {
      name: 'Thounaojam Bembem',
      image: 'https://i.pravatar.cc/150?img=58',
      joinedDate: 'February 2021',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 94
    },
    location_description: 'Situated in Khongjom, 35 km south of Imphal. Adjacent to historical war memorials and sacred groves.',
    reviews_list: [
      {
        id: 1,
        name: 'Anjali Rao',
        avatar: 'https://i.pravatar.cc/150?img=34',
        date: '2 weeks ago',
        rating: 5,
        comment: "The Ayurvedic massages melted away years of stress. Morning yoga with mountain views was divine."
      },
      {
        id: 2,
        name: 'Vikram Singh',
        avatar: 'https://i.pravatar.cc/150?img=17',
        date: '1 month ago',
        rating: 4,
        comment: "Perfect digital detox spot. The herbal tea selection was exceptional."
      },
      {
        id: 3,
        name: 'Lily Zhang',
        avatar: 'https://i.pravatar.cc/150?img=10',
        date: '3 weeks ago',
        rating: 5,
        comment: "Meditation garden design promotes deep relaxation. Host's knowledge of traditional healing is remarkable."
      }
    ]
  },
  // Entries 21-29
{
    id: 21,
    name: 'Hillside Garden Retreat',
    location: 'Lilong, Manipur',
    description: 'Perched on a hill with terraced gardens, featuring traditional décor and flower cultivation workshops. Offers sunset viewing platforms.',
    images: [
      '/lovable-uploads/m82.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1200,
    rating: 4.5,
    reviews: 16,
    guests: 3,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Garden View Suite', capacity: 2, price: 1200 },
      { id: 2, name: 'Hilltop Room', capacity: 1, price: 950 }
    ],
    amenities: [
      'Terraced Gardens',
      'Local Cuisine',
      'Cultural Tours',
      'Wifi',
      'Floral Workshops',
      'Sunset Deck',
      'Herb Garden',
      'Gardening Tools'
    ],
    host: {
      name: 'Yumnam Sanajaoba',
      image: 'https://i.pravatar.cc/150?img=71',
      joinedDate: 'October 2020',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 93
    },
    location_description: 'Located in Lilong, 30 km west of Imphal. Features 3 levels of terraced gardens with rare Manipuri flora.',
    reviews_list: [
      {
        id: 1,
        name: 'Anika Reddy',
        avatar: 'https://i.pravatar.cc/150?img=42',
        date: '3 weeks ago',
        rating: 4,
        comment: "The garden workshops were delightful. Learned about traditional flower cultivation methods."
      },
      {
        id: 2,
        name: 'Rajat Verma',
        avatar: 'https://i.pravatar.cc/150?img=19',
        date: '2 months ago',
        rating: 5,
        comment: "Sunset views over the terraces are breathtaking. Host's garden-to-table meals are exceptional."
      },
      {
        id: 3,
        name: 'Sophie Kim',
        avatar: 'https://i.pravatar.cc/150?img=6',
        date: '1 month ago',
        rating: 4,
        comment: "Peaceful retreat with fragrant gardens. Rooms have beautiful handmade textiles."
      }
    ]
  },
  {
    id: 22,
    name: 'Serendipity Homestay',
    location: 'Noney, Manipur',
    description: 'Modern-traditional fusion stay with curated art exhibits and bamboo craft workshops. Features a riverside meditation deck.',
    images: [
      '/lovable-uploads/s73.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1360,
    rating: 4.7,
    reviews: 18,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Harmony Suite', capacity: 2, price: 1360 },
      { id: 2, name: 'Bamboo Nest', capacity: 2, price: 1150 }
    ],
    amenities: [
      'Art Exhibits',
      'Local Meals',
      'Cultural Activities',
      'Nature Walks',
      'Bamboo Crafts',
      'Riverside Deck',
      'Yurt Stay Option',
      'Wifi'
    ],
    host: {
      name: 'Gurumayum Inao',
      image: 'https://i.pravatar.cc/150?img=72',
      joinedDate: 'May 2021',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 96
    },
    location_description: 'Situated in Noney district, 55 km northwest of Imphal. Overlooks the Barak River with private river access.',
    reviews_list: [
      {
        id: 1,
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/150?img=32',
        date: '1 month ago',
        rating: 5,
        comment: "The bamboo craft workshop was phenomenal. Riverside meditation at dawn was transformative."
      },
      {
        id: 2,
        name: 'Amit Patel',
        avatar: 'https://i.pravatar.cc/150?img=14',
        date: '2 weeks ago',
        rating: 4,
        comment: "Unique blend of modern art and tradition. Yurt stay option adds adventurous touch."
      },
      {
        id: 3,
        name: 'Lily Chen',
        avatar: 'https://i.pravatar.cc/150?img=4',
        date: '3 weeks ago',
        rating: 5,
        comment: "Host's art collection tells Manipur's cultural story. Meals served in bamboo vessels were memorable."
      }
    ]
  },
  {
    id: 23,
    name: 'Cosy Cottage Retreat',
    location: 'Sugnu, Manipur',
    description: 'Family-friendly cottages with indoor fireplaces and traditional board games. Offers guided village walks and fishing trips.',
    images: [
      '/lovable-uploads/t102.webp',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1100,
    rating: 4.6,
    reviews: 15,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Family Cottage', capacity: 4, price: 1100 },
      { id: 2, name: 'Honeymoon Suite', capacity: 2, price: 950 }
    ],
    amenities: [
      'Indoor Fireplace',
      'Local Cuisine',
      'Quiet Ambiance',
      'Wifi',
      'Fishing Gear',
      'Board Games',
      'Village Tours',
      'Bicycle Rentals'
    ],
    host: {
      name: 'Ningombam Doren',
      image: 'https://i.pravatar.cc/150?img=73',
      joinedDate: 'July 2022',
      languages: ['English', 'Manipuri'],
      responseRate: 91
    },
    location_description: 'Located in Sugnu, 45 km southeast of Imphal. Surrounded by paddy fields and traditional fishing ponds.',
    reviews_list: [
      {
        id: 1,
        name: 'Rahul Kapoor',
        avatar: 'https://i.pravatar.cc/150?img=21',
        date: '2 weeks ago',
        rating: 4,
        comment: "Perfect family getaway. Children loved learning traditional fishing methods."
      },
      {
        id: 2,
        name: 'Ananya Das',
        avatar: 'https://i.pravatar.cc/150?img=40',
        date: '1 month ago',
        rating: 5,
        comment: "Romantic cottage with fireplace. Village walks revealed authentic rural life."
      },
      {
        id: 3,
        name: 'David Kim',
        avatar: 'https://i.pravatar.cc/150?img=9',
        date: '3 weeks ago',
        rating: 4,
        comment: "Cozy winter retreat. Local board game evenings were surprisingly fun!"
      }
    ]
  },
  {
    id: 24,
    name: 'Heritage Hills Homestay',
    location: 'Mayang Imphal, Manipur',
    description: '16th-century heritage property restored with original materials. Features historical reenactments and antique artifact displays.',
    images: [
      '/lovable-uploads/w93.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1490,
    rating: 4.8,
    reviews: 26,
    guests: 5,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Royal Chamber', capacity: 3, price: 1490 },
      { id: 2, name: 'Noble Suite', capacity: 2, price: 1300 }
    ],
    amenities: [
      'Historical Tours',
      'Local Meals',
      'Guided Walks',
      'Wifi',
      'Antique Museum',
      'Cultural Performances',
      'Traditional Costume Experience',
      'Heritage Library'
    ],
    host: {
      name: 'Rajkumari Bina',
      image: 'https://i.pravatar.cc/150?img=74',
      joinedDate: 'December 2019',
      languages: ['English', 'Manipuri', 'Hindi', 'Sanskrit'],
      responseRate: 99
    },
    location_description: 'Situated in Mayang Imphal, 20 km west of Imphal. Part of a 400-year-old royal complex with original fortifications.',
    reviews_list: [
      {
        id: 1,
        name: 'Aryan Singh',
        avatar: 'https://i.pravatar.cc/150?img=24',
        date: '1 week ago',
        rating: 5,
        comment: "Living history experience! Sleeping in royal chambers felt like time travel."
      },
      {
        id: 2,
        name: 'Priya Reddy',
        avatar: 'https://i.pravatar.cc/150?img=37',
        date: '2 months ago',
        rating: 4,
        comment: "Fascinating artifact collection. Evening cultural performances were authentic."
      },
      {
        id: 3,
        name: 'Tom Wilson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        date: '3 weeks ago',
        rating: 5,
        comment: "Host's knowledge of Manipuri royalty is encyclopedic. A must for history buffs!"
      }
    ]
  },
  {
    id: 25,
    name: 'Valley View Homestay',
    location: 'Moreh, Manipur',
    description: 'Panoramic valley views with guided border culture tours. Features a rooftop observatory and traditional dance classes.',
    images: [
      '/lovable-uploads/t102.webp',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1270,
    rating: 4.7,
    reviews: 19,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Valley Panorama Suite', capacity: 2, price: 1270 },
      { id: 2, name: 'Border View Room', capacity: 2, price: 1100 }
    ],
    amenities: [
      '360° Observatory',
      'Local Cuisine',
      'Cultural Experiences',
      'Wifi',
      'Dance Classes',
      'Border Market Tours',
      'Traditional Weaving',
      'Sunset Yoga'
    ],
    host: {
      name: 'Thokchom Biren',
      image: 'https://i.pravatar.cc/150?img=75',
      joinedDate: 'April 2022',
      languages: ['English', 'Manipuri', 'Hindi', 'Burmese'],
      responseRate: 95
    },
    location_description: 'Located in Moreh, 110 km southeast of Imphal. Offers views into Myanmar and access to international border markets.',
    reviews_list: [
      {
        id: 1,
        name: 'Neha Gupta',
        avatar: 'https://i.pravatar.cc/150?img=41',
        date: '2 weeks ago',
        rating: 5,
        comment: "Rooftop observatory offers stunning sunrise views over two countries. Dance classes were energetic!"
      },
      {
        id: 2,
        name: 'Rohan Mehta',
        avatar: 'https://i.pravatar.cc/150?img=18',
        date: '1 month ago',
        rating: 4,
        comment: "Fascinating cross-border cultural exposure. Market tours require early starts but are worth it."
      },
      {
        id: 3,
        name: 'Sophie Chen',
        avatar: 'https://i.pravatar.cc/150?img=5',
        date: '3 weeks ago',
        rating: 5,
        comment: "Unique geopolitical location. Host arranged memorable interactions with border communities."
      }
    ]
  },
  {
    id: 26,
    name: 'The Rustic Hideaway',
    location: 'Khabaibam, Manipur',
    description: 'Secluded farmstay with organic cooking classes and bullock cart rides. Features mud cottages and traditional farming experiences.',
    images: [
      '/lovable-uploads/r134.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1180,
    rating: 4.5,
    reviews: 14,
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Mud Cottage', capacity: 2, price: 1180 },
      { id: 2, name: 'Farm View Loft', capacity: 1, price: 900 }
    ],
    amenities: [
      'Organic Farming',
      'Local Meals',
      'Nature Trails',
      'Wifi',
      'Bullock Cart Rides',
      'Mud Therapy',
      'Traditional Cooking',
      'Farm Animals'
    ],
    host: {
      name: 'Oinam Bembem',
      image: 'https://i.pravatar.cc/150?img=76',
      joinedDate: 'September 2021',
      languages: ['English', 'Manipuri'],
      responseRate: 89
    },
    location_description: 'Situated in Khabaibam, 25 km northeast of Imphal. Working organic farm with traditional agricultural practices.',
    reviews_list: [
      {
        id: 1,
        name: 'Amit Kumar',
        avatar: 'https://i.pravatar.cc/150?img=17',
        date: '1 month ago',
        rating: 4,
        comment: "Authentic farm experience. Children loved feeding the water buffaloes."
      },
      {
        id: 2,
        name: 'Priyanka Rao',
        avatar: 'https://i.pravatar.cc/150?img=33',
        date: '2 weeks ago',
        rating: 5,
        comment: "Mud cottage stay was surprisingly comfortable. Organic thali meals were divine."
      },
      {
        id: 3,
        name: 'Daniel Kim',
        avatar: 'https://i.pravatar.cc/150?img=12',
        date: '3 weeks ago',
        rating: 4,
        comment: "Basic but authentic. Perfect for experiencing traditional farm life."
      }
    ]
  },
  {
    id: 27,
    name: 'Zen Garden Inn',
    location: 'Heingang, Manipur',
    description: 'Minimalist retreat with daily meditation sessions and Japanese-inspired gardens. Features tea ceremonies and rock gardens.',
    images: [
      '/lovable-uploads/s75.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1400,
    rating: 4.8,
    reviews: 21,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    rooms: [
      { id: 1, name: 'Zen Suite', capacity: 2, price: 1400 },
      { id: 2, name: 'Karesansui Room', capacity: 2, price: 1250 }
    ],
    amenities: [
      'Zen Garden',
      'Meditation Sessions',
      'Local Cuisine',
      'Wifi',
      'Tea Ceremonies',
      'Calligraphy Classes',
      'Rock Garden',
      'Sound Baths'
    ],
    host: {
      name: 'Ningthoujam Tomba',
      image: 'https://i.pravatar.cc/150?img=77',
      joinedDate: 'March 2020',
      languages: ['English', 'Manipuri', 'Japanese'],
      responseRate: 97
    },
    location_description: 'Located in Heingang, 8 km east of Imphal. Combines Manipuri and Japanese garden design philosophies.',
    reviews_list: [
      {
        id: 1,
        name: 'Anjali Das',
        avatar: 'https://i.pravatar.cc/150?img=34',
        date: '2 weeks ago',
        rating: 5,
        comment: "Morning tea ceremonies set perfect tone for the day. Gardens are works of art."
      },
      {
        id: 2,
        name: 'Ravi Verma',
        avatar: 'https://i.pravatar.cc/150?img=15',
        date: '1 month ago',
        rating: 4,
        comment: "Unique fusion of cultures. Sound bath therapy was deeply relaxing."
      },
      {
        id: 3,
        name: 'Sophia Li',
        avatar: 'https://i.pravatar.cc/150?img=6',
        date: '3 weeks ago',
        rating: 5,
        comment: "Perfect urban escape. Calligraphy classes with garden views were magical."
      }
    ]
  },
  {
    id: 28,
    name: 'Lakeside Bliss Homestay',
    location: 'Sugnu, Manipur',
    description: 'Contemporary lakeside cabins with private docks and kayaking. Features floating breakfasts and sunset cruises on Loktak Lake.',
    images: [
      '/lovable-uploads/s123.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1320,
    rating: 4.7,
    reviews: 17,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Lakefront Suite', capacity: 2, price: 1320 },
      { id: 2, name: 'Waterside Cabin', capacity: 2, price: 1150 }
    ],
    amenities: [
      'Private Dock',
      'Boating',
      'Local Cuisine',
      'Wifi',
      'Kayaking',
      'Floating Breakfast',
      'Sunset Cruises',
      'Fishing Gear'
    ],
    host: {
      name: 'Kshetrimayum Sanajaoba',
      image: 'https://i.pravatar.cc/150?img=78',
      joinedDate: 'August 2022',
      languages: ['English', 'Manipuri', 'Hindi'],
      responseRate: 94
    },
    location_description: 'Situated on the southern shore of Loktak Lake, 50 km from Imphal. Offers private lake access and stunning views of floating phumdis.',
    reviews_list: [
      {
        id: 1,
        name: 'Rahul Sharma',
        avatar: 'https://i.pravatar.cc/150?img=20',
        date: '2 weeks ago',
        rating: 5,
        comment: "The floating breakfast was magical! Kayaking through the phumdis at sunrise felt surreal."
      },
      {
        id: 2,
        name: 'Priya Kapoor',
        avatar: 'https://i.pravatar.cc/150?img=35',
        date: '1 month ago',
        rating: 4,
        comment: "Modern cabins with perfect lake views. Sunset cruise with local snacks was a highlight."
      },
      {
        id: 3,
        name: 'David Chen',
        avatar: 'https://i.pravatar.cc/150?img=9',
        date: '3 weeks ago',
        rating: 5,
        comment: "Host taught us traditional fishing techniques. Caught dinner for the whole family!"
      }
    ]
  },

  {
    id: 29,
    name: 'Timeless Traditions Inn',
    location: 'Imphal West, Manipur',
    description: 'Urban heritage property preserving 19th-century architecture. Features vintage photo exhibitions and traditional puppet shows.',
    images: [
      '/lovable-uploads/h113.avif',
      '/lovable-uploads/h4.avif',
      '/lovable-uploads/h7.avif',
      '/lovable-uploads/h9.avif',
      '/lovable-uploads/h1.jpg'
    ],
    price: 1550,
    rating: 4.9,
    reviews: 28,
    guests: 5,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    rooms: [
      { id: 1, name: 'Heritage Suite', capacity: 3, price: 1550 },
      { id: 2, name: 'Colonial Room', capacity: 2, price: 1350 }
    ],
    amenities: [
      'Cultural Tours',
      'Traditional Meals',
      'Local Crafts',
      'Wifi',
      'Vintage Exhibits',
      'Puppet Theater',
      'Antique Furniture',
      'Courtyard Garden'
    ],
    host: {
      name: 'Rajkumar Singh',
      image: 'https://i.pravatar.cc/150?img=79',
      joinedDate: 'January 2018',
      languages: ['English', 'Manipuri', 'Hindi', 'Bengali'],
      responseRate: 99
    },
    location_description: 'Located in central Imphal West, 2 km from Kangla Fort. Restored colonial-era mansion with original teak woodwork.',
    reviews_list: [
      {
        id: 1,
        name: 'Ananya Roy',
        avatar: 'https://i.pravatar.cc/150?img=30',
        date: '1 week ago',
        rating: 5,
        comment: "Living museum experience! Puppet show depicting Manipuri legends was enchanting."
      },
      {
        id: 2,
        name: 'Vikram Joshi',
        avatar: 'https://i.pravatar.cc/150?img=16',
        date: '2 months ago',
        rating: 4,
        comment: "Perfect blend of heritage and comfort. Photo exhibition reveals Imphal's transformation."
      },
      {
        id: 3,
        name: 'Sophie Kim',
        avatar: 'https://i.pravatar.cc/150?img=6',
        date: '3 weeks ago',
        rating: 5,
        comment: "Courtyard breakfasts feel like royal affairs. Host's family archives are fascinating."
      }
    ]
  },
    
      // Entry 30
      {
        id: 30,
        name: 'Evergreen Escape',
        location: 'Moebung, Manipur',
        description: 'A perfect forest retreat featuring eco-friendly architecture and organic farming experiences. Night walks with naturalists available.',
        images: [
          '/lovable-uploads/g143.avif',
          '/lovable-uploads/h4.avif',
          '/lovable-uploads/h7.avif',
          '/lovable-uploads/h9.avif',
          '/lovable-uploads/h1.jpg'
        ],
        price: 1250,
        rating: 4.6,
        reviews: 20,
        guests: 4,
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        rooms: [
          { id: 1, name: 'Forest View Suite', capacity: 2, price: 1250 },
          { id: 2, name: 'Canopy Room', capacity: 2, price: 1100 }
        ],
        amenities: [
          'Nature Trails',
          'Forest View',
          'Organic Meals',
          'Wifi',
          'Bird Watching',
          'Night Safaris',
          'Yoga Deck',
          'Eco Tours'
        ],
        host: {
          name: 'Boboi Singh',
          image: 'https://i.pravatar.cc/150?img=60',
          joinedDate: 'June 2022',
          languages: ['English', 'Manipuri', 'Hindi'],
          responseRate: 94
        },
        location_description: 'Located 40 km northeast of Imphal in protected evergreen forests. Adjacent to a wildlife conservation area.',
        reviews_list: [
          {
            id: 1,
            name: 'Priyanka Das',
            avatar: 'https://i.pravatar.cc/150?img=31',
            date: '2 weeks ago',
            rating: 5,
            comment: "The night safari revealed amazing nocturnal wildlife. Guides were incredibly knowledgeable."
          },
          {
            id: 2,
            name: 'Amit Verma',
            avatar: 'https://i.pravatar.cc/150?img=14',
            date: '1 month ago',
            rating: 4,
            comment: "Great eco-initiatives. Mosquito nets could be improved for forest area."
          },
          {
            id: 3,
            name: 'Sophie Martin',
            avatar: 'https://i.pravatar.cc/150?img=7',
            date: '3 weeks ago',
            rating: 5,
            comment: "Perfect digital detox spot. The organic farm tour was educational and fun."
          }
        ]
      }

];
