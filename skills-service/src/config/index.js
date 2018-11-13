const { dbSettings, serverSettings } = require("./config");
const db = require("./mysql");

module.exports = { dbSettings, serverSettings, db };
