import * as fs from "fs";
import * as path from "path";
import { Card, CardResponse, Template, sizesLookup } from "./Card";

const cardsData = JSON.parse(
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
    base_price: basePrice ? basePrice.base_price : 0,
    available_sizes: card.sizes.map(
      (x) => (x = { id: x, title: sizesLookup[x] })
    ),
    pages: pages.pages,
  };
  return singleCard;
};

const getCardById = (cardId: string) => {
  const card = cardsData.find((card: Card) => card.id === cardId);
  return card;
};

const getPagesByCardId = (cardId: string) => {
  const card = getCardById(cardId);
  return <Card>{
    pages: card.pages,
  };
};

const getCardBasePrice = (cardId: string) => {
  const card = getCardById(cardId);
  return <Card>{
    base_price: card.base_price,
  };
};

const templatesData = JSON.parse(
  fs.readFileSync(path.join("./src/data/templates.json"), "utf8")
);

const getFrontCoverImageTemplate = (templateId: string) => {
  const frontCoverImageTemplate = templatesData.find(
    (temp: Template) => temp.id === templateId
  );
  return frontCoverImageTemplate;
};
