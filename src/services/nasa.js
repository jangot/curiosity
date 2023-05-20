const Axios = require('axios');
const { format } = require('date-fns');
const { random } = require('lodash');

const ONE_DAY = 1000 * 60 * 60  * 24 * 2;
function randomDate() {
    const start = new Date('2012-08-07').getTime();
    const end = new Date().getTime() - ONE_DAY;

    return start + Math.random() * (end - start);
}


class NasaService {
    constructor(baseURL, apiKey) {
        this.key = apiKey;
        this.client = Axios.create({ baseURL });
    }

// 2012-08-07
    async loadPhotosForSol() {
        const params = {
            earth_date: format(randomDate(), 'yyyy-MM-dd'),
            api_key: this.key,
        };

        const { data, headers } = await this.client.get('/mars-photos/api/v1/rovers/curiosity/photos', { params });
        const photos = data.photos || [];
        const item = random(0, photos.length - 1);
        const photo = photos[item];
        return {
            params,
            photo
        }
    }
}
module.exports = { NasaService }