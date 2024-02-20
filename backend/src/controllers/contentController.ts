import Content from "../models/Content";
import express, { Request, Response } from "express";
import ContentListByGenre from "../models/ContentListByGenre";

export const getContents = async (req: Request, res: Response) => {
    const contents = await Content.find();
    res.send(contents);
};
export const getMovies = async (req: Request, res: Response) => {
    const movies = await Content.find({ isSeries: false });
    res.send(movies);
};
export const getSeries = async (req: Request, res: Response) => {
    const series = await Content.find({ isSeries: true });
    res.send(series);
};
// export const getContentsByGenre = async (req: Request, res: Response) => {
//     const genre=req.params.genre;
//     const contentListId = await ContentListByGenre.find({genre});
//     const contentList=contentListId.map((content)=> await Content.find({content.id}))

//     res.send(contentList);
// };
export const getContentsByGenre = async (req: Request, res: Response) => {
    try {
        const genre = req.params.genre;

        // Use findOne to directly get the document, no need to await
        const contentListId = await ContentListByGenre.findOne({ genre }).populate('contentList');

        if (!contentListId) {
            return res.status(404).send("Genre not found");
        }

        // Now contentListId is already populated, no need for execPopulate

        // Extract the populated contentList array containing complete content documents
        const contentList = contentListId.contentList;

        res.send(contentList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};