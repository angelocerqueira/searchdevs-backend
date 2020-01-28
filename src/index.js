import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { setupWebsocket } from './websocket';

require('dotenv/config');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);
