import express, { Express, Request, Response, Router } from "express";
import { WebSocket } from 'ws';
import dotenv from "dotenv";
import cors from "cors";
import seedRouter from "./routes/seedRouter";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import contentRouter from "./routes/contentRouter";
import { consumeAllMessages, recommendedMovieAnalysis, sendKafkaMessage } from "./utils";

dotenv.config();



const app: Express = express();

app.use(cors({
  origin: 'https://netflix-clone-master-cxpc.vercel.app' // Replace with your frontend origin
}));
app.use(express.json());//parses JSONs
app.use(express.urlencoded({ extended: false }));//this is common practice for urlencoded


const wss = new WebSocket.Server({ port: 3001 }); // Replace with your desired port

wss.on('connection', (ws) => {
  console.log('Client connected');
  

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString()); // Now it's a string for JSON
    if(data.type=="watch"){
       sendKafkaMessage(data);
       consumeAllMessages();
    }
    
    ws.send('Hello from the server!');// Send a response message
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server listening on port 3001');

const PORT = process.env.PORT || 3000;

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

  recommendedMovieAnalysis();
  export default app


