import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import cors from "cors";
import seedRouter from "./routes/seedRouter";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import contentRouter from "./routes/contentRouter";

dotenv.config();



const app: Express = express();

app.use(cors());//dose nothing at the moment
app.use(express.json());//parses JSONs
app.use(express.urlencoded({ extended: false }));//this is common practice for urlencoded

const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  next();
});
//routes
app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/content", contentRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("my server");
});
const mongoConnect: string | undefined = process.env.MONGO_CONNECTION;
if (!mongoConnect) {
  throw new Error('MONGO_CONNECTION is not defined');
}
mongoose.connect(mongoConnect)
  .then(() => {
    app.listen(PORT, function () {
      console.log("listening to port " + PORT)
    })
  }).catch(err => console.log(err.message));

  export default app