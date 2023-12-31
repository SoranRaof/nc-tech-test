import * as express from "express";
import { getAllCards, getSingleCardById } from "../src/controller";

export const app = express();

app.set("json spaces", 2);

app.get("/cards", getAllCards);

app.get("/cards/:cardId", getSingleCardById);
