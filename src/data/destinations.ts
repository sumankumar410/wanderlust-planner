import goaImg from "@/assets/dest-goa.jpg";
import manaliImg from "@/assets/dest-manali.jpg";
import jaipurImg from "@/assets/dest-jaipur.jpg";
import parisImg from "@/assets/dest-paris.jpg";
import dubaiImg from "@/assets/dest-dubai.jpg";
import baliImg from "@/assets/dest-bali.jpg";

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  rating: number;
  shortDesc: string;
  description: string;
  bestTime: string;
  budget: string;
  topAttractions: string[];
  mapQuery: string;
}

export const destinations: Destination[] = [
  {
    id: "goa",
    name: "Goa",
    country: "India",
    image: goaImg,
    rating: 4.7,
    shortDesc: "Sun, sand, and vibrant nightlife on India's west coast.",
    description: "Goa is a state on the southwestern coast of India known for its stunning beaches, vibrant nightlife, and Portuguese-influenced architecture. From the bustling beaches of Baga and Calangute to the serene shores of Palolem, Goa offers something for every traveler.",
    bestTime: "November – February",
    budget: "₹15,000 – ₹40,000 for 4 days",
    topAttractions: ["Baga Beach", "Fort Aguada", "Dudhsagar Falls", "Old Goa Churches", "Anjuna Flea Market"],
    mapQuery: "Goa,India",
  },
  {
    id: "manali",
    name: "Manali",
    country: "India",
    image: manaliImg,
    rating: 4.8,
    shortDesc: "Himalayan paradise with snow-capped peaks and adventure.",
    description: "Nestled in the mountains of Himachal Pradesh, Manali is a high-altitude Himalayan resort town. It's a gateway for skiing, trekking, and adventure sports. The town sits on the Beas River and is known for its stunning landscapes and vibrant culture.",
    bestTime: "October – June",
    budget: "₹12,000 – ₹35,000 for 4 days",
    topAttractions: ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "Old Manali", "Jogini Waterfall"],
    mapQuery: "Manali,Himachal+Pradesh,India",
  },
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    image: jaipurImg,
    rating: 4.6,
    shortDesc: "The Pink City — royal palaces, forts, and rich heritage.",
    description: "Jaipur, the capital of Rajasthan, is known as the Pink City due to its stunning terracotta-colored buildings. It's home to magnificent palaces, ancient forts, and vibrant bazaars that showcase India's rich royal heritage.",
    bestTime: "October – March",
    budget: "₹10,000 – ₹30,000 for 3 days",
    topAttractions: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar", "Nahargarh Fort"],
    mapQuery: "Jaipur,India",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: parisImg,
    rating: 4.9,
    shortDesc: "The City of Light — romance, art, and timeless elegance.",
    description: "Paris, the capital of France, is one of the world's most iconic cities. Known for the Eiffel Tower, world-class museums, exquisite cuisine, and romantic atmosphere, Paris is a dream destination for travelers worldwide.",
    bestTime: "April – June, September – November",
    budget: "$1,500 – $3,500 for 5 days",
    topAttractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Champs-Élysées", "Montmartre"],
    mapQuery: "Paris,France",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    image: dubaiImg,
    rating: 4.8,
    shortDesc: "Futuristic skyline, luxury shopping, and desert adventures.",
    description: "Dubai is a city of superlatives — the tallest building, the largest mall, and some of the most luxurious hotels in the world. This ultramodern city blends traditional Arabian culture with cutting-edge architecture and world-class entertainment.",
    bestTime: "November – March",
    budget: "$1,200 – $3,000 for 4 days",
    topAttractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Marina", "Desert Safari"],
    mapQuery: "Dubai,UAE",
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    image: baliImg,
    rating: 4.7,
    shortDesc: "Tropical island bliss with temples, rice terraces, and surf.",
    description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to ancient temples, lush jungles, and a vibrant spiritual culture that attracts millions of visitors each year.",
    bestTime: "April – October",
    budget: "$800 – $2,000 for 5 days",
    topAttractions: ["Ubud Rice Terraces", "Tanah Lot Temple", "Uluwatu Temple", "Seminyak Beach", "Mount Batur"],
    mapQuery: "Bali,Indonesia",
  },
];

export const itineraryTemplates: Record<string, Record<string, string[]>> = {
  goa: {
    low: [
      "Arrival & check into budget hostel. Evening beach walk at Miramar.",
      "Explore Old Goa churches & Fontainhas. Street food lunch.",
      "Palolem Beach day. Kayaking & sunset views.",
      "Dudhsagar Falls day trip. Local Goan dinner.",
      "Shopping at Mapusa Market. Departure.",
    ],
    medium: [
      "Arrival & check into beachside resort. Welcome dinner at Fisherman's Wharf.",
      "North Goa tour: Fort Aguada, Candolim & Baga Beach. Water sports.",
      "South Goa: Palolem Beach, boat ride to Butterfly Island.",
      "Dudhsagar Falls trek. Spice plantation visit. Goan cooking class.",
      "Shopping at Anjuna Flea Market. Spa session. Departure.",
    ],
    high: [
      "Private airport transfer to 5-star resort. Welcome champagne & sunset cruise.",
      "Private yacht tour along the coast. Gourmet seafood lunch. Casino evening.",
      "Helicopter ride over Goa. Private beach cabana. Fine dining.",
      "Luxury spa day. Exclusive wine tasting. Private Dudhsagar Falls trip.",
      "Personal shopper experience. Farewell dinner at a Michelin-style restaurant.",
    ],
  },
  default: {
    low: [
      "Arrival & settle into budget accommodation. Explore local neighborhood.",
      "Visit top free attractions & landmarks. Try street food.",
      "Day trip to nearby scenic spot. Evening at local market.",
      "Cultural experience: museum or temple visit. Budget shopping.",
      "Final exploration & departure.",
    ],
    medium: [
      "Arrival at comfortable hotel. City orientation tour.",
      "Full-day guided sightseeing of major attractions.",
      "Adventure activity or cultural workshop.",
      "Shopping & local cuisine food tour.",
      "Leisure morning & departure.",
    ],
    high: [
      "Private transfer to luxury hotel. Welcome experience.",
      "Private guided tour of iconic landmarks with gourmet lunch.",
      "Exclusive experience: helicopter/yacht/VIP access.",
      "Luxury spa & fine dining.",
      "Personal concierge shopping. Private departure.",
    ],
  },
};
