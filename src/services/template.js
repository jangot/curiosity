const { readFile } = require('fs/promises');
const { readFileSync } = require('fs');
const { template } = require('lodash');

class TemplateService {
    constructor(name) {
        this.name = name;
        this.template = readFileSync(`templates/${this.name}.html`, { encoding:'utf8' }).toString();
    }

    render(options = {}) {
        try {
            return template(this.template)(options);
        } catch (error) {
            console.log(this.name, error.message);

            throw error;
        }

    }
}

module.exports = { TemplateService }