// Fictional demonstration inventory. Prices, addresses and availability are not real offers.
export const seedProperties = [
  {
    id: 'p1', slug: 'the-solstice-residence', name: 'The Solstice Residence',
    location: 'Palm Jumeirah', city: 'Dubai', country: 'UAE', price: 12800000,
    beds: 6, baths: 7, area: 9300, category: 'Villa', tag: 'Signature residence',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1500&q=85',
    gallery: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85'],
    description: 'A sculptural sanctuary where refined architecture meets effortless coastal living. Sweeping living spaces, softly illuminated interiors and a private infinity pool set the stage for a remarkable everyday.',
    features: ['Private infinity pool','Ocean-facing terrace','Private cinema','Wellness suite','Smart home'], featured: true, status: 'Available'
  },
  {
    id: 'p2', slug: 'casa-serena', name: 'Casa Serena',
    location: 'Golden Mile', city: 'Marbella', country: 'Spain', price: 8750000,
    beds: 5, baths: 6, area: 7100, category: 'Villa', tag: 'New collection',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1500&q=85',
    gallery: ['https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85','https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?w=1200&q=85'],
    description: 'Mediterranean light moves through open-plan interiors and earthy materials. A contemporary retreat conceived to make room for the moments that matter.',
    features: ['Landscape gardens','Heated pool','Chef’s kitchen','Panoramic terraces'], featured: true, status: 'Available'
  },
  {
    id: 'p3', slug: 'the-atelier-penthouse', name: 'The Atelier Penthouse',
    location: 'Downtown', city: 'Dubai', country: 'UAE', price: 5950000,
    beds: 4, baths: 5, area: 4650, category: 'Penthouse', tag: 'City collection',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1500&q=85',
    gallery: ['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85','https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=85'],
    description: 'A private observation point above the city, sculpted around natural materials, generous glazing and an extraordinary sense of calm.',
    features: ['Sky terrace','Private elevator','City panorama','Concierge'], featured: true, status: 'Available'
  },
  {
    id: 'p4', slug: 'villa-santorini', name: 'Villa Santorini',
    location: 'Oia', city: 'Santorini', country: 'Greece', price: 4600000,
    beds: 4, baths: 4, area: 3800, category: 'Villa', tag: 'Coastal collection',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1500&q=85',
    gallery: ['https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=85'],
    description: 'An intimate cliffside escape framing endless blue horizons and architecture shaped by the surrounding landscape.',
    features: ['Sunset deck','Private plunge pool','Outdoor lounge','Sea views'], featured: false, status: 'Available'
  },
  {
    id: 'p5', slug: 'the-olive-house', name: 'The Olive House',
    location: 'Ubud', city: 'Bali', country: 'Indonesia', price: 2850000,
    beds: 4, baths: 5, area: 5300, category: 'Villa', tag: 'Nature collection',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1500&q=85',
    gallery: ['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85'],
    description: 'Rooted in nature, this warm modern home brings garden courtyards and effortless indoor-outdoor living together.',
    features: ['Garden courtyard','Spa pavilion','Outdoor kitchen','Pool'], featured: false, status: 'Available'
  },
  {
    id: 'p6', slug: 'maison-lumiere', name: 'Maison Lumière',
    location: 'Cap Ferrat', city: 'Nice', country: 'France', price: 10250000,
    beds: 5, baths: 6, area: 8400, category: 'Villa', tag: 'Private collection',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1500&q=85',
    gallery: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85'],
    description: 'A luminous French Riviera residence with modernist details, generous entertaining spaces and tranquil outdoor gardens.',
    features: ['Wine cellar','Pool deck','Guest pavilion','Private gardens'], featured: false, status: 'Available'
  }
];
