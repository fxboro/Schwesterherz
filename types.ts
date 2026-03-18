import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
  isNew?: boolean;
}

export interface PriceItem {
  name: string;
  description?: string;
  details?: string[];
}

export interface PriceCategory {
  title: string;
  description?: string;
  items: PriceItem[];
  icon?: LucideIcon;
  disableExpand?: boolean;
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}