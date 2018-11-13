'use strict'
const { EventEmitter } = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/')
const mediator = new EventEmitter()
const Sequelize = require("sequelize");


console.log('--- Skills Service ---')
console.log('Connecting to Skills db')

process.on('uncaughtException', (err) => {
	console.log('Unhandled Exception', err)
	process.exit(1)
})

process.on('uncaughtRejection', (err) => {
	console.log('Unhandled Rejection', err)
	process.exit(1)
})

mediator.on('db.ready', sequelize => {
	console.log('Connected to db. Setting up repository')

		let rep
		repository.connect(sequelize)
			.then(repo => {
				console.log('Connected. Starting Server')
				rep = repo
				return server.start({
					port: config.serverSettings.port,
					ssl: config.serverSettings.ssl,
					repo
				})
			})
			.then(app => {
				console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
				app.on('close', () => {
					rep.disconnect()
				})
			})
})

mediator.on('db.error', err => {
	console.log(err)
	process.exit(1)
})

config.db.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')
