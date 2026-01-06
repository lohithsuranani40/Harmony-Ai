
import { ServiceProvider } from './types';

export const MOCK_PROVIDERS: ServiceProvider[] = [
  {
    id: 'p1',
    name: 'Pandit Sharma',
    type: 'poojari',
    experience: 15,
    languages: ['Sanskrit', 'Hindi', 'English'],
    rating: 4.8,
    location: 'Mumbai, Maharashtra',
    temple: 'Ganesh Temple, Borivali',
    bio: 'Experienced priest specializing in Vedic rituals and housewarming ceremonies. Trained in classical Sanskrit mantras.',
    avatar: 'https://picsum.photos/seed/pandit1/200/200',
    verified: true,
    services: [
      { id: 's1', name: 'Griha Pravesh', price: 5000, description: 'Complete housewarming ceremony with Havan.', items: ['Coconut', 'Turmeric', 'Sandalwood', 'Flowers', 'Ghee'] },
      { id: 's2', name: 'Satyanarayan Pooja', price: 2500, description: 'Prosperity and well-being pooja.', items: ['Pancha Amrut', 'Fruits', 'Betel Leaves'] },
      { id: 's3', name: 'Vehicle Pooja', price: 500, description: 'New vehicle blessing ceremony.', items: ['Lemons', 'Incense', 'Camphor'] }
    ]
  },
  {
    id: 'p2',
    name: 'Aditya Hegde',
    type: 'poojari',
    experience: 8,
    languages: ['Kannada', 'Hindi', 'Sanskrit'],
    rating: 4.5,
    location: 'Bengaluru, Karnataka',
    temple: 'Iskcon Temple, Rajajinagar',
    bio: 'Dedicated priest for family rituals and weddings. Special focus on meaningful explanation of mantras.',
    avatar: 'https://picsum.photos/seed/pandit2/200/200',
    verified: true,
    services: [
      { id: 's4', name: 'Vivaha (Wedding)', price: 25000, description: 'Full wedding ceremony rituals.', items: ['Rice', 'Sacred Thread', 'Garlands'] },
      { id: 's5', name: 'Annaprasana', price: 2000, description: 'First solid food feeding ceremony for babies.' }
    ]
  },
  {
    id: 'pl1',
    name: 'Ramesh Kumar',
    companyName: 'RK Plumb-It Services',
    type: 'plumber',
    experience: 10,
    languages: ['Hindi', 'Marathi'],
    rating: 4.2,
    location: 'Pune, Maharashtra',
    bio: 'Expert in leak repairs and bathroom installations. Available for 24/7 emergencies.',
    avatar: 'https://picsum.photos/seed/plumber1/200/200',
    verified: true,
    services: [
      { id: 'pl-s1', name: 'Tap Leakage Repair', price: 250, description: 'Fixing dripping taps and valve replacements.' },
      { id: 'pl-s2', name: 'Full Pipeline Install', price: 15000, description: 'Modern CPVC piping for new homes.' }
    ]
  },
  {
    id: 'pl2',
    name: 'John Dsouza',
    companyName: 'The Drain Master',
    type: 'plumber',
    experience: 20,
    languages: ['English', 'Konkani', 'Hindi'],
    rating: 4.9,
    location: 'Goa',
    bio: 'Specialist in solar water heater maintenance and complex drainage systems.',
    avatar: 'https://picsum.photos/seed/plumber2/200/200',
    verified: false,
    services: [
      { id: 'pl-s3', name: 'Solar Heater Cleaning', price: 1200, description: 'Removing scale and optimizing performance.' },
      { id: 'pl-s4', name: 'Clogged Drain Clearing', price: 400, description: 'Mechanical cleaning of kitchen/bathroom drains.' }
    ]
  }
];
