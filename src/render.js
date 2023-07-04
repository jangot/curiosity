const { TemplateService } = require('./services/template');
const { NasaService } = require('./services/nasa');

const nasaService = new NasaService(process.env.NASA_HOST, process.env.NASA_KEY);

console.log('INIT Function!!!');
exports.page = async (event) => {
    if (/webhook/.test(event.path)) {
        const query = event.queryStringParameters || {};
        console.log({
            path: event.path,
            query,
        })
        return {
            status: 200,
            body: query['hub.verify_token '],
        }
    }

    let content = '';
    try {
        let res = await nasaService.loadPhotosForSol();
        while (!res.photo) {
            res = await nasaService.loadPhotosForSol();
        }
        const { photo, params } = res;

        const { img_src, camera = {}, earth_date } = photo;
        content = new TemplateService('index').render({
            cameraName: camera.full_name,
            imageSrc: img_src,
            date: earth_date,
            sol: photo.sol,
            data: JSON.stringify({ photo, params }, null, 4)
        });
    } catch (error) {
        content = new TemplateService('error').render({
            message: error.message
        });
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: new TemplateService('layout').render({ content }),
    };

};
