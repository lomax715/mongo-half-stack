require('dotenv').config();
const mongo = require('../lib/mongodb');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../lib/app');
chai.use(chaiHttp);
const { assert } = chai;

describe('teams', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('teams').remove();
        });
    });

    after(() => mongo.client.close());

    let Arizona = {
        name: 'Cardinals',
        division: 'NFC West'
    };

    // let Carolina = {
    //     name: 'Panthers',
    //     division: 'NFC South'
    // };

    before(() => {
        return chai.request(app)
            .post('/teams')
            .send(Arizona)
            .then(({ body }) => {
                Arizona = body;
            });
    });

    it('adds a team', () => {
        assert.ok(Arizona._id);
    });
});