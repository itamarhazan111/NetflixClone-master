import express from "express";
import expressAsyncHandler from 'express-async-handler'
import { getContentById, getContentToBillboard, getContentToBillboardByType, getContents, getContentsByGenre, getContentsByMoviesName, getContentsBySeriesName, getMovies, getSeries } from "../controllers/contentController";
import { isAuth } from "../utils";

const contentRouter = express.Router();

contentRouter.get('/',isAuth, expressAsyncHandler(getContents));
contentRouter.get('/movies',isAuth, expressAsyncHandler(getMovies));
contentRouter.get('/series',isAuth, expressAsyncHandler(getSeries));
contentRouter.get('/getContentBillBoard/',isAuth,getContentToBillboard)
contentRouter.get('/:genre',isAuth,getContentsByGenre);
contentRouter.get('/getById/:id',isAuth, expressAsyncHandler(getContentById));
contentRouter.get('/movies/:name',isAuth,getContentsByMoviesName)
contentRouter.get('/series/:name',isAuth,getContentsBySeriesName)
contentRouter.get('/getContentBillBoard/:isSeries',isAuth,getContentToBillboardByType)

export default contentRouter;