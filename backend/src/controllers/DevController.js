const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const devExistenceChecker = require('../utils/devExistenceChecker');

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }

        return res.json(dev);
    },

    async update(req, res) {
        const { github_username } = req.query;
        const { name, techs } = req.body;

        let dev = await Dev.findOne({ github_username });

        devExistenceChecker(dev);

        dev.name = name;
        dev.techs = techs;
        await dev.save();

        return res.json(dev)
    },

    async destroy(req, res) {
        const { github_username } = req.query;

        let dev = await Dev.findOneAndDelete({ github_username });

        devExistenceChecker(dev, res);

        return res.status(204).end();
    }
};