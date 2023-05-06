const { readFile } = require('fs/promises');
const { template } = require('lodash');

class Template {
    constructor(name) {
        this.name = name;
    }

    async render(options = {}) {
        const html = await readFile(`${__dirname }/templates/${name}.html`);

        return template(html.toString())(options);
    }
}

module.exports = {
    render: async (name, options = {}) => {
        const tmp = new Template(name);

        return tmp.render(options);
    }
}