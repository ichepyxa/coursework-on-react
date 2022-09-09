const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const housesRouter = require('./routes/housesRoutes')
const usersRouter = require('./routes/usersRoutes')
const sightsRouter = require('./routes/sightsRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')
const config = require('./config/server_config')

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
app.use(config.API_PATH, housesRouter)
app.use(config.API_PATH, sightsRouter)
app.use(config.API_PATH, usersRouter)
app.use(errorMiddleware)

db.sequelize
	.sync()
	.then(() => {
		// db.houses_description.create({
		// 	description:
		// 		'jnadsnklm gajfamkт ывтпьдф ьылплтфыд ьпфбыд пщфыждьпбвыфж пщшжфопьлдыф паыовдтешцйтплваьыьплуткцштпшт3щшщц3й3ощ2 ешташщдтвлчьщш о4з23щопльдыфжв asmglk sgnlkmsg kgnsl gmasgk am;gm',
		// 	houses_id: 2,
		// })
		// db.users_roles.create({})
		app.listen(config.PORT, async () => {
			console.log(`Server was started on port ${config.PORT}`)
		})
	})
	.catch(error => {
		console.log(error)
	})
