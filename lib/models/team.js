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
};