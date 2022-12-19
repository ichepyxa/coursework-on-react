const express = require('express')
const fileUplaod = require('express-fileupload')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const housesRouter = require('./routes/housesRoutes')
const usersRouter = require('./routes/usersRoutes')
const sightsRouter = require('./routes/sightsRoutes')
const testRouter = require('./routes/testsRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const config = require('./config/server_config')

const app = express()
const db = require('./models')

app.use(
	`/${config.FILES_PATH}`,
	express.static(`${__dirname}/${config.FILES_PATH}`)
)
app.use(fileUplaod({}))
app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: config.CLIENT_URL,
	})
)
app.use(cookieParser())
app.use(config.API_PATH, housesRouter)
app.use(config.API_PATH, sightsRouter)
app.use(config.API_PATH, usersRouter)
app.use(config.API_PATH, testRouter)
app.use(errorMiddleware)

db.sequelize
	.sync()
	.then(() => {
		app.listen(config.PORT, async () => {
			console.log(`Server was started on ${config.API_URL}`)
		})
	})
	.catch(error => {
		console.log(error)
	})
