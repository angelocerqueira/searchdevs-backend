const express = require('express');
const DevController = require('./app/Controllers/DevController');
const SearchController = require('./app/Controllers/SearchController');

const routes = express.Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.create);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

export default routes;
