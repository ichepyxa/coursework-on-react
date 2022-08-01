const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const config = require('./config/server_config')
const housesRouter = require('./routes/housesRoutes')
const usersRouter = require('./routes/usersRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
const db = require('./models')

app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: config.CLIENT_URL,
	})
)
app.use(cookieParser())
app.use('/api', housesRouter)
app.use('/api', usersRouter)
app.use(errorMiddleware)

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
