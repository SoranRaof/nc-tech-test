import * as fs from "fs";
import * as path from "path";
import { Card, Page, Template } from "./Card";

export const cardsData = JSON.parse(
  fs.readFileSync(path.join("./src/data/cards.json"), "utf8")
);

export const getCards = () => {
  const allCards = cardsData.map((card: Card) => {
    const frontCoverTemplateId = card.pages[0].templateId;
    const frontCoverImageTemplate =
      getFrontCoverImageTemplate(frontCoverTemplateId);
    return <Card>{
      title: card.title,
      imageUrl: frontCoverImageTemplate ? frontCoverImageTemplate.imageUrl : "",
      card_id: card.card_id,
    };
  });
  return allCards;
};

export const getCardById = (cardId: string) => {
  const card = cardsData.find((card: Card) => card.card_id === cardId);
  return card;
};

export const cardSizesData = JSON.parse(
  fs.readFileSync(path.join("./src/data/sizes.json"), "utf8")
);

export const templatesData = JSON.parse(
  fs.readFileSync(path.join("./src/data/templates.json"), "utf8")
);

const getFrontCoverImageTemplate = (templateId: string) => {
  const frontCoverImageTemplate = templatesData.find(
    (temp: Template) => temp.id === templateId
  );
  return frontCoverImageTemplate;
};
