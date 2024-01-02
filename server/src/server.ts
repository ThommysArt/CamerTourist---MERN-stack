// src/server.ts
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

import siteRoutes from './routes/siteRoutes'
import categoryRoutes from './routes/categoryRoutes'


import connectDB from './mongodb/connect';
dotenv.config();


const app: Application = express();

app.use(cors);
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to Dave Backend!")
})


app.use('api/v1/site/', siteRoutes)
app.use('api/v1/category/', categoryRoutes)

const startServer = async () => {

    try {
        const mongodbUrl = process.env.MONGODB_URL;
        if (mongodbUrl) {
          connectDB(mongodbUrl)
        }
        console.log("Connected to mongodb server...");
        app.listen(9080, () => console.log('Server has started on port http://localhost:9080'));
        console.log("REST api is Active...")
    } catch (error) {
        console.log(error);
    }
    
}

startServer();
