import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from 'mongoose';
import sellerRouter from './apis/seller';
import customerRouter from './apis/customer';

const app = express();

app.use(cors());
app.use(json());
app.use("/seller", sellerRouter);
app.use("/customer", customerRouter);

connect(process.env.MONGO_URL as string);

app.listen(process.env.PORT, ()=>
{
    console.log(`Server running on port ${process.env.PORT}`);
});