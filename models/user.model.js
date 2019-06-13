var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from users');
  },

  single: id => {
    return db.load(`select * from users where User_Cat_ID = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from user where Username = '${userName}'`);
  },

  // singleByUserName: userName => {
  //   return db.load(`select * 
  //                   from account acc, subcriber sub
  //                   where acc.Username = '${userName}', 
  //                         acc.User_Cat_ID = sub.Sub_ID`);
  // },

  add: entitySub => {
    return db.add('subcriber', entitySub);
  },

  add_acc: entityAcc=>{
    return db.add_acc('account', entityAcc);
  },


  update: entity => {
    var id = entity.f_ID;
    delete entity.f_ID;
    return db.update('users', 'f_ID', entity, id);
  },

  delete: id => {
    return db.delete('users', 'f_ID', id);
  }
};
