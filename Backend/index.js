const connectToMongo = require('./db');
const express = require('express')
connectToMongo();


const app = express()
var cors = require('cors')
const port = 5000



app.use(cors()) // To allow browser to use api to make changes and solve cors error
app.use(express.json()) // when u want to use req.body then u need to have a middleware here these middleware is app.use i.e when u want to use console.log(req.body)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 
// so = require('./routes/auth.js')
// Available routes
// app.use('/api/auths', so)
// app.use('/api/notes', require('./routes/note'))
app.use('/api/user', require('./routes/user'))



app.listen(port, () => {
  console.log(`Notebook app listening on port ${port}`)
})