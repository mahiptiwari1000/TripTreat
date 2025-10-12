import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Search,
  ThumbsUp,
  Camera,
  Clock,
  ExternalLink,
  Map,
  Info,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import HotspotDetailsDialog from '@/components/HotspotDetailsDialog';

// Define hotspot types
type Hotspot = {
  id: number;
  name: string;
  location: string;
  district: string;
  details: string;
  image: string;
  category: string;
  visitDuration: string;
  bestTime: string;
  entryFee: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  tips?: string[];
  additionalImages: string[];
};

// Sample images that we have
const availableImages = [
  '/file-uploads/sah3.jpg',
  '/file-uploads/kha3.jpg',
  '/file-uploads/zoo2.jpg',
  '/file-uploads/or1.jpg',
  '/file-uploads/sa1.jpg',
  '/file-uploads/wa4.jpg',
  '/file-uploads/71.jpg',
  '/file-uploads/th6.jpg',
  '/file-uploads/an2.jpg',
  '/file-uploads/si1.jpg',
  '/file-uploads/11.jpg',
  '/file-uploads/12.jpg',
  '/file-uploads/13.jpg',
  '/file-uploads/14.jpg',
  '/file-uploads/15.jpg',
  '/file-uploads/16.jpg',
  '/file-uploads/17.jpg',
  '/file-uploads/18.jpg',
  '/file-uploads/19.jpg',
  '/file-uploads/20.jpg',
  '/file-uploads/21.jpg',
  '/file-uploads/22.jpg',
  '/file-uploads/23.jpg',
  '/file-uploads/24.jpg',
  '/file-uploads/25.jpg',
  '/file-uploads/26.jpg',
  '/file-uploads/27.jpg',
  '/file-uploads/28.jpg',
  '/file-uploads/29.jpg',
  '/file-uploads/30.jpg',
  '/file-uploads/31.jpg',
  '/file-uploads/32.jpg',
  '/file-uploads/33.jpg',
  '/file-uploads/34.jpg',
  '/file-uploads/35.jpg',
  '/file-uploads/36.jpg',
];

