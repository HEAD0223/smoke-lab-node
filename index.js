import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';

import {
	ManufacturerController,
	OrderController,
	PromoController,
	StockController,
	UsersController,
} from './controllers/index.js';

dotenv.config();

mongoose
	.connect(process.env.DB_LINK)
	.then(() => console.log('DB - Ok'))
	.catch((err) => console.log(`DB - Error -> ${err}`));

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.get('/stock', StockController.getAll);
app.get('/manufacturer', ManufacturerController.getAll);
app.get('/promo', PromoController.getAll);
app.post('/points', UsersController.getPoints);
app.post('/send-data', OrderController.save);

const sslOptions = {
	key: fs.readFileSync('./certificates/privkey.pem'),
	cert: fs.readFileSync('./certificates/fullchain.pem'),
};

const server = https.createServer(sslOptions, app);

server.listen(443, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log(`Server running on port 443 (HTTPS)`);
});

// app.listen(8080, (err) => {
// 	if (err) {
// 		return console.log(err);
// 	}
// 	console.log(`Server running on port 8080`);
// });
