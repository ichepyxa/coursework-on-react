const express = require('express')
const cors = require('cors')
const config = require('./config/server_config.json')
const housesRouter = require('./routes/housesRoutes')

const app = express()
const db = require('./models')

app.use(express.json())
app.use(cors(config.CLIENT_URL))
app.use('/api', housesRouter)

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
