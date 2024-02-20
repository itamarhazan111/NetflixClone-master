import express from "express";
import expressAsyncHandler from 'express-async-handler'
import { getContents, getContentsByGenre, getMovies, getSeries } from "../controllers/contentController";
import { isAuth } from "../utils";

const contentRouter = express.Router();

contentRouter.get('/',isAuth, expressAsyncHandler(getContents));
contentRouter.get('/movies',isAuth, expressAsyncHandler(getMovies));
contentRouter.get('/series',isAuth, expressAsyncHandler(getSeries));
contentRouter.get('/:genre',isAuth,getContentsByGenre);

export default contentRouter;