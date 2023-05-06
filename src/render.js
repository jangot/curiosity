const fs = require('fs');
const _ = require('lodash');
const Axios = require('axios');

const html = fs.readFileSync('templates/index.html', { encoding:'utf8' });
const errorHtml = fs.readFileSync('templates/error.html', { encoding:'utf8' });

const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
async function load() {
    const params = {
        sol: _.random(1, 4000),
        api_key: process.env.NASA_KEY,
    };
    const { data } = await Axios.get(url, { params });
    const photos = data.photos || [];

    const item = _.random(0, photos.length - 1);
    const photo = photos[item];

    return {
        params,
        photo
    }
}

exports.page = async (event) => {
    try {
        if (event.path === '/error') {
            throw new Error('Test error')
        }

        let res = await load();
        while (!res.photo) {
            res = await load();
        }
        const { photo, params } = res;

        const { img_src, camera = {}, earth_date } = photo;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: _.template(html)({
                title: 'Random photo from Curiosity',
                cameraName: camera.full_name,
                imageSrc: img_src,
                date: earth_date,
                sol: params.sol,
                data: JSON.stringify({ item: photo, data: res.data }, null, 4)
            }),
        };
    } catch (error) {
        console.log('CUSTOM LOG', error);
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: _.template(errorHtml)({
                title: 'Random photo from Curiosity',
                sol: 0,
                message: error.message,
                data: {}
            }),
        };
    }

};
