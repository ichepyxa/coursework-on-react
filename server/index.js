const express = require('express')
const cors = require('cors')
const config = require('./config/server_config.json')

const app = express()
const db = require('./models')

app.use(express.json())
app.use(cors(config.CLIENT_URL))

db.sequelize
	.sync()
	.then(() => {
		app.listen(config.PORT, async () => {
			console.log(`Server was started on port ${config.PORT}`)
		})
	})
	.catch(error => {
		console.log(error)
	})
