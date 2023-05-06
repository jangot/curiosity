const { page } = require('../src/render');

test('adds 1 + 2 to equal 3', async () => {
    const { statusCode } = await page({});

    expect(statusCode).toBe(200);
});