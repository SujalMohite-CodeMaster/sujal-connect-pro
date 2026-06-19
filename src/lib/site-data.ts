import {
  Circle,
  CircleDot,
  Disc3,
  Cog,
  Layers,
  Droplets,
  FlaskConical,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const COMPANY = {
  name: "Sujal Services & Solutions",
  shortName: "Sujal",
  tagline: "Precision Bearings & Industrial Supplies",
  since: 2013,
  phoneDisplay: "+91 93222 79696",
  phoneRaw: "+919322279696",
  whatsapp: "919322279696",
  email: "cp.sujal@gmail.com",
  rating: "5.0",
  address: {
    line1: "40/42, Nagdevi St, near Ram Mandir",
    line2: "Nakhuda Mohalla, Chippi Chawl, Masjid Bandar",
    city: "Mumbai, Maharashtra 400003",
    full: "40/42, Nagdevi St, near Ram Mandir, Nakhuda Mohalla, Chippi Chawl, Masjid Bandar, Mumbai, Maharashtra 400003",
  },
  hours: "Mon–Sat: 11:00 AM onwards · Sunday: Closed",
} as const;

export const yearsInBusiness = new Date().getFullYear() - COMPANY.since;

export function waLink(message?: string) {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
export const telLink = `tel:${COMPANY.phoneRaw}`;
export const mailLink = `mailto:${COMPANY.email}`;

export type ProductCategory = {
  slug: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  points: string[];
};

export const PRODUCTS: ProductCategory[] = [
  {
    slug: "ball-bearings",
    name: "Ball Bearings",
    icon: CircleDot,
    blurb: "Deep groove, angular contact and self-aligning ball bearings for high-speed, low-friction applications.",
    points: ["Deep groove", "Angular contact", "Self-aligning"],
  },
  {
    slug: "roller-bearings",
    name: "Roller Bearings",
    icon: Disc3,
    blurb: "Cylindrical, tapered and spherical roller bearings built to carry heavy radial and combined loads.",
    points: ["Cylindrical", "Tapered", "Spherical"],
  },
  {
    slug: "thrust-bearings",
    name: "Thrust Bearings",
    icon: Layers,
    blurb: "Ball and roller thrust bearings engineered to handle high axial loads with precision.",
    points: ["Ball thrust", "Roller thrust", "High axial load"],
  },
  {
    slug: "needle-bearings",
    name: "Needle Bearings",
    icon: Circle,
    blurb: "Compact, high load-capacity needle roller bearings ideal for tight radial spaces.",
    points: ["Drawn cup", "Needle cages", "Space-saving"],
  },
  {
    slug: "specialty-bearings",
    name: "Specialty Bearings",
    icon: Cog,
    blurb: "Custom and hard-to-source bearings sourced to your exact specification and application.",
    points: ["Custom sizes", "Imported brands", "Made to spec"],
  },
  {
    slug: "oil-seals",
    name: "Oil Seals",
    icon: Droplets,
    blurb: "Rotary shaft oil seals and gaskets to keep lubricants in and contaminants out.",
    points: ["Rotary seals", "Multiple sizes", "Quality rubber"],
  },
  {
    slug: "lubricants",
    name: "Lubricants & Grease",
    icon: FlaskConical,
    blurb: "Industrial-grade greases and lubricants matched to your bearings and operating conditions.",
    points: ["High-temp grease", "Industrial oils", "Anti-friction"],
  },
  {
    slug: "other-hardware",
    name: "Other Hardware",
    icon: Wrench,
    blurb: "Pulleys, couplings, fasteners and assorted industrial hardware to complete your order.",
    points: ["Couplings", "Fasteners", "Power transmission"],
  },
];

export const PRODUCT_OPTIONS = PRODUCTS.map((p) => p.name);
