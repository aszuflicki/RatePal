"use strict";
const Sequelize = require("sequelize");

const getMySQLURI = options => {
  const { user, pass, url, port, dbname } = options;
  return `mysql://${user}:${pass}@${url}:${port}/${dbname}`;
};

const connect = (options, mediator) => {
  mediator.once("boot.ready", () => {
    const uri = getMySQLURI(options);
    const sequelize = new Sequelize(uri);

    sequelize
      .authenticate()
      .then(() => {
        mediator.emit('db.ready', sequelize)
      })
      .catch(err => {
        mediator.emit("db.err", err)
      })
  })
}

module.exports = {connect}