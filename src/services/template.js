const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');
const { template } = require('lodash');

class Template {
    constructor(name) {
        this.template = readFileSync(`templates/${name}.html`, { encoding:'utf8' }).toString();
    }

    render(options = {}) {
        return template(this.template)(options);
    }
}

module.exports = {
    Template,
    render: async (name, params = {}) => {
        const html = await readFile(`templates/${name}.html`, { encoding:'utf8' });
        return template(html.toString())(params);
    }
}