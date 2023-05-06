const { render } = require('./services/template');
const Nasa = require('./services/nasa');

const nasaService = new Nasa(process.env.NASA_HOST, process.env.NASA_KEY);

exports.page = async (event) => {
    try {
        let res = await nasaService.loadPhotosForSol();
        while (!res.photo) {
            res = await nasaService.loadPhotosForSol();
        }
        const { photo, params } = res;

        const { img_src, camera = {}, earth_date } = photo;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: await render('index', {
                title: 'Random photo from Curiosity',
                cameraName: camera.full_name,
                imageSrc: img_src,
                date: earth_date,
                sol: params.sol,
                data: JSON.stringify({ item: photo, data: res.data }, null, 4)
            }),
        };
    } catch (error) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body: await render('error', {
                title: 'Random photo from Curiosity',
                sol: 0,
                message: error.message,
                data: {}
            }),
        };
    }

};
