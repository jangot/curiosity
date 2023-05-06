const { Template } = require('./services/template');
const Nasa = require('./services/nasa');

const nasaService = new Nasa(process.env.NASA_HOST, process.env.NASA_KEY);

const layoutTMP = new Template('layout');
const indexTMP = new Template('index');
const errorTMP = new Template('error');

exports.page = async (event) => {
    try {
        let res = await nasaService.loadPhotosForSol();
        while (!res.photo) {
            res = await nasaService.loadPhotosForSol();
        }
        const { photo, params } = res;

        const { img_src, camera = {}, earth_date } = photo;
        const body = layoutTMP.render({
            title: 'Random photo from Curiosity',
            content: indexTMP.render({
                cameraName: camera.full_name,
                imageSrc: img_src,
                date: earth_date,
                sol: params.sol,
                data: JSON.stringify({ item: photo, data: res.data }, null, 4)
            })
        })
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body,
        };
    } catch (error) {
        const body = layoutTMP.render({
            title: 'Random photo from Curiosity',
            content: errorTMP.render({
                sol: 0,
                message: error.message,
                data: {}
            })
        });
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
            },
            body,
        };
    }

};
