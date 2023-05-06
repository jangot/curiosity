const { readFile } = require('fs/promises');
const { template } = require('lodash');

module.exports = {
    render: async (name, params = {}) => {
        const html = await readFile(`templates/${name}.html`, { encoding:'utf8' });
        console.log(html.toString())
        return template(html.toString())(params);
    }
}