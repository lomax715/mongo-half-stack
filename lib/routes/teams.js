const team = require('../models/team');

const post = (req, res) => {
    team.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const get = (req, res) => {
    const id = req.paths[1];
    id ? getId(id, req, res) : getAll(req, res);
};

const getId = (id, req, res) => {
    team.findOne(id).then(one => {
        res.send(one);
    });
};

const getAll = (req, res) => {
    team.find().then(allTeams => {
        res.send(allTeams);
    });
};

const put = (req, res) => {
    const id = req.paths[1];
    team.update(id, req.body).then(updated => {
        res.send(updated);
    });
};


const methods = { post, get, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    method(req, res);
};