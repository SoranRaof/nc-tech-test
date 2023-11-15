export interface Card {
  title: string;
  imageUrl: string;
  card_id: string;
  pages: Page[];
}

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
