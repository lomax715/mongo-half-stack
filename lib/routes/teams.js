const team = require('../models/team');

const post = (req, res) => {
    team.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const methods = { post };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};