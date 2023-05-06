const { readFile } = require('fs/promises');
const { template } = require('lodash');

module.exports = {
    render: async (name, params = {}) => {
        const html = await readFile(`${__dirname }/templates/${name}.html`);
        console.log(html)
        return template(html.toString())(params);
    }
}