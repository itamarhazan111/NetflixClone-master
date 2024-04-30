import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import { Request, Response, NextFunction } from 'express';
import { IUser, User } from './models/User';
import UserRequest from './UserRequest';
import { ConsumerSubscribeTopics, EachMessagePayload, Kafka } from 'kafkajs';
import LogEntryModel from './models/LogEntryModel';
import { title } from 'process';
import Content from './models/Content';
import axios from 'axios';
import mongoose from 'mongoose';
import openai, { OpenAI } from 'openai';






export const generateToken = (user:IUser) => {
    if (!process.env.JWT_PW) {
        throw new Error('MONGO_CONNECTION is not defined');
    }
    return jwt.sign({ _id: user._id, username: user.username, email: user.email, isAdmin:user.isAdmin, profilePicture:user.profilePicture }, process.env.JWT_PW, { expiresIn: '7d' })
}
export const sendMail = async (options: any) => {
    dotenv.config();
    if (process.env.EmailUserName && process.env.EmailPassword) {
        const user = process.env.EmailUserName.toString();
        const pass = process.env.EmailPassword.toString();
        const transport = nodemailer.createTransport({
            service: 'Gmail',
            secure: false,
            auth: {
                user: user,
                pass: pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const mail = {
            from: user,
            to: options.email,
            subject: options.subject,
            text: options.message
        }
        await new Promise((resolve, reject) => {
            transport.sendMail(mail, (error, info) => {
                if (error) {
                    console.log(error.message)
                    reject(error)
                } else {
                    console.log("success")
                }
                resolve(info)
            })
    })
    }
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (auth) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            jwt.verify(token, process.env.JWT_PW as string, (err:any, decode:any) => {
                if (err) {
                    res.status(401).send({ message: err.message });
                } else {
                    // Assuming decode has the type you expect it to have
                    (req as UserRequest).user=decode;
                    next();
                }
            });
        }
    } else {
        res.status(401).send({ message: "No token" });
    }
}
  
export const isAdmin = (req:Request, res: Response, next: NextFunction) => {
    const user=(req as UserRequest).user
    if (!user || !user.isAdmin) {
      return res.status(401).send({ message: 'Unauthorized: Not an administrator' });
    }
    next();
  };

export const sendKafkaMessage=async(message: any)=>{
    const kafka = new Kafka({
        clientId:"my-producer",
        brokers: ['localhost:9092'],
      })
          
      const producer = kafka.producer()
      await producer.connect()
      
      // Producing  
        try {

            await producer.send({
            topic: 'test',
            messages: [
                {
                value: JSON.stringify(message),
                },
            ],
            });
            console.log("start produce")

        } catch (error) {
            console.error('Error sending message:', error);
            // Handle connection errors gracefully (e.g., retry logic, reconnect)
        } finally {
            await producer.disconnect();
        }    
  }

  export const consumeAllMessages = async()=> {
    console.log("consume")
    const kafka = new Kafka({
        clientId:"my-consumer",
        brokers: ['localhost:9092'],
      })
    const consumer = kafka.consumer({ groupId: "group-id"}); // Specify your consumer group ID

    await consumer.connect();
    await consumer.subscribe({ topic: 'test'});
    consumer.run({
        eachMessage: async ({ message }) => {
          console.log("sssssssssss")  
          const value = message.value?.toString(); // Access value only if it exists
          if (value) {
            const data = JSON.parse(value);
            const newLogEntry = new LogEntryModel(
                {
                    data:{
                        _id:data.data._id,
                        title:data.data.title,
                        genre:data.data.genre
                    },
                    user:data.user,
                    type:data.type
                }
            );
            await newLogEntry.save()
            console.log(data);
          } else {
            console.warn('Received message with null value'); // Handle null value
          }
        },
      });


    // Gracefully disconnect the consumer when done
    await consumer.disconnect();
};
export const recommendedMovieAnalysis=async()=>{
    const logs=await LogEntryModel.find();
    const users=await User.find();
    const content=(await Content.find()).map(item => item.id.toString()+" "+item.title.toString()+" "+item.genre.toString());
    

    users.forEach(async user => {
        const userLogs = logs.filter(log => log.user === user.email);
        const last50UserLogs = userLogs.slice(-50).map(item => item.toString());
        const analysisResult = await analyzeContentAndUserLogs(content, last50UserLogs);
        user.myRecommendations=analysisResult.map(stringId => {
              return new mongoose.Types.ObjectId(stringId);
            });
            user.save();
        })
    setInterval(recommendedMovieAnalysis, 7 * 24 * 60 * 60 * 1000);
}  


async function analyzeContentAndUserLogs(content: string[], last50UserLogs: string[]) {
    // Create the text to send
    const textToSend = `
      **content:**
      ${content.join('\n')}
  
      **User viewing data**
      ${last50UserLogs.map(log => log.toString()).join('\n')}

      ${"Choose 10 content.id diffrent from what we saw from the content that will best suit the user according to his viewing data"}
    `;
    
    const openai = new OpenAI({
        apiKey:process.env.OPEN_AI_KEY
    });

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content:textToSend }],
        model: "gpt-3.5-turbo",
      });
    
      return extractContentIDs(completion.choices[0].message.content?.toString());
  }
  function extractContentIDs(data: string|undefined) {
    const contentIDs = [];
    const regex = /([0-9a-fA-F]{24})/g;
    let match;
    if(data!=undefined)
    while ((match = regex.exec(data)) !== null) {
        contentIDs.push(match[0]);
    }

    return contentIDs;
}

