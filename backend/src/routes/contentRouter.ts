import express from "express";
import expressAsyncHandler from 'express-async-handler'
import { getContents, getContentsByGenre, getContentsByMoviesName, getContentsBySeriesName, getMovies, getSeries } from "../controllers/contentController";
import { isAuth } from "../utils";

const contentRouter = express.Router();

contentRouter.get('/',isAuth, expressAsyncHandler(getContents));
contentRouter.get('/movies', expressAsyncHandler(getMovies));
contentRouter.get('/series',isAuth, expressAsyncHandler(getSeries));
contentRouter.get('/:genre',getContentsByGenre);
contentRouter.get('/movies/:name',getContentsByMoviesName)
contentRouter.get('/series/:name',isAuth,getContentsBySeriesName)

export default contentRouter;