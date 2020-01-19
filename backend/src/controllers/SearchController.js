const User = require('../models/User');
const parseStringAsArray = require('../utils/parseStringAsArrays');

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const users = await User.find({
            techs: {
              $in: techsArray,  
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                },
            },
        });

        return response.json({ users })
    }
}