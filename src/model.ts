import * as fs from "fs";
import * as path from "path";
import { Card, CardResponse, Template, sizesLookup } from "./Card";

export const cardsData = JSON.parse(
  fs.readFileSync(path.join("./src/data/cards.json"), "utf8")
);

export const getAllCardsData = () => {
  const allCards = cardsData.map((card: Card) => {
    const frontCoverTemplateId = card.pages[0].templateId;
    const frontCoverImageTemplate =
      getFrontCoverImageTemplate(frontCoverTemplateId);
    return <CardResponse>{
      title: card.title,
      imageUrl: frontCoverImageTemplate ? frontCoverImageTemplate.imageUrl : "",
      card_id: card.id,
    };
  });
  return allCards;
};

export const getCardDataById = (cardId: string) => {
  try {
    const card = getCardById(cardId);
    const frontCoverTemplateId = card.pages[0].templateId;
    const frontCoverImageTemplate =
      getFrontCoverImageTemplate(frontCoverTemplateId);
    const basePrice = getCardBasePrice(cardId);
    const pages = getPagesByCardId(cardId);
    const singleCard: CardResponse = {
      title: card.title,
      imageUrl: frontCoverImageTemplate ? frontCoverImageTemplate.imageUrl : "",
      card_id: card.id,
      basePrice: basePrice,
      available_sizes: card.sizes.map(
        (x) => (x = { id: x, title: sizesLookup[x] })
      ),
      pages: pages.pages,
    };
    return singleCard;
  } catch (err) {
    console.error(err);
  }
};

export const getCardById = (cardId: string) => {
  const card = cardsData.find((card: Card) => card.id === cardId);
  return card;
};

export const getPagesByCardId = (cardId: string) => {
  const card = getCardById(cardId);
  return <Card>{
    pages: card.pages,
  };
};

export const getCardBasePrice = (cardId: string): number => {
  const card = getCardById(cardId);
  return card.basePrice;
};

export const templatesData = JSON.parse(
  fs.readFileSync(path.join("./src/data/templates.json"), "utf8")
);

const getFrontCoverImageTemplate = (templateId: string) => {
  const frontCoverImageTemplate = templatesData.find(
    (temp: Template) => temp.id === templateId
  );
  return frontCoverImageTemplate;
};
