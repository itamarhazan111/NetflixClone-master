import express from "express";
import { getGenresToClient, seedData } from "../controllers/seedData";




const seedRouter = express.Router();

seedRouter.get('/', seedData);
seedRouter.get('/genres', getGenresToClient);

export default seedRouter;