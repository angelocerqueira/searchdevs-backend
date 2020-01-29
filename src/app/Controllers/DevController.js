import axios from 'axios';
import Dev from '../Models/Dev';
import stringAsArray from '../utils/stringAsArray';
import { findConnections, sendMessage } from '../../websocket';

class DevController {
  async index(req, res) {
    const dev = await Dev.find();
    return res.json(dev);
  }

  async create(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev === null) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio, html_url } = response.data;

      const techArray = stringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        html_url,
        techs: techArray,
        location,
      });

      // filtrar as conexões que estão ha no maximo 10km de distancia
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas
      const sendSocketMessageto = findConnections(
        { latitude, longitude },
        techArray
      );
      sendMessage(sendSocketMessageto, 'new-dev', dev);

      return res.json(dev);
    }
    return res.json(dev);
  }

  async update(req, res) {
    const { id } = req.params;

    const { name, bio, techs, latitude, longitude } = req.body;
    const techArray = stringAsArray(techs);
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    await Dev.findOne({ _id: id });

    await Dev.update({
      name,
      bio,
      techs: techArray,
      location,
    });

    return res.json({ msg: 'updated' });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const dev = await Dev.findOne({ _id: id });

    await Dev.deleteOne(dev);
    return res.json({ msg: 'deleted' });
  }
}

export default new DevController();
