const express = require('express')
const app = express()

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
zz
app.listen(process.env.PORT || 3000, () => {
    console.log(`Example`)
})