// Hotspots data from the provided information
const hotspots: Hotspot[] = [
  {
    id: 1,
    name: 'Shaheed Minar',
    location: 'Bir Tikendrajit Park, Imphal',
    district: 'Imphal Valley',
    details:
      "A memorial honoring Manipuri martyrs of the 1891 Anglo-Manipuri War. This historic monument stands as a symbol of resistance and serves as a reminder of Manipur's fight for independence.",
    image: availableImages[0],
    additionalImages: ['/file-uploads/sah2.jpg', '/file-uploads/sah5.jpg'],
    category: 'Historical',
    visitDuration: '1-2 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Visit early morning to avoid crowds',
      'Great for photography',
      'Near other central Imphal attractions',
    ],
  },
  {
    id: 2,
    name: 'Khwairamband Bazar (Ima Market)',
    location: 'Imphal West (city center)',
    district: 'Imphal Valley',
    details:
      "Asia's largest all-women-run market with traditional handicrafts, spices, and textiles. This unique market has been operating for over 500 years and showcases the economic empowerment of women in Manipuri society.",
    image: availableImages[1],
    additionalImages: ['/file-uploads/kha1.jpg', '/file-uploads/kha2.jpg'],
    category: 'Cultural',
    visitDuration: '2-3 hours',
    bestTime: 'Any time of year',
    entryFee: 'Free',
    tips: [
      'Bargaining is acceptable but respectful',
      'Best visited in the morning when fresh produce arrives',
      'Great for purchasing authentic Manipuri handicrafts',
    ],
  },
  {
    id: 3,
    name: 'Manipur Zoological Garden',
    location: 'Lamphelpat, Imphal',
    district: 'Imphal Valley',
    details:
      'Home to the endangered Sangai deer and other wildlife. The zoo is involved in conservation efforts for several endangered species native to the northeast region of India.',
    image: availableImages[2],
    additionalImages: ['/file-uploads/zoo1.jpg', '/file-uploads/zoo4.jpg'],
    category: 'Wildlife',
    visitDuration: '3-4 hours',
    bestTime: 'November to February',
    entryFee: '₹50 for adults, ₹20 for children',
    tips: [
      'Visit during feeding times for best animal viewing',
      'Wear comfortable walking shoes',
      'Photography allowed with small fee',
    ],
  },
  {
    id: 4,
    name: 'Khonghampat Orchidarium',
    location: '10 km from Imphal (NH-39)',
    district: 'Imphal Valley',
    details:
      'Houses over 110 rare orchid species, including endemic varieties. This botanical garden is a paradise for nature lovers and showcases the rich biodiversity of the region.',
    image: availableImages[3],
    additionalImages: ['/file-uploads/or2.jpg', '/file-uploads/or3.jpg'],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'March to May (flowering season)',
    entryFee: '₹30',
    tips: [
      'Bring a camera for close-up flower photography',
      'Visit during peak blooming season',
      'Guided tours available',
    ],
  },
  {
    id: 5,
    name: 'Sadu Chiru Waterfall',
    location: 'Tiddim Road (NH-150), 20 km from Imphal',
    district: 'Imphal Valley',
    details:
      'A three-tiered waterfall surrounded by lush foothills. The cascading water creates a serene atmosphere perfect for nature enthusiasts and photographers.',
    image: availableImages[4],
    additionalImages: ['/file-uploads/sa3.jpg', '/file-uploads/sa2.jpg'],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'June to September (monsoon)',
    entryFee: 'Free',
    tips: [
      'Wear appropriate footwear for slippery terrain',
      'Best visited during monsoon for full water flow',
      'Picnic spots available nearby',
    ],
  },
  {
    id: 6,
    name: 'Waithou Lake',
    location: '16 km from Imphal',
    district: 'Thoubal District',
    details:
      'A serene lake ideal for birdwatching and picnics. The surrounding hills and vegetation create a picturesque setting perfect for relaxation.',
    image: availableImages[5],
    additionalImages: ['/file-uploads/wa2.jpg', '/file-uploads/wa3.jpg'],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Bring binoculars for birdwatching',
      'Early morning visits recommended for wildlife',
      'Boat rides available',
    ],
  },
  {
    id: 7,
    name: 'Khangkhui Cave',
    location: '20 km from Ukhrul town',
    district: 'Ukhrul District',
    details:
      'Ancient limestone caves with WWII bunker remnants. These natural caves have historical significance and feature interesting limestone formations.',
    image: availableImages[6],
    additionalImages: ['/file-uploads/72.jpg', '/file-uploads/73.jpg'],
    category: 'Adventure',
    visitDuration: '2-3 hours',
    bestTime: 'October to April',
    entryFee: '₹50',
    tips: [
      'Bring a flashlight/torch',
      'Wear sturdy shoes',
      'Local guide recommended',
    ],
  },
  {
    id: 8,
    name: 'Tharon Cave',
    location: '30 km from Tamenglong',
    district: 'Tamenglong District',
    details:
      'A 650-meter-long cave system with carvings linked to Vietnamese Hovnanian culture. This archaeological site offers insights into ancient civilizations.',
    image: availableImages[7],
    additionalImages: ['/file-uploads/th5.jpg', '/file-uploads/th3.jpg'],
    category: 'Adventure',
    visitDuration: 'Half day',
    bestTime: 'November to February',
    entryFee: '₹100',
    tips: [
      'Local guide mandatory',
      'Carry water and snacks',
      'Moderate physical fitness required',
    ],
  },
  {
    id: 9,
    name: 'Andro Village',
    location: '25 km from Imphal',
    district: 'Offbeat Gems',
    details:
      'Famous for traditional pottery and a cultural complex with tribal house replicas. This village offers an authentic glimpse into the traditional lifestyles of Manipuri communities.',
    image: availableImages[8],
    additionalImages: ['/file-uploads/an3.jpg', '/file-uploads/an1.jpg'],
    category: 'Cultural',
    visitDuration: 'Half day',
    bestTime: 'October to March',
    entryFee: '₹50 for cultural complex',
    tips: [
      'Pottery demonstrations available',
      'Support local artisans by purchasing crafts',
      'Respectful photography encouraged',
    ],
  },
  {
    id: 10,
    name: 'Singda Dam',
    location: '26 km from Imphal',
    district: 'Offbeat Gems',
    details:
      "The world's highest mud dam, surrounded by terraced paddy fields. This engineering marvel offers breathtaking views of the surrounding landscape.",
    image: availableImages[9],
    additionalImages: ['/file-uploads/si2.jpg', '/file-uploads/si3.jpg'],
    category: 'Engineering',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Sunset views are spectacular',
      'Photography permitted',
      'Limited facilities so bring supplies',
    ],
  },
  {
    id: 11,
    name: 'Kangla Fort',
    location: 'Imphal City',
    district: 'Imphal Valley',
    details:
      "An ancient fort with historical significance, featuring temples and gardens. Once the seat of Manipur's power, this site offers a glimpse into the royal history of the region.",
    image: availableImages[10],
    additionalImages: ['/file-uploads/112.jpg', '/file-uploads/113.jpg'],
    category: 'Historical',
    visitDuration: '2-3 hours',
    bestTime: 'October to March',
    entryFee: '₹30 for Indians, ₹100 for foreigners',
    tips: [
      'Hire a local guide for historical insights',
      'Visit early morning for best photography',
      "Don't miss the Coronation Hall",
    ],
  },
  {
    id: 12,
    name: 'Shree Govindajee Temple',
    location: 'Imphal City',
    district: 'Imphal Valley',
    details:
      'A renowned Vaishnavite temple known for its impressive architecture and religious importance. This twin-domed temple is an important spiritual center for the people of Manipur.',
    image: availableImages[11],
    additionalImages: ['/file-uploads/122.jpg', '/file-uploads/123.jpg'],
    category: 'Religious',
    visitDuration: '1-2 hours',
    bestTime: 'Any time of year',
    entryFee: 'Free',
    tips: [
      'Dress modestly when visiting',
      'Morning aarti is a special experience',
      'Remove footwear before entering',
    ],
  },
  {
    id: 13,
    name: 'Imphal War Cemetery',
    location: 'Imphal City',
    district: 'Imphal Valley',
    details:
      'A solemn memorial commemorating soldiers who died during World War II. This well-maintained cemetery pays tribute to the Allied forces who fought in the Battle of Imphal.',
    image: availableImages[12],
    additionalImages: ['/file-uploads/132.jpg', '/file-uploads/133.jpg'],
    category: 'Historical',
    visitDuration: '1 hour',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Maintain respectful silence',
      'Photography permitted',
      'Historical information available at the entrance',
    ],
  },
  {
    id: 14,
    name: 'Manipur State Museum',
    location: 'Imphal City',
    district: 'Imphal Valley',
    details:
      "Displaying a rich collection of cultural artifacts and historical items that highlight Manipur's heritage. The museum offers insights into tribal cultures, royal history, and traditional arts.",
    image: availableImages[13],
    additionalImages: ['/file-uploads/142.jpg', '/file-uploads/143.jpg'],
    category: 'Cultural',
    visitDuration: '2-3 hours',
    bestTime: 'Any time of year',
    entryFee: '₹20',
    tips: [
      'Closed on Mondays',
      'Photography with permission only',
      'Audio guides available',
    ],
  },
  {
    id: 15,
    name: 'Loktak Lake',
    location: 'Moirang, Bishnupur District',
    district: 'Bishnupur District',
    details:
      'The largest freshwater lake in Northeast India, known for its unique floating islands called phumdis. This ecological wonder supports diverse wildlife and offers spectacular views.',
    image: availableImages[14],
    additionalImages: ['/file-uploads/152.jpg', '/file-uploads/153.jpg'],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'November to February',
    entryFee: '₹50 for boat rides',
    tips: [
      'Take a boat tour to fully experience the lake',
      'Visit Sendra Island for panoramic views',
      'Best enjoyed at sunrise or sunset',
    ],
  },
  {
    id: 16,
    name: 'Keibul Lamjao National Park',
    location: 'Bishnupur District',
    district: 'Bishnupur District',
    details:
      "The world's only floating national park, home to the endangered Sangai deer. This unique ecosystem is built on phumdis and provides a critical habitat for rare wildlife.",
    image: availableImages[15],
    additionalImages: ['/file-uploads/162.jpg', '/file-uploads/163.jpg'],
    category: 'Wildlife',
    visitDuration: '3-4 hours',
    bestTime: 'November to February',
    entryFee: '₹50 for Indians, ₹200 for foreigners',
    tips: [
      'Bring binoculars for wildlife spotting',
      'Morning visits offer better chances to see the Sangai deer',
      'Photography permitted',
    ],
  },
  {
    id: 17,
    name: 'Vishnu Temple at Bishnupur',
    location: 'Bishnupur District',
    district: 'Bishnupur District',
    details:
      'A temple of historical and cultural significance as a major religious site in the region. The architecture blends local styles with traditional Hindu temple features.',
    image: availableImages[16],
    additionalImages: ['/file-uploads/172.jpg', '/file-uploads/173.jpg'],
    category: 'Religious',
    visitDuration: '1-2 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Dress modestly',
      'Remove footwear before entering',
      'Local guides can explain the historical significance',
    ],
  },
  {
    id: 18,
    name: 'Khongjom War Memorial Complex',
    location: 'Thoubal District',
    district: 'Thoubal District',
    details:
      'Commemorating the bravery and sacrifice during the Anglo-Manipuri War of 1891. This memorial honors the heroes who fought against British colonial forces.',
    image: availableImages[17],
    additionalImages: ['/file-uploads/182.jpg', '/file-uploads/183.jpg'],
    category: 'Historical',
    visitDuration: '2 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Visit the museum inside for historical context',
      'Special events held on April 23rd (Khongjom Day)',
      'Good for history enthusiasts',
    ],
  },
  {
    id: 19,
    name: 'Kakching Garden',
    location: 'Thoubal District',
    district: 'Thoubal District',
    details:
      'A scenic garden popular for picnics and leisurely outings. This well-maintained park features beautiful landscaping, walking paths, and recreational areas.',
    image: availableImages[18],
    additionalImages: ['/file-uploads/192.jpg', '/file-uploads/193.jpg'],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: '₹10',
    tips: [
      'Perfect for family outings',
      'Best visited in the morning',
      'Bring your own picnic supplies',
    ],
  },
  {
    id: 20,
    name: 'Kaina Hill',
    location: 'Thoubal District',
    district: 'Thoubal District',
    details:
      'Offering panoramic views and rewarding trekking opportunities. The hill also has religious significance with a temple dedicated to Lord Krishna at the top.',
    image: availableImages[19],
    additionalImages: ['/file-uploads/202.jpg', '/file-uploads/203.jpg'],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Moderate trekking difficulty',
      'Wear comfortable shoes',
      'Carry water and snacks',
    ],
  },
  {
    id: 21,
    name: 'Khuga Dam',
    location: 'Churachandpur District',
    district: 'Churachandpur District',
    details:
      'A dam with scenic surroundings and recreational activities. This multipurpose dam provides irrigation and drinking water while also serving as a tourist attraction.',
    image: availableImages[20],
    additionalImages: ['/file-uploads/212.jpg', '/file-uploads/213.jpg'],
    category: 'Engineering',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Good for photography',
      'Picnic spots available',
      'Best visited in the evening for sunset views',
    ],
  },
  {
    id: 22,
    name: 'Tipaimukh Dam',
    location: 'Churachandpur District',
    district: 'Churachandpur District',
    details:
      'Offering stunning views and serving as a favored spot among nature lovers. The surrounding forests and hills make this a picturesque location.',
    image: availableImages[21],
    additionalImages: ['/file-uploads/222.jpg', '/file-uploads/223.jpg'],
    category: 'Engineering',
    visitDuration: 'Half day',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Permission may be required to visit',
      'Accessible by road but prepare for rough terrain',
      'Limited facilities so carry essentials',
    ],
  },
  {
    id: 23,
    name: 'Tisar Lake',
    location: 'Churachandpur District',
    district: 'Churachandpur District',
    details:
      'A serene lake ideal for relaxation and enjoying peaceful natural surroundings. The pristine waters reflect the surrounding hills creating a tranquil atmosphere.',
    image: availableImages[22],
    additionalImages: ['/file-uploads/232.jpg', '/file-uploads/233.jpg'],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Off the beaten path',
      'Good for bird watching',
      'Bring your own refreshments',
    ],
  },
  {
    id: 24,
    name: 'Mao Gate',
    location: 'Senapati District',
    district: 'Senapati District',
    details:
      'Marking the entry point to Manipur from Nagaland, this border area is known for its scenic beauty and cultural significance. Local markets sell fresh produce and handicrafts.',
    image: availableImages[23],
    additionalImages: ['/file-uploads/242.jpg', '/file-uploads/243.jpg'],
    category: 'Cultural',
    visitDuration: '1-2 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Local markets worth exploring',
      'Try regional cuisine',
      'Beautiful scenery for photography',
    ],
  },
  {
    id: 25,
    name: 'Makhel Cave Temple',
    location: 'Senapati District',
    district: 'Senapati District',
    details:
      'A sacred cave temple steeped in historical significance and local legends. The site is revered by different tribes and has mythological connections.',
    image: availableImages[24],
    additionalImages: ['/file-uploads/252.jpg', '/file-uploads/253.jpg'],
    category: 'Religious',
    visitDuration: '2-3 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Local guide recommended for historical context',
      'Modest dress required',
      'Bring a flashlight',
    ],
  },
  {
    id: 26,
    name: 'Mount Koubru',
    location: 'Senapati District',
    district: 'Senapati District',
    details:
      'A revered mountain and popular trekking destination with spiritual significance for local communities. The summit offers spectacular views of the surrounding landscapes.',
    image: availableImages[25],
    additionalImages: ['/file-uploads/262.jpg', '/file-uploads/263.jpg'],
    category: 'Adventure',
    visitDuration: 'Full day',
    bestTime: 'October to April',
    entryFee: 'Free',
    tips: [
      'Moderate to difficult trek',
      'Start early in the morning',
      'Proper hiking gear recommended',
    ],
  },
  {
    id: 27,
    name: 'Shirui Kashong Peak',
    location: 'Ukhrul District',
    district: 'Ukhrul District',
    details:
      'Known for its breathtaking panoramic views and trekking adventures, this peak is also home to the rare Shirui lily that blooms in May-June. The flower is endemic to this region.',
    image: availableImages[26],
    additionalImages: ['/file-uploads/272.jpg', '/file-uploads/273.jpg'],
    category: 'Adventure',
    visitDuration: 'Full day',
    bestTime: 'May to June for lily blooms, October to April for trekking',
    entryFee: '₹50',
    tips: [
      'Guided treks available',
      'Visit during lily season if possible',
      'Moderate difficulty trek',
    ],
  },
  {
    id: 28,
    name: 'Khayang Peak',
    location: 'Ukhrul District',
    district: 'Ukhrul District',
    details:
      'Offering scenic views and a favored destination for trekking enthusiasts. The peak provides outstanding vistas of the surrounding valleys and hills.',
    image: availableImages[27],
    additionalImages: ['/file-uploads/282.jpg', '/file-uploads/282.jpg'],
    category: 'Adventure',
    visitDuration: 'Full day',
    bestTime: 'October to April',
    entryFee: 'Free',
    tips: [
      'Less crowded than other trekking destinations',
      'Local guide recommended',
      'Carry sufficient water and snacks',
    ],
  },
  {
    id: 29,
    name: 'Barak Waterfall',
    location: 'Tamenglong District',
    district: 'Tamenglong District',
    details:
      'A stunning waterfall nestled amidst verdant landscapes, offering a refreshing experience. The cascading waters create a mesmerizing sight and soothing sounds.',
    image: availableImages[28],
    additionalImages: ['/file-uploads/292.jpg', '/file-uploads/293.jpg'],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'June to September (monsoon)',
    entryFee: 'Free',
    tips: [
      'Slippery paths during monsoon',
      'Swimming possible but exercise caution',
      'Picnic facilities available',
    ],
  },
  {
    id: 30,
    name: 'Zeilad Lake',
    location: 'Tamenglong District',
    district: 'Tamenglong District',
    details:
      'A serene lake that offers peaceful natural surroundings and is steeped in local folklore. The crystal-clear waters reflect the surrounding hills and forests.',
    image: availableImages[29],
    additionalImages: ['/file-uploads/30.jpg', '/file-uploads/30.jpg'],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Off the beaten path',
      'Local guides can share folklore',
      'Bring your own refreshments',
    ],
  },
  {
    id: 31,
    name: 'Buning Meadows',
    location: 'Tamenglong District',
    district: 'Tamenglong District',
    details:
      'Known for its natural beauty and unique array of flora, this meadow offers a peaceful retreat into nature. The open grasslands are surrounded by forested hills.',
    image: availableImages[30],
    additionalImages: ['/file-uploads/312.jpg', '/file-uploads/313.jpg'],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'October to April',
    entryFee: 'Free',
    tips: [
      'Great for nature photography',
      'Wildflowers bloom in spring',
      'Bring picnic supplies',
    ],
  },
  {
    id: 32,
    name: 'Dzukou Valley',
    location: 'On the border of Manipur and Nagaland',
    district: 'Other Attractions',
    details:
      'Known for its spectacular scenic landscapes and excellent trekking opportunities. The valley is famous for its seasonal wildflowers and rolling hills.',
    image: availableImages[31],
    additionalImages: ['/file-uploads/322.jpg', '/file-uploads/323.jpg'],
    category: 'Adventure',
    visitDuration: '1-2 days',
    bestTime: 'June to September for flowers, October to May for trekking',
    entryFee: '₹100',
    tips: [
      'Camping facilities available',
      'Guide mandatory for first-time visitors',
      'Challenging trek but worth the effort',
    ],
  },
  {
    id: 33,
    name: 'Thangjing Hill',
    location: 'Near Loktak Lake',
    district: 'Other Attractions',
    details:
      'Providing panoramic views of Loktak Lake and its surroundings. The hill has religious significance with a temple at the summit.',
    image: availableImages[32],
    additionalImages: ['/file-uploads/332.jpg', '/file-uploads/333.jpg'],
    category: 'Nature',
    visitDuration: 'Half day',
    bestTime: 'October to March',
    entryFee: 'Free',
    tips: [
      'Moderate trek',
      'Religious ceremonies during festivals',
      'Best views in the morning',
    ],
  },
  {
    id: 34,
    name: 'Mutua Bahadur Museum',
    location: 'Imphal City',
    district: 'Imphal Valley',
    details:
      'Exhibiting the life and achievements of Mutua Bahadur through cultural displays and artifacts. The museum highlights the contributions of this important historical figure.',
    image: availableImages[33],
    additionalImages: ['/file-uploads/342.jpg', '/file-uploads/343.jpg'],
    category: 'Cultural',
    visitDuration: '1-2 hours',
    bestTime: 'Any time of year',
    entryFee: '₹30',
    tips: [
      'Closed on Mondays',
      'Photography with permission',
      'Guided tours available',
    ],
  },
  {
    id: 35,
    name: 'Pumlenpat Lake',
    location: 'Near Loktak Lake',
    district: 'Other Attractions',
    details:
      'A tranquil lake ideal for bird watching and relaxation. Less visited than Loktak, this lake offers a peaceful alternative with similar floating vegetation.',
    image: availableImages[34],
    additionalImages: ['/file-uploads/352.jpg', '/file-uploads/353.jpg'],
    category: 'Nature',
    visitDuration: '2-3 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Bring binoculars for bird watching',
      'Less crowded than Loktak',
      'Limited facilities so carry essentials',
    ],
  },
  {
    id: 36,
    name: 'Ikop Pat Lake',
    location: 'Near Loktak Lake',
    district: 'Other Attractions',
    details:
      'Known for its natural beauty and peaceful environment, this smaller lake offers tranquility and opportunities to observe local fishing traditions.',
    image: availableImages[35],
    additionalImages: ['/file-uploads/362.jpg', '/file-uploads/363.jpg'],
    category: 'Nature',
    visitDuration: '2 hours',
    bestTime: 'November to February',
    entryFee: 'Free',
    tips: [
      'Off the tourist trail',
      'Good for photography',
      'Visit early morning to see fishermen',
    ],
  },
];

