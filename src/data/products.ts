export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  category: string;
  brand: string;
  model?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Nova Pro Smartphone',
    price: 899,
    originalPrice: 999,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    description: 'A high-end smartphone with advanced features and cutting-edge technology.',
    features: [
      '6.7" OLED Display',
      'A17 Pro Chip',
      '48MP Triple Camera System',
      '5G Connectivity',
      'Face ID Security',
      'IP68 Water Resistance'
    ],
    specifications: {
      'Display': '6.7" OLED, 2778 x 1284 pixels',
      'Processor': 'A17 Pro Chip',
      'Storage': '128GB - 512GB',
      'Camera': '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      'Battery': '3200mAh with Fast Charging',
      'OS': 'iOS 17'
    },
    category: 'smartphones',
    brand: 'NovaTech'
  },
  {
    id: '2',
    name: 'TechBook Air Laptop',
    price: 1299,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    description: 'Ultra-thin and lightweight laptop with powerful performance and all-day battery life.',
    features: [
      '14-inch Liquid Retina Display',
      'M3 Chip with 8-core CPU',
      'Up to 18 hours of battery life',
      '16GB Unified Memory',
      '512GB SSD Storage',
      'Magic Keyboard with Touch ID'
    ],
    specifications: {
      'Display': '14" Liquid Retina, 3024 x 1964 pixels',
      'Processor': 'M3 Chip with 8-core CPU',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB SSD',
      'Graphics': '10-core GPU',
      'Weight': '3.0 lbs'
    },
    category: 'laptops',
    brand: 'NovaTech'
  },
  {
    id: '3',
    name: 'SoundWave Pro Headphones',
    price: 349,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.9,
    reviewCount: 2156,
    inStock: true,
    description: 'Premium wireless headphones with industry-leading noise cancellation and crystal-clear audio.',
    features: [
      'Industry-leading Active Noise Cancellation',
      '40mm custom dynamic drivers',
      '30-hour battery life with ANC',
      'Transparency mode for ambient sound',
      'Voice assistant support',
      'Comfortable memory foam ear cups'
    ],
    specifications: {
      'Driver': '40mm Custom Dynamic',
      'Frequency': '20Hz - 20kHz',
      'Battery': '30 hours with ANC',
      'Charging': 'USB-C, Wireless',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.3, 3.5mm'
    },
    category: 'audio',
    brand: 'NovaTech'
  },
  {
    id: '4',
    name: 'SmartWatch Elite',
    price: 449,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviewCount: 743,
    inStock: true,
    description: 'Advanced smartwatch with comprehensive health monitoring and premium design.',
    features: [
      'Always-On Retina Display',
      'ECG and Blood Oxygen Monitoring',
      'GPS and Cellular Connectivity',
      'Water Resistant up to 50 meters',
      'Sleep Tracking and Analysis',
      'Customizable Watch Faces'
    ],
    specifications: {
      'Display': '1.9" Always-On Retina',
      'Case': '45mm Aluminum',
      'Health': 'ECG, Blood Oxygen, Heart Rate',
      'Connectivity': 'GPS, Cellular, WiFi, Bluetooth',
      'Battery': '18 hours mixed usage',
      'Water': '50m water resistant'
    },
    category: 'wearables',
    brand: 'NovaTech'
  },
  {
    id: '5',
    name: 'Quantum Gaming Desktop',
    price: 2199,
    image: 'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    description: 'High-performance gaming desktop with cutting-edge components for immersive gaming experiences.',
    features: [
      'NVIDIA RTX 4070 Ti Graphics',
      'Intel Core i7-13700K Processor',
      '32GB DDR5 RAM',
      '1TB NVMe SSD Storage',
      'AIO Liquid Cooling System',
      'RGB Lighting Customization'
    ],
    specifications: {
      'CPU': 'Intel Core i7-13700K',
      'GPU': 'NVIDIA RTX 4070 Ti',
      'RAM': '32GB DDR5-5600',
      'Storage': '1TB NVMe SSD',
      'Cooling': 'AIO Liquid Cooling',
      'PSU': '850W 80+ Gold'
    },
    category: 'computers',
    brand: 'NovaTech'
  },
  {
    id: '6',
    name: 'FastCharge Wireless Pad',
    price: 79,
    image: 'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/4526408/pexels-photo-4526408.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.3,
    reviewCount: 328,
    inStock: true,
    description: 'Fast wireless charging pad with premium design and multi-device compatibility.',
    features: [
      '15W Fast Wireless Charging',
      'Qi-Certified for All Devices',
      'Premium Aluminum and Fabric Design',
      'Over-temperature Protection',
      'LED Charging Indicator',
      'Compact and Portable Design'
    ],
    specifications: {
      'Power': '15W Max Wireless Output',
      'Input': 'USB-C 20W',
      'Compatibility': 'Qi-enabled devices',
      'Material': 'Aluminum & Premium Fabric',
      'Dimensions': '100mm diameter',
      'Weight': '180g'
    },
    category: 'accessories',
    brand: 'NovaTech'
  },
  {
    id: '7',
    name: 'NovaTab Pro Tablet',
    price: 749,
    originalPrice: 849,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.7,
    reviewCount: 512,
    inStock: true,
    description: 'Powerful tablet with professional-grade performance and stunning display for work and entertainment.',
    features: [
      '11-inch OLED Display',
      'Octa-core 3.2GHz Processor',
      '8GB RAM for Multitasking',
      '256GB Expandable Storage',
      'All-Day Battery Life',
      'NovaOS 5 with Productivity Features'
    ],
    specifications: {
      'Display': '11" OLED, 2800 x 1800',
      'Processor': 'Octa-core 3.2GHz',
      'Memory': '8GB',
      'Storage': '256GB',
      'Battery': '7500mAh',
      'OS': 'NovaOS 5'
    },
    category: 'tablets',
    brand: 'NovaTech'
  },
  {
    id: '8',
    name: 'Pro Gaming Mouse',
    price: 129,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.4,
    reviewCount: 210,
    inStock: true,
    description: 'Precision gaming mouse with customizable buttons and high-performance sensor for competitive gaming.',
    features: [
      '16,000 DPI Optical Sensor',
      '6 Programmable Buttons',
      'Ultra-lightweight 95g Design',
      'RGB Lighting Zones',
      'Braided USB-C Cable',
      'Omron Mechanical Switches'
    ],
    specifications: {
      'DPI': '200-16,000',
      'Buttons': '6 Programmable',
      'Weight': '95g',
      'Connection': 'Wired USB-C',
      'Sensor': 'Optical Gaming Sensor',
      'Cable': '2m Braided'
    },
    category: 'accessories',
    brand: 'NovaTech'
  },
  {
    id: '9',
    name: 'Smart Home Hub',
    price: 199,
    image: 'https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/414860/pexels-photo-414860.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.6,
    reviewCount: 340,
    inStock: true,
    description: 'Central hub for smart home devices with voice control and multiple connectivity options.',
    features: [
      'Voice Control with Nova Assistant',
      'Multi-Protocol Support (Wi-Fi, Zigbee, Bluetooth)',
      'HDMI Output for TV Control',
      'Privacy-First Design',
      'Easy Setup with Mobile App',
      'Expandable with Smart Home Ecosystem'
    ],
    specifications: {
      'Connectivity': 'Wi-Fi, Zigbee, Bluetooth',
      'Voice Assistant': 'Nova Assistant',
      'Ports': 'HDMI, USB 3.0',
      'Weight': '450g',
      'Power': '12W',
      'Dimensions': '120 x 120 x 35mm'
    },
    category: 'smart-home',
    brand: 'NovaTech'
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'smartphones', name: 'Smartphones' },
  { id: 'laptops', name: 'Laptops' },
  { id: 'audio', name: 'Audio' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'computers', name: 'Computers' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'tablets', name: 'Tablets' },
  { id: 'smart-home', name: 'Smart Home' },
];