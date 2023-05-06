const { readFile } = require('fs/promises');
const { template } = require('lodash');

class Template {
    constructor(name) {
        this.name = name;
    }

    async render(options = {}) {
        const html = await readFile(`../templates/${name}.html`);

        return template(html.toString())(options);
    }
}

module.exports = {
    render(name, options = {}) {

    }
}