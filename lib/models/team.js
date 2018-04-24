const mongo = require('../mongodb');
const ObjectId = require('mongodb').ObjectID;

module.exports = {
    insert(team){
        return mongo.then(db => {
            return db.collection('teams')
                .insert(team)
                .then(result => result.ops[0]);
        });
    },

    findOne(id){
        return mongo.then(db => {
            return db.collection('teams')
                .findOne({ _id: ObjectId(id) })
                .then(result => {
                    return result; 
                });
        });
    },

    update(id, body){
        return mongo.then(db => {
            return db.collection('teams')
                .update({
                    _id: ObjectId(id)
                }, {
                    name: body.name,
                    division: body.division
                });
        });
    },

    find(){
        return mongo.then(db => {
            return db.collection('teams')
                .find()
                .toArray()
                .then(result => {
                    return result;
                });
        });
    },
};