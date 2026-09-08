"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingCart, Menu, X, ChevronRight, Star, Shield, Clock, ArrowRight, 
  CheckCircle, ChevronDown, Facebook, Twitter, Instagram, Linkedin, Mail, 
  Phone, MapPin, Search, User, CreditCard, Truck, RotateCcw, Filter, 
  XCircle, Plus, Minus, Info, Anchor, Compass, Activity, Zap
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface WatchSpec {
  label: string;
  value: string;
}

interface Watch {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: 'Chronograph' | 'Dress' | 'Dive' | 'Automatic' | 'Sport' | 'Minimalist';
  description: string;
  longDescription: string;
  specs: string[];
  detailedSpecs: WatchSpec[];
  image: string;
  gallery: string[];
  tag?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  movementType: 'Automatic' | 'Quartz' | 'Mechanical' | 'Mecha-Quartz';
  caseMaterial: string;
  waterResistance: string;
}

interface CartItem extends Watch {
  quantity: number;
}

interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  verified: boolean;
}

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// --- DATA DICTIONARIES ---

const WATCH_CATALOG: Watch[] = [
  {
    id: 'hy-001',
    sku: 'HY-CHR-BLK-01',
    name: 'The Obsidian Chronograph',
    price: 499.00,
    category: 'Chronograph',
    description: 'A masterclass in precision engineering featuring a brushed matte black dial.',
    longDescription: 'The Obsidian Chronograph is designed for those who measure success in fractions of a second. The surgical-grade stainless steel casing houses a high-frequency movement. The sapphire crystal face is treated with multiple layers of anti-reflective coating, ensuring absolute clarity in direct sunlight. This timepiece merges tactical utility with boardroom aesthetics.',
    specs: ['42mm Case', 'Sapphire Crystal', '100m Water Resistance', 'Mecha-Quartz Movement'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '42mm' },
      { label: 'Case Thickness', value: '11.5mm' },
      { label: 'Lug to Lug', value: '48mm' },
      { label: 'Lug Width', value: '22mm' },
      { label: 'Crystal', value: 'Domed Sapphire' },
      { label: 'Lume', value: 'Swiss Super-LumiNova BGW9' }
    ],
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'Bestseller',
    inStock: true,
    rating: 4.9,
    reviewCount: 342,
    movementType: 'Mecha-Quartz',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '10 ATM'
  },
  {
    id: 'hy-002',
    sku: 'HY-DRS-SLV-02',
    name: 'Lunar Minimalist',
    price: 349.00,
    category: 'Dress',
    description: 'Stripped of all excess, presenting time in its purest form with a moon-phase dial.',
    longDescription: 'Elegance achieved through reduction. The Lunar Minimalist features an ultra-slim profile designed to slide effortlessly under a tailored cuff. The custom moon-phase complication tracks the lunar cycle with exceptional accuracy. Paired with a genuine Italian leather strap, it is the definitive dress watch for the modern professional.',
    specs: ['38mm Case', 'Mineral Glass', '30m Water Resistance', 'Quartz Movement'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '38mm' },
      { label: 'Case Thickness', value: '8mm' },
      { label: 'Lug to Lug', value: '44mm' },
      { label: 'Lug Width', value: '20mm' },
      { label: 'Crystal', value: 'Hardened Mineral' },
      { label: 'Strap', value: 'Full-Grain Leather' }
    ],
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'New Arrival',
    inStock: true,
    rating: 4.7,
    reviewCount: 128,
    movementType: 'Quartz',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '3 ATM'
  },
  {
    id: 'hy-003',
    sku: 'HY-DIV-BLU-03',
    name: 'Abyss Diver Professional',
    price: 699.00,
    category: 'Dive',
    description: 'Engineered for the depths with a unidirectional ceramic bezel and luminous markers.',
    longDescription: 'Built to withstand immense pressure. The Abyss Diver Professional is tested to 300 meters. It features a helium escape valve, a highly legible dial with oversized markers, and a 120-click ceramic bezel that will never fade or scratch. The heavy-duty steel bracelet includes a ratcheting clasp for micro-adjustments over a wetsuit.',
    specs: ['44mm Case', 'Sapphire Crystal', '300m Water Resistance', 'Automatic Movement'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '44mm' },
      { label: 'Case Thickness', value: '14.5mm' },
      { label: 'Lug to Lug', value: '52mm' },
      { label: 'Lug Width', value: '22mm' },
      { label: 'Bezel', value: 'Zirconia Ceramic' },
      { label: 'Clasp', value: 'Milled Deployment with Diver Extension' }
    ],
    image: 'https://images.unsplash.com/photo-1548169874-53ce86f43360?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1548169874-53ce86f43360?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'Professional Series',
    inStock: true,
    rating: 4.9,
    reviewCount: 215,
    movementType: 'Automatic',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '30 ATM'
  },
  {
    id: 'hy-004',
    sku: 'HY-AUT-SLD-04',
    name: 'Heritage Automata',
    price: 899.00,
    category: 'Automatic',
    description: 'An exhibition case back reveals the intricate mechanical heart of this classic tribute.',
    longDescription: 'The Heritage Automata celebrates traditional watchmaking. Powered by a highly regulated Swiss automatic caliber, the sweeping second hand moves flawlessly across the textured guilloché dial. The exhibition sapphire case back allows you to view the decorated rotor and balance wheel in action.',
    specs: ['40mm Case', 'Domed Sapphire', '50m Water Resistance', 'Swiss Automatic'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '40mm' },
      { label: 'Case Thickness', value: '12mm' },
      { label: 'Power Reserve', value: '41 Hours' },
      { label: 'Vibrations', value: '28,800 bph' },
      { label: 'Jewels', value: '26' },
      { label: 'Case Back', value: 'Sapphire Exhibition' }
    ],
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'Limited Edition',
    inStock: false,
    rating: 5.0,
    reviewCount: 89,
    movementType: 'Automatic',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '5 ATM'
  },
  {
    id: 'hy-005',
    sku: 'HY-SPT-CRB-05',
    name: 'Carbon Apex',
    price: 549.00,
    category: 'Sport',
    description: 'Forged from carbon fiber. Incredibly lightweight yet structurally superior to steel.',
    longDescription: 'Motorsport technology adapted for the wrist. The Carbon Apex utilizes forged carbon composite, resulting in a watch case that is incredibly light but highly durable. The unique marbled texture ensures no two watches are exactly alike. Fitted with a ventilated FKM rubber strap for high-intensity activity.',
    specs: ['43mm Case', 'Sapphire Crystal', '100m Water Resistance', 'Quartz Movement'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '43mm' },
      { label: 'Case Thickness', value: '13mm' },
      { label: 'Weight', value: '68 grams' },
      { label: 'Strap', value: 'FKM Vulcanized Rubber' },
      { label: 'Buckle', value: 'Titanium Tang' }
    ],
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'High Performance',
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    movementType: 'Quartz',
    caseMaterial: 'Forged Carbon Fiber',
    waterResistance: '10 ATM'
  },
  {
    id: 'hy-006',
    sku: 'HY-DRS-GLD-06',
    name: 'Rose Gold Executive',
    price: 599.00,
    category: 'Dress',
    description: 'Commanding attention with PVD rose gold plating, a sunburst dial, and Italian leather.',
    longDescription: 'The watch of the modern dealmaker. The Executive uses heavy PVD rose gold plating over a solid steel core, ensuring the color will never tarnish or fade. The deep blue sunburst dial creates a striking contrast, while applied indices catch the light at every angle.',
    specs: ['41mm Case', 'Sapphire Crystal', '50m Water Resistance', 'Automatic Movement'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '41mm' },
      { label: 'Case Thickness', value: '10.5mm' },
      { label: 'Plating', value: '3-Micron PVD Rose Gold' },
      { label: 'Dial', value: 'Sunburst Blue with Applied Indices' },
      { label: 'Strap', value: 'Alligator-Embossed Leather' }
    ],
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'Premium',
    inStock: true,
    rating: 4.8,
    reviewCount: 201,
    movementType: 'Automatic',
    caseMaterial: 'Rose Gold PVD Steel',
    waterResistance: '5 ATM'
  },
  {
    id: 'hy-007',
    sku: 'HY-CHR-SLV-07',
    name: 'Vanguard Chronograph',
    price: 479.00,
    category: 'Chronograph',
    description: 'A modern take on the classic racing chronograph with a panda dial configuration.',
    longDescription: 'Inspired by 1960s motorsport. The Vanguard Chronograph utilizes a high-contrast white and black "panda" dial for instant readability at high speeds. The tachymeter bezel allows for precise speed calculations, and the pump-style pushers provide a satisfying mechanical click.',
    specs: ['40mm Case', 'Sapphire Crystal', '100m Water Resistance', 'Mecha-Quartz'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '40mm' },
      { label: 'Case Thickness', value: '12mm' },
      { label: 'Bezel', value: 'Fixed Steel Tachymeter' },
      { label: 'Subdials', value: '60-minute, 24-hour, Running Seconds' }
    ],
    image: 'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?auto=format&fit=crop&q=80&w=1000'
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 112,
    movementType: 'Mecha-Quartz',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '10 ATM'
  },
  {
    id: 'hy-008',
    sku: 'HY-DIV-GRN-08',
    name: 'Triton Sea Hunter',
    price: 649.00,
    category: 'Dive',
    description: 'A rugged aquatic instrument featuring a striking emerald green dial and bezel.',
    longDescription: 'The Triton Sea Hunter stands out in a sea of black dials. The emerald green ceramic bezel matches the sunburst dial, shifting colors dynamically under water and light. Engineered with a double-domed sapphire crystal for distortion-free underwater viewing.',
    specs: ['42mm Case', 'Sapphire Crystal', '200m Water Resistance', 'Automatic'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '42mm' },
      { label: 'Case Thickness', value: '13.5mm' },
      { label: 'Crown', value: 'Screw-down with Crown Guards' },
      { label: 'Bracelet', value: 'Solid Link Oyster Style' }
    ],
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1000'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 88,
    movementType: 'Automatic',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '20 ATM'
  },
  {
    id: 'hy-009',
    sku: 'HY-MIN-WHT-09',
    name: 'Arctic Minimalist',
    price: 299.00,
    category: 'Minimalist',
    description: 'An exercise in restraint. Pure white dial, sterile bezel, and flawless execution.',
    longDescription: 'The Arctic Minimalist removes everything unnecessary. No date window, no numbers, no logo on the dial. Just three polished hands sweeping across an enamel-like white surface. Paired with a quick-release Milanese mesh bracelet for maximum versatility.',
    specs: ['39mm Case', 'Mineral Glass', '50m Water Resistance', 'Quartz'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '39mm' },
      { label: 'Case Thickness', value: '7.5mm' },
      { label: 'Dial', value: 'Gloss White Enamel Finish' },
      { label: 'Bracelet', value: 'Steel Milanese Mesh' }
    ],
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1000'
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 304,
    movementType: 'Quartz',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '5 ATM'
  },
  {
    id: 'hy-010',
    sku: 'HY-FLD-KHK-10',
    name: 'Recon Field Watch',
    price: 399.00,
    category: 'Sport',
    description: 'A modern tactical field watch built for extreme durability and legibility.',
    longDescription: 'The Recon Field Watch is a modern interpretation of standard-issue military hardware. The bead-blasted steel case eliminates reflections, while the high-contrast numerals are filled with massive amounts of luminous material for night operations. Secured by a heavy-duty NATO strap.',
    specs: ['38mm Case', 'Sapphire Crystal', '100m Water Resistance', 'Automatic'],
    detailedSpecs: [
      { label: 'Case Diameter', value: '38mm' },
      { label: 'Case Thickness', value: '11mm' },
      { label: 'Finish', value: 'Matte Bead-Blasted' },
      { label: 'Strap', value: 'Ballistic Nylon NATO' }
    ],
    image: 'https://images.unsplash.com/photo-1549971911-37013fcb1016?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1549971911-37013fcb1016?auto=format&fit=crop&q=80&w=1000'
    ],
    tag: 'Tactical',
    inStock: true,
    rating: 4.8,
    reviewCount: 412,
    movementType: 'Automatic',
    caseMaterial: '316L Stainless Steel',
    waterResistance: '10 ATM'
  }
];

