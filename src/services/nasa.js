const Axios = require('axios');
const { random } = require('lodash');
module.exports = class Nasa {
    constructor(baseURL, apiKey) {
        this.key = apiKey;
        this.client = Axios.create({ baseURL });
    }

    async loadPhotosForSol() {
        const sol = _.random(1, 4000);
        const params = {
            sol: random(1, 4000),
            api_key: this.key,
        };

        const { data } = await this.client.get('/mars-photos/api/v1/rovers/curiosity/photos', { params });

        const photos = data.photos || [];
        const item = random(0, photos.length - 1);
        const photo = photos[item];

        return {
            params,
            photo
        }
    }
}