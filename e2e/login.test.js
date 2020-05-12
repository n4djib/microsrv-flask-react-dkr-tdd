import { Selector } from 'testcafe';
const randomstring = require('randomstring');

const username = randomstring.generate();
const email = `${username}@test.com`;

const TEST_URL = process.env.TEST_URL;


fixture('/login').page(`${TEST_URL}/login`);

test(`should display the sign in form`, async (t) => {
    await t
        .navigateTo(`${TEST_URL}/login`)
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('form').exists).ok()
});


