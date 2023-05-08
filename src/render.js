const { TemplateService } = require('./services/template');
const { NasaService } = require('./services/nasa');

const nasaService = new NasaService(process.env.NASA_HOST, process.env.NASA_KEY);
const layoutTMP = new TemplateService('layout');
const indexTMP = new TemplateService('index');
const errorTMP = new TemplateService('error');

console.log('INIT Function!!!');
exports.page = async () => {
    let content = '';
    try {
        let res = await nasaService.loadPhotosForSol();
        while (!res.photo) {
            res = await nasaService.loadPhotosForSol();
        }
        const { photo, params } = res;

        const { img_src, camera = {}, earth_date } = photo;
        content = indexTMP.render({
            cameraName: camera.full_name,
            imageSrc: img_src,
            date: earth_date,
            sol: params.sol,
            data: JSON.stringify({ photo, params }, null, 4)
        });
    } catch (error) {
        content = errorTMP.render({
            message: error.message
        });
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: layoutTMP.render({ content }),
    };

};
