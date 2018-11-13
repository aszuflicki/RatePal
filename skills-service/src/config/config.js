const dbSettings = {
	dbname: 'skills',
	user: process.env.DB_USER || 'root',
	pass: process.env.DB_PASS || 'pass',
    url: process.env.DB_SERVER || 'localhost',
    port: 13306 
}

const serverSettings = {
	port: process.env.PORT || 7001,
	ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings })