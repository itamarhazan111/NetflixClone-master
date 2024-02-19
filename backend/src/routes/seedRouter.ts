import express from "express";
import { getGenres, seedData } from "../controllers/seedData";




const seedRouter = express.Router();

seedRouter.get('/', seedData);
seedRouter.get('/genres', getGenres);

export default seedRouter;