const axios = require('axios');
const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArrays');

// index, show, store, update, destroy

module.exports = {

    async index(request, response){
        const users = await User.find();

        return response.json(users);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let user = User.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio = 'Normal bio' } = apiResponse.data;

            techArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            user = await User.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location,
            });
        }
        return response.json(user);
    }
};