export interface Card {
  title: string;
  imageUrl: string;
  id: string;
  pages?: Page[];
  basePrice?: number;
  sizes?: any[];
}

export interface CardResponse {
  title: string;
  imageUrl: string;
  card_id: string;
  pages?: Page[];
  basePrice?: number;
  available_sizes?: any[];
}

export const sizesLookup = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
  gt: "Giant",
};

export interface Page {
  title: string;
  templateId: string;
}

export interface Template {
  id: string;
  width: number;
  height: number;
  imageUrl: string;
}