const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    name: 'Alexander M.',
    role: 'Horology Enthusiast',
    content: 'The build quality on the Obsidian Chronograph rivals pieces I own that cost ten times as much. The finishing on the case is flawless, and the movement is highly responsive.',
    rating: 5,
    date: '2026-08-15',
    verified: true
  },
  {
    id: 'rev-02',
    name: 'James C.',
    role: 'Verified Buyer',
    content: 'Incredible value. The sweeping second hand on the automatic movement is buttery smooth. Shipping was faster than expected, and the packaging is premium.',
    rating: 5,
    date: '2026-08-22',
    verified: true
  },
  {
    id: 'rev-03',
    name: 'William T.',
    role: 'Verified Buyer',
    content: 'I have worn the Abyss Diver every day for six months. It has taken a beating on job sites and underwater, and it still looks completely brand new.',
    rating: 5,
    date: '2026-07-30',
    verified: true
  },
  {
    id: 'rev-04',
    name: 'Marcus H.',
    role: 'Verified Buyer',
    content: 'The Lunar Minimalist is exactly what I needed for office wear. Slim enough to fit under my cuffs, and the moon-phase is a great conversation starter.',
    rating: 4,
    date: '2026-09-02',
    verified: true
  },
  {
    id: 'rev-05',
    name: 'David R.',
    role: 'Watch Collector',
    content: 'For the price bracket, the Heritage Automata is an absolute steal. The movement regulation out of the box was running at +3 seconds a day. Very impressive.',
    rating: 5,
    date: '2026-08-05',
    verified: true
  }
];

