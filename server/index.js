require('dotenv').config()
const express = require('express')

const app = express()

app.listen(5000, () => {
	console.log('Server was started on port 5000')
})
