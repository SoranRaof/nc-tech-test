import { Request, Response } from "express";
import { getAllCardsData, getCardDataById } from "./model";
import { Card, CardResponse } from "./Card";

export const getAllCards = (req: Request, res: Response) => {
  try {
    const cards: Card[] = getAllCardsData();
    res.json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSingleCardById = (req: Request, res: Response) => {
  try {
    const cardId = req.params.cardId;
    const regex = /^card\d{3}$/;
    if (!regex.test(cardId)) {
      res
        .status(400)
        .json({ error: "Invalid card ID format. Expect format eg: card001" });
      return;
    }
    const card: CardResponse = getCardDataById(cardId);
    if (!card) {
      res.status(404).json({ error: "Card not found" });
      return;
    }
    res.json(card);
  } catch (error) {
    console.error(error);
  }
};
