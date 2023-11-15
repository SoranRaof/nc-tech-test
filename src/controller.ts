import { Request, Response } from "express";
import { cardsData, cardSizesData, templatesData, getCards } from "./model";
import { Card, Page, Template } from "./Card";

export const getAllCards = (req: Request, res: Response) => {
  const cards: Card[] = getCards();
  res.json(cards);
};
