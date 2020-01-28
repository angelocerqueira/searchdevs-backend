import Dev from '../Models/Dev';
import stringAsArray from '../utils/stringAsArray';

class SearchController {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techArray = stringAsArray(techs);

    const search = await Dev.find({
      techs: {
        $in: techArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return res.json(search);
  }
}

export default new SearchController();
