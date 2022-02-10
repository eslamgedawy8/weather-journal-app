projectData = {}

const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("website"))


const port = 4000
const hostname = "127.0.0.1"

app.listen(port, () => {
  console.log(`Hello, Server running at http://${hostname}:${port}/`)
})


app.get("/get-weather", (req, res) => res.send(projectData))

app.post("/add-weather", (req, res) => {
  projectData = req.body
  console.log('projectData', projectData)
  res.send(projectData)
})