const mongo = require('../mongodb');


module.exports = {
    insert(team){
        return mongo.then(db => {
            return db.collection('teams')
                .insert(team)
                .then(result => result.ops[0]);
        });
    },
};