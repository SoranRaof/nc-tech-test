import * as request from "supertest";
import * as model from "../model";
import { app } from "../server";

// Happy paths
describe("GET /cards", () => {
  test("should return a 200 status and an array of cards matching the expected format and content", async () => {
    const response = await request(app).get("/cards");
    expect(response.body.length).toBe(3);
    expect(response.status).toBe(200);
    const expectedCards = [
      {
        title: "card 1 title",
        imageUrl: "/front-cover-portrait-1.jpg",
        card_id: "card001",
      },
      {
        title: "card 2 title",
        imageUrl: "/front-cover-portrait-2.jpg",
        card_id: "card002",
      },
      {
        title: "card 3 title",
        imageUrl: "/front-cover-landscape.jpg",
        card_id: "card003",
      },
    ];
    expectedCards.forEach((card, index) => {
      expect(response.body[index]).toEqual(card);
    });
  });
  test("should return an array of cards where each card is an object containing expected data types", async () => {
    const response = await request(app).get("/cards");
    expect(response.body).toBeInstanceOf(Object);
    response.body.forEach((card) => {
      expect(typeof card.title).toBe("string");
      expect(typeof card.imageUrl).toBe("string");
      expect(typeof card.card_id).toBe("string");
    });
  });
});

describe("GET /cards/:cardId", () => {
  test("should return a 200 status and a single card object with expected properties and values when a valid cardId is provided", async () => {
    const response = await request(app).get("/cards/card001");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      title: "card 1 title",
      imageUrl: "/front-cover-portrait-1.jpg",
      card_id: "card001",
      basePrice: 200,
      available_sizes: expect.arrayContaining([
        { id: "sm", title: "Small" },
        { id: "md", title: "Medium" },
        { id: "gt", title: "Giant" },
      ]),
      pages: expect.arrayContaining([
        { title: "Front Cover", templateId: "template001" },
        { title: "Inside Left", templateId: "template002" },
        { title: "Inside Right", templateId: "template003" },
        { title: "Back Cover", templateId: "template004" },
      ]),
    });
  });
  test("should return a single card object with properties of expected data types when a valid cardId is provided", async () => {
    const response = await request(app).get("/cards/card001");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(typeof response.body.title).toBe("string");
    expect(typeof response.body.imageUrl).toBe("string");
    expect(typeof response.body.card_id).toBe("string");
    expect(typeof response.body.basePrice).toBe("number");
    expect(response.body.available_sizes).toBeInstanceOf(Array);
    response.body.available_sizes.forEach((size) => {
      expect(typeof size.id).toBe("string");
      expect(typeof size.title).toBe("string");
    });
    expect(response.body.pages).toBeInstanceOf(Array);
    response.body.pages.forEach((page) => {
      expect(typeof page.title).toBe("string");
      expect(typeof page.templateId).toBe("string");
    });
  });
});

// Sad paths
describe("GET /cards", () => {
  test("should return a 500 status and an error message when there is an internal server error", async () => {
    const mockGetAllCardsData = jest.spyOn(model, "getAllCardsData");
    mockGetAllCardsData.mockImplementation(() => {
      throw new Error("Internal Server Error");
    });
    const response = await request(app).get("/cards");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

describe("GET /cards/:cardId", () => {
  test("should return a 400 status and error message when an invalid card ID format is provided", async () => {
    const response = await request(app).get("/cards/1nval1d");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid card ID format. Expect format eg: card001",
    });
  });
  test("should return a 404 status and an error message when a non-existent cardId is provided", async () => {
    const response = await request(app).get("/cards/card999");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Card not found" });
  });
});
