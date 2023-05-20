'use strict';

module.exports.run = async (event) => {
    const randomNumber = parseInt(Math.random() * 100);
    console.log('Generated number', randomNumber);

    return randomNumber;
};