// Category filters
const categories = [
  'All',
  'Historical',
  'Cultural',
  'Nature',
  'Wildlife',
  'Adventure',
  'Engineering',
];

// Districts for filtering
const districts = [
  'All Districts',
  'Imphal Valley',
  'Bishnupur District',
  'Thoubal District',
  'Ukhrul District',
  'Tamenglong District',
  'Churachandpur District',
  'Senapati District',
  'Offbeat Gems',
];

const HotspotsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDistrict, setActiveDistrict] = useState('All Districts');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotspots, setFilteredHotspots] = useState(hotspots);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [itineraryItems, setItineraryItems] = useState<Hotspot[]>([]);

  useEffect(() => {
    // Load saved itinerary items on component mount
    const savedItems = localStorage.getItem('manipurItinerary');
    if (savedItems) {
      setItineraryItems(JSON.parse(savedItems));
    }
  }, []);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    filterHotspots(value, activeDistrict, searchTerm);
  };

  const handleDistrictChange = (value: string) => {
    setActiveDistrict(value);
    filterHotspots(activeCategory, value, searchTerm);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterHotspots(activeCategory, activeDistrict, term);
  };

  const filterHotspots = (category: string, district: string, term: string) => {
    let filtered = hotspots;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(hotspot => hotspot.category === category);
    }

    // Filter by district
    if (district !== 'All Districts') {
      filtered = filtered.filter(hotspot => hotspot.district === district);
    }

    // Filter by search term
    if (term) {
      filtered = filtered.filter(
        hotspot =>
          hotspot.name.toLowerCase().includes(term.toLowerCase()) ||
          hotspot.details.toLowerCase().includes(term.toLowerCase()) ||
          hotspot.location.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredHotspots(filtered);
  };

  const handleSeeDetails = (hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setIsDetailsOpen(true);
  };

  const handleAddToItinerary = (hotspot: Hotspot) => {
    const updatedItinerary = [...itineraryItems];

    // Check if the hotspot is already in the itinerary
    const existingIndex = updatedItinerary.findIndex(
      item => item.id === hotspot.id
    );

    if (existingIndex === -1) {
      // Add to itinerary if not already there
      updatedItinerary.push(hotspot);
      setItineraryItems(updatedItinerary);

      // Save to localStorage
      localStorage.setItem(
        'manipurItinerary',
        JSON.stringify(updatedItinerary)
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[300px] mb-8">
        <img
          src="/file-uploads/marjing.png"
          alt="Manipur Hotspots"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">
            Manipur Hotspots
          </h1>
          <p className="text-xl text-white/90 animate-fade-in transition-all duration-500 delay-150">
            Discover the hidden gems and popular attractions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative md:max-w-sm w-full transition-all duration-300 hover:scale-[1.01]">
              <Search
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search hotspots..."
                className="pl-9 transition-shadow duration-300 focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <select
                className="px-4 py-2 rounded-md border border-input bg-background text-sm transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                value={activeDistrict}
                onChange={e => handleDistrictChange(e.target.value)}
              >
                {districts.map(district => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="ml-auto">
              <Button
                asChild
                className="transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Link to="/itinerary">
                  <Map size={16} />
                  View My Itinerary
                  {itineraryItems.length > 0 && (
                    <Badge className="ml-1 bg-secondary text-secondary-foreground">
                      {itineraryItems.length}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="All"
            value={activeCategory}
            onValueChange={handleCategoryChange}
          >
            <TabsList className="inline-flex h-auto flex-wrap gap-2 mb-6 bg-transparent">
              {categories.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHotspots.map(hotspot => (
                    <Card
                      key={hotspot.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={hotspot.image}
                          alt={hotspot.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <Badge className="absolute top-3 left-3 bg-primary animate-fade-in">
                          {hotspot.category}
                        </Badge>
                        <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground animate-fade-in">
                          {hotspot.district}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {hotspot.name}
                        </h3>

                        <div className="flex items-center text-muted-foreground mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span className="text-sm">{hotspot.location}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="flex items-center text-sm">
                            <Clock
                              size={14}
                              className="mr-1 text-muted-foreground"
                            />
                            <span>{hotspot.visitDuration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Camera
                              size={14}
                              className="mr-1 text-muted-foreground"
                            />
                            <span>Entry: {hotspot.entryFee}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {hotspot.details}
                        </p>

                        {hotspot.tips && hotspot.tips.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center mb-2">
                              <ThumbsUp
                                size={14}
                                className="text-primary mr-1"
                              />
                              <span className="text-sm font-medium">
                                Travel Tips:
                              </span>
                            </div>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {hotspot.tips.slice(0, 2).map((tip, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-1">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                              {hotspot.tips.length > 2 && (
                                <li className="text-primary cursor-pointer hover:underline">
                                  + {hotspot.tips.length - 2} more tips
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white mt-2 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                          onClick={() => handleSeeDetails(hotspot)}
                        >
                          See Details
                          <Info size={14} />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredHotspots.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">
                      No hotspots found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try changing your search criteria or filters
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('All');
                        setActiveDistrict('All Districts');
                        setFilteredHotspots(hotspots);
                      }}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Information Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Explore Manipur's Treasures</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              From historical monuments to natural wonders, Manipur offers a
              diverse range of attractions for every type of traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="transition-all duration-500 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock size={18} className="mr-2 text-primary" />
                Best Time to Visit
              </h3>
              <p className="text-muted-foreground mb-4">
                October to March is generally considered the best time to visit
                Manipur, as the weather is pleasant and comfortable for
                sightseeing and outdoor activities.
              </p>
              <p className="text-muted-foreground">
                The region experiences monsoons from June to September, which
                can make travel challenging but also brings lush greenery and
                flowing waterfalls.
              </p>
            </div>

            <div className="transition-all duration-500 hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ThumbsUp size={18} className="mr-2 text-primary" />
                Travel Tips
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Carry valid ID proof as some areas might require permits
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Respect local customs and dress modestly when visiting
                    religious sites
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Hire local guides for enhanced experience and supporting
                    local economy
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Book accommodations in advance during peak season
                    (October-February)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-8 text-center transition-all duration-500 hover:bg-muted/50">
            <h3 className="text-2xl font-bold mb-4">Create Your Custom Tour</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Add places to your itinerary, organize them in your preferred
              order, and plan the perfect Manipur tour tailored to your
              interests.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
              asChild
            >
              <Link to="/itinerary">
                <Map size={16} />
                Go to My Itinerary
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      {selectedHotspot && (
        <HotspotDetailsDialog
          hotspot={selectedHotspot}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onAddToItinerary={handleAddToItinerary}
        />
      )}

      <Footer />
    </div>
  );
};

export default HotspotsPage;
