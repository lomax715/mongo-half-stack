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

    let Carolina = {
        name: 'Panthers',
        division: 'NFC South'
    };

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

    it('gets team by id', () => {
        return chai.request(app)
            .get(`/teams/${Arizona._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, Arizona);
            });
    });

    it('updates a team division', () => {
        Arizona.division = 'NFC North';
        return chai.request(app)
            .put(`/teams/${Arizona._id}`)
            .send(Arizona)
            .then(() => {
                return chai.request(app)
                    .get(`/teams/${Arizona._id}`)
                    .then(({ body }) => {
                        assert.deepEqual(body, Arizona);
                    });
            });
    });

    it('gets all the teams', () => {
        return chai.request(app)
            .post('/teams')
            .send(Carolina)
            .then(({ body }) => {
                Carolina = body;
                return chai.request(app)
                    .get('/teams')
                    .then(({ body }) => {
                        assert.deepEqual(body, [Arizona, Carolina]);
                    });
            });
    });

    it('deletes team with an id', () => {
        return chai.request(app)
            .delete(`/teams/${Carolina._id}`)
            .then(() => {
                return chai.request(app)
                    .get('/teams')
                    .then(({ body }) => {
                        assert.deepEqual(body, [Arizona]);
                    });
            });
    });
});