const FAQS: FAQ[] = [
  {
    id: 'faq-01',
    category: 'Warranty & Returns',
    question: 'What is the warranty policy?',
    answer: 'All HY Watches come with a comprehensive 24-month international warranty covering any manufacturing or mechanical defects. This does not cover normal wear and tear, strap degradation, or water damage caused by failing to secure the crown.'
  },
  {
    id: 'faq-02',
    category: 'Maintenance',
    question: 'How do I care for my mechanical watch?',
    answer: 'We recommend avoiding extreme magnetic fields and strong impacts. For water-resistant models, ensure the crown is fully screwed down before exposure to water. Service your mechanical timepiece every 4 to 5 years through an authorized watchmaker.'
  },
  {
    id: 'faq-03',
    category: 'Shipping',
    question: 'Do you offer international shipping?',
    answer: 'Yes. We ship globally via DHL Express. All shipments are fully insured and tracked. Delivery times vary by region but typically arrive within 3 to 5 business days.'
  },
  {
    id: 'faq-04',
    category: 'Warranty & Returns',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return window for unworn items in their original packaging. The protective stickers must remain intact. Return shipping is free for domestic orders.'
  },
  {
    id: 'faq-05',
    category: 'Product Details',
    question: 'What does "Mecha-Quartz" mean?',
    answer: 'Mecha-Quartz is a hybrid movement. It uses a battery-powered quartz crystal for primary timekeeping, ensuring high accuracy, but incorporates a mechanical module for the chronograph features, giving the stopwatch hand a smooth mechanical sweep and an instant snap-back reset.'
  },
  {
    id: 'faq-06',
    category: 'Product Details',
    question: 'Are your watches luminous in the dark?',
    answer: 'Yes. We use industry-leading Swiss Super-LumiNova on all sport, dive, and chronograph models. Dress and minimalist models may feature minimal or no luminous material to maintain their clean aesthetic.'
  },
  {
    id: 'faq-07',
    category: 'Shipping',
    question: 'Will I have to pay customs duties?',
    answer: 'International customers are responsible for any import duties, taxes, and customs clearance fees required by their local government. These are not included in the checkout price.'
  },
  {
    id: 'faq-08',
    category: 'Maintenance',
    question: 'Can I swim with my watch?',
    answer: 'You may swim with any watch rated at 10 ATM (100m) or higher, provided the crown is secured. Do not operate chronograph pushers underwater. Watches rated 3 ATM or 5 ATM are splash-resistant only and should not be submerged.'
  }
];

const NAVIGATION = [
  { label: 'Collections', href: '#collections' },
  { label: 'Technology', href: '#technology' },
  { label: 'Heritage', href: '#heritage' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Support', href: '#faq' }
];

const FEATURES = [
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: 'Sapphire Crystal',
    description: 'Synthetic sapphire glass ranking 9 on the Mohs scale, offering extreme scratch resistance.'
  },
  {
    icon: <Clock className="w-8 h-8 text-white" />,
    title: 'Calibrated Movements',
    description: 'Every caliber is tested and regulated in-house prior to final assembly and casing.'
  },
  {
    icon: <Anchor className="w-8 h-8 text-white" />,
    title: 'Marine Grade Steel',
    description: 'Forged from 316L stainless steel for maximum corrosion resistance in saline environments.'
  },
  {
    icon: <Zap className="w-8 h-8 text-white" />,
    title: 'Luminous Markers',
    description: 'Multi-layered Swiss Super-LumiNova application ensures extreme low-light legibility.'
  }
];

// --- COMPONENTS ---

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-gray-950 border border-gray-800 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-gray-900 rounded-full p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-gray-950 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-900">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white">Your Cart</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingCart className="w-12 h-12 text-gray-700" />
              <p className="text-gray-400 font-light">Your cart is currently empty.</p>
              <button onClick={onClose} className="text-white uppercase tracking-widest text-sm font-bold underline hover:text-gray-300 transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4">
                <div className="w-24 h-24 bg-gray-900 flex-shrink-0 border border-gray-800">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">{item.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.sku}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-700">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="px-2 text-xs font-bold text-white w-8 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-sm font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="text-gray-600 hover:text-red-500 transition-colors self-start p-1">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-900 bg-gray-950">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
              <span>Subtotal</span>
              <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-6 text-sm text-gray-400">
              <span>Shipping</span>
              <span className="text-white">Calculated at checkout</span>
            </div>
            <button className="w-full bg-white text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const Navbar = ({ cartItemCount, onOpenCart }: { cartItemCount: number; onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-4 border-b border-gray-800' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tighter text-white uppercase hover:text-gray-300 transition-colors">HY Watches</a>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {NAVIGATION.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors uppercase tracking-widest">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors relative" onClick={onOpenCart}>
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-black">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition-colors relative" onClick={onOpenCart}>
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-black">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-1">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-950 border-b border-gray-800 shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {NAVIGATION.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="block px-3 py-4 text-sm font-bold text-gray-300 hover:text-white hover:bg-gray-900 border-b border-gray-900 uppercase tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center space-x-6 px-3 py-4 mt-4">
              <button className="flex items-center text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest">
                <User className="w-4 h-4 mr-2" /> Account
              </button>
              <button className="flex items-center text-gray-400 hover:text-white text-sm font-bold uppercase tracking-widest">
                <Search className="w-4 h-4 mr-2" /> Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490222060934-1185f381fcf7?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Watch Background" 
          className="w-full h-full object-cover opacity-40 scale-105 transform origin-center animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto mt-20">
        <div className="inline-block mb-6 px-3 py-1 border border-white/20 bg-black/50 backdrop-blur-md">
          <p className="text-xs font-bold text-white uppercase tracking-[0.3em]">Built For The Bold</p>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
          Precision <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-300 to-white">Without Compromise</span>
        </h1>
        <p className="mt-8 text-base md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Architecting the future of horology. HY Watches delivers unparalleled craftsmanship, uncompromising materials, and timeless design directly to your wrist.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#collections" className="w-full sm:w-auto bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors inline-flex items-center justify-center group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Explore Collection
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#heritage" className="w-full sm:w-auto border border-white/30 bg-black/30 backdrop-blur-sm text-white px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors inline-flex items-center justify-center">
            Our Heritage
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Scroll</span>
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </div>
    </div>
  );
};

