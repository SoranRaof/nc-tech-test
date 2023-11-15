import { Request, Response } from "express";
import { getAllCardsData, getCardDataById } from "./model";
import { Card, CardResponse } from "./Card";

export const getAllCards = (req: Request, res: Response) => {
  const cards: Card[] = getAllCardsData();
  res.json(cards);
};

export const getSingleCardById = (req: Request, res: Response) => {
  const cardId = req.params.cardId;
  const card: CardResponse = getCardDataById(cardId);
  res.json(card);
};
