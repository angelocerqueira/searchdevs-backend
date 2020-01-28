import express from 'express';
import DevController from './app/Controllers/DevController';
import SearchController from './app/Controllers/SearchController';

require('dotenv/config');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.create);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

export default routes;