const TechnologySection = () => {
  return (
    <section className="py-24 bg-gray-950 border-b border-gray-900" id="technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">Engineering Standards</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Purpose-Built Specifications</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 text-center">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-500">
                <div className="transform group-hover:scale-110 group-hover:text-black transition-all duration-500 text-white">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: 'w-8 h-8 group-hover:text-black transition-colors' })}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wider">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCatalog = ({ onAddToCart }: { onAddToCart: (item: Watch) => void }) => {
  const [filter, setFilter] = useState('All');
  const [selectedWatch, setSelectedWatch] = useState<Watch | null>(null);

  const categories = ['All', 'Chronograph', 'Dive', 'Dress', 'Sport', 'Automatic', 'Minimalist'];

  const filteredWatches = useMemo(() => {
    if (filter === 'All') return WATCH_CATALOG;
    return WATCH_CATALOG.filter(w => w.category === filter);
  }, [filter]);

  return (
    <section className="py-32 bg-black" id="collections">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">The Collection</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Masterpieces in Motion</h3>
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            <Filter className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors border ${
                  filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-500 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredWatches.map((watch) => (
            <div key={watch.id} className="group bg-gray-950 border border-gray-900 hover:border-gray-700 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
              {watch.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg">
                    {watch.tag}
                  </span>
                </div>
              )}
              {!watch.inStock && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg">
                    Sold Out
                  </span>
                </div>
              )}
              <div 
                className="aspect-[4/5] overflow-hidden bg-gray-900 relative cursor-pointer"
                onClick={() => setSelectedWatch(watch)}
              >
                <img 
                  src={watch.image} 
                  alt={watch.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-black/80 text-white backdrop-blur-md px-6 py-3 text-xs uppercase tracking-widest font-bold border border-gray-700">Quick View</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <div className="pr-2">
                    <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">{watch.category}</p>
                    <h4 className="text-lg font-bold text-white leading-tight">{watch.name}</h4>
                  </div>
                  <span className="text-base font-semibold text-white whitespace-nowrap">${watch.price.toFixed(2)}</span>
                </div>
                
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-6 flex-grow line-clamp-2">
                  {watch.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  {watch.specs.slice(0, 3).map((spec, index) => (
                    <div key={index} className="flex items-center text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                      <div className="w-1 h-1 bg-gray-600 rounded-full mr-2"></div>
                      {spec}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onAddToCart(watch)}
                  disabled={!watch.inStock}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center border ${
                    watch.inStock 
                      ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' 
                      : 'bg-gray-900 text-gray-600 border-gray-800 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {watch.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedWatch} onClose={() => setSelectedWatch(null)}>
        {selectedWatch && (
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 bg-gray-900 min-h-[300px]">
              <img src={selectedWatch.image} alt={selectedWatch.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">{selectedWatch.category}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-white fill-current" />
                    <span className="text-xs font-bold text-white">{selectedWatch.rating}</span>
                    <span className="text-xs text-gray-500">({selectedWatch.reviewCount})</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{selectedWatch.name}</h2>
                <p className="text-xs text-gray-600 font-mono mb-6">SKU: {selectedWatch.sku}</p>
                <p className="text-2xl font-semibold text-white mb-8">${selectedWatch.price.toFixed(2)}</p>
                
                <div className="mb-8">
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{selectedWatch.longDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-b border-gray-800 py-6">
                  {selectedWatch.detailedSpecs.map((spec, idx) => (
                    <div key={idx}>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">{spec.label}</p>
                      <p className="text-sm text-gray-300 font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    onAddToCart(selectedWatch);
                    setSelectedWatch(null);
                  }}
                  disabled={!selectedWatch.inStock}
                  className={`w-full py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${
                    selectedWatch.inStock 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {selectedWatch.inStock ? 'Add to Cart - ' + '$' + selectedWatch.price.toFixed(2) : 'Out of Stock'}
                </button>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 font-bold uppercase tracking-widest">
                  <div className="flex items-center"><Shield className="w-3 h-3 mr-1" /> 2 Yr Warranty</div>
                  <div className="flex items-center"><Truck className="w-3 h-3 mr-1" /> Free Shipping</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

const HeritageSection = () => {
  return (
    <section className="bg-black" id="heritage">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-[500px] lg:h-[800px] relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1635832798934-297eb0d39e08?auto=format&fit=crop&q=80&w=2000" 
            alt="Watchmaking process" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 transform hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent lg:hidden"></div>
        </div>
        <div className="flex flex-col justify-center px-6 py-20 lg:p-24 bg-gray-950 border-l border-gray-900">
          <div className="max-w-xl">
            <Activity className="w-10 h-10 text-gray-600 mb-8" />
            <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">Our Heritage</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Redefining the Standard.</h3>
            
            <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed mb-12">
              <p>
                HY Watches was founded on a singular premise: industrial-grade durability combined with executive aesthetics. We bypass traditional retail markups and outdated distribution models to provide uncompromising hardware directly to the consumer.
              </p>
              <p>
                Every timepiece is assembled with surgical precision, tested under extreme pressure, and regulated to ensure accuracy that rivals heritage brands. We do not build disposable fashion accessories. We build tools intended to outlast their owners.
              </p>
              <p>
                By sourcing materials directly from the same manufacturers used by legacy Swiss houses, we deliver identical material quality without the arbitrary prestige premium.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-gray-800 pt-10">
              <div>
                <p className="text-4xl font-black text-white mb-2">300+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Components Per Watch</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white mb-2">100%</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">In-House Regulation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-32 bg-black border-y border-gray-900 relative overflow-hidden" id="reviews">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">Client Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Engineered for Operators</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-gray-950 p-10 border border-gray-800 hover:border-gray-600 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 text-base font-light italic mb-8 leading-relaxed">
                  "{review.content}"
                </p>
              </div>
              <div className="border-t border-gray-900 pt-6 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold uppercase tracking-wider text-sm">{review.name}</p>
                  <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-1">{review.role}</p>
                </div>
                {review.verified && (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-gray-950" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">Support & Logistics</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={faq.id} className="border border-gray-800 bg-black transition-colors hover:border-gray-700">
              <button
                className="w-full text-left px-6 py-6 flex justify-between items-center focus:outline-none group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center pr-4">
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-widest w-24 hidden sm:block">{faq.category}</span>
                  <span className="text-white font-medium text-base sm:text-lg group-hover:text-gray-300 transition-colors">{faq.question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-white' : ''}`} />
              </button>
              <div 
                className={`px-6 sm:pl-36 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-400 leading-relaxed font-light text-sm sm:text-base border-l border-gray-800 pl-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-black border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Mail className="w-10 h-10 text-white mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight uppercase">Join The Registry</h2>
        <p className="text-gray-400 mb-8 font-light text-lg">Subscribe for priority access to limited production runs, prototype testing, and private acquisition events.</p>
        <form className="flex flex-col sm:flex-row max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            required
            className="flex-grow bg-gray-900 border border-gray-800 text-white px-6 py-4 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-white transition-colors mb-4 sm:mb-0 sm:mr-2"
          />
          <button 
            type="submit" 
            className="bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-950 pt-24 pb-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="col-span-1 lg:col-span-2 pr-0 lg:pr-12">
            <span className="text-3xl font-black tracking-tighter text-white uppercase mb-6 block leading-none">HY Watches</span>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light max-w-sm">
              Industrial grade timepieces built for maximum performance. Designed in Boronia, Victoria, Australia. Engineered for the world.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-white transition-colors p-2 bg-gray-900 rounded-full border border-gray-800 hover:border-gray-600"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="text-gray-600 hover:text-white transition-colors p-2 bg-gray-900 rounded-full border border-gray-800 hover:border-gray-600"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-gray-600 hover:text-white transition-colors p-2 bg-gray-900 rounded-full border border-gray-800 hover:border-gray-600"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="text-gray-600 hover:text-white transition-colors p-2 bg-gray-900 rounded-full border border-gray-800 hover:border-gray-600"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6 border-b border-gray-900 pb-3">Collections</h4>
            <ul className="space-y-4 text-xs font-bold tracking-wider uppercase text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">All Watches</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Automatic Series</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chronograph Series</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dive Series</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories & Straps</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6 border-b border-gray-900 pb-3">Client Services</h4>
            <ul className="space-y-4 text-xs font-bold tracking-wider uppercase text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Registration</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Watch Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6 border-b border-gray-900 pb-3">Headquarters</h4>
            <ul className="space-y-4 text-xs font-bold tracking-wider uppercase text-gray-500">
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-3 mt-0.5 text-gray-600" />
                <a href="mailto:support@hywatches.com" className="hover:text-white transition-colors">support@hywatches.com</a>
              </li>
              <li className="flex items-start">
                <Phone className="w-4 h-4 mr-3 mt-0.5 text-gray-600" />
                <span>+61 3 9000 0000</span>
              </li>
              <li className="flex items-start text-gray-500">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-600" />
                <span>Boronia, VIC<br/>Australia</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest text-center md:text-left mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} HY Watches. All Rights Reserved. A Division of HY Systems Co.
          </p>
          <div className="flex space-x-6 text-gray-600 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          <CreditCard className="w-8 h-8 text-white" />
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-[10px] rounded">VISA</div>
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-[10px] rounded">MC</div>
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-[10px] rounded">AMEX</div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APPLICATION COMPONENT ---

export default function HYWatchesStorefront() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (watch: Watch) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === watch.id);
      if (existing) {
        return prev.map(item => 
          item.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...watch, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans antialiased scroll-smooth">
      <Navbar 
        cartItemCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      <main>
        <Hero />
        <TechnologySection />
        <ProductCatalog onAddToCart={handleAddToCart} />
        <HeritageSection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}