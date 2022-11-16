import express from "express";
import cookieParser from "cookie-parser";
import logger from 'morgan';
import { ProductsRouter, UsersRouter } from './routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', UsersRouter);
app.use('/products', ProductsRouter);

export default app;
