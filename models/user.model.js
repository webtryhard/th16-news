var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from user');
    },

    single: id => {
        return db.load(`select * from user where User_Cat_ID = ${id}`);
    },

    singleEmail: email => {
        return db.load(`select * from user where Email = '${email}'`);
    },

    updateEmail: entity => {
        return db.update('user', 'Email', entity);
    },

    singleByUserName: userName => {
        return db.load(`select * from user where Username = '${userName}'`);
    },

    add_acc: entityAcc => {
        return db.add('user', entityAcc);
    },

    add: entitySub => {
        return db.add('subcriber', entitySub);
    },

    update: entity => {
        return db.update('user', entity);
    },

    delete: id => {
        return db.delete('users', 'f_ID', id);
    }
};