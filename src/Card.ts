export interface Card {
  title: string;
  imageUrl: string;
  id: string;
  pages?: Page[];
  base_price?: number;
  sizes?: any[];
}

export interface CardResponse {
  title: string;
  imageUrl: string;
  card_id: string;
  pages?: Page[];
  base_price?: number;
  available_sizes?: any[];
}

export const sizesLookup = {
  sm: "Small",
  md: "Medium",
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
