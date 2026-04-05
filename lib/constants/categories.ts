export const CATEGORIES = {
  ESPACIOS_VIVOS: {
    id: 'espacios-vivos',
    name: 'Espacios Vivos',
    description: 'Pisos premium y revestimientos de piedra flexible',
    color: '#8b7355',
    subcategories: ['Suelux', 'PietraFlex'],
  },
  WELLBEING: {
    id: 'wellbeing',
    name: 'Wellbeing',
    description: 'Productos para bienestar y salud',
    color: '#6b8e7f',
    subcategories: ['Dr.Vek', 'Sankom'],
  },
} as const;

export const COLLECTIONS = {
  SUELUX: {
    handle: 'suelux',
    name: 'Suelux',
    tagline: 'Pisos premium SPC y laminados',
    category: 'ESPACIOS_VIVOS',
  },
  PIETRAFLEX: {
    handle: 'pietraflex',
    name: 'PietraFlex',
    tagline: 'Piedra flexible natural y translúcida',
    category: 'ESPACIOS_VIVOS',
  },
  DRVEK: {
    handle: 'dr-vek-ayurvedic',
    name: 'Dr.Vek Ayurvedic',
    tagline: 'Botellas de cobre ayurvédicas',
    category: 'WELLBEING',
  },
  SANKOM: {
    handle: 'sankom',
    name: 'Sankom',
    tagline: 'Ropa de compresión inteligente',
    category: 'WELLBEING',
  },
} as const;

export const PRODUCT_TYPES = {
  SPC: 'SPC Floor',
  LAMINADO: 'Laminate Floor',
  PIEDRA_OPACA: 'Natural Stone',
  PIEDRA_TRANSLUCIDA: 'Translucent Stone',
  BOTELLA_COBRE: 'Copper Bottle',
  PRENDA_COMPRESION: 'Compression Garment',
} as const;

export const NAVIGATION = [
  { name: 'Shop', href: '/shop' },
  { name: 'Projects', href: '/projects' },
  {
    name: 'B2B',
    href: '/b2b',
    submenu: [
      { name: 'Arquitectos', href: '/b2b/arquitectos' },
      { name: 'Constructoras', href: '/b2b/constructoras' },
      { name: 'Distribuidores Internacionales', href: '/b2b/distribuidores' },
      { name: 'Franquicias', href: '/b2b/franquicias' },
      { name: 'Propón tu Marca', href: '/b2b/propuesta' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;
