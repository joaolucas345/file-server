const express = require("express");
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fileSystem = require('fs')
// const FileReader = require('filereader')
// const pathFile = require('path')
const cors = require('cors')


// fileSystem.writeFileSync('nome', 'dentro')

app.use(cors())
app.use(bodyParser())
app.use(fileUpload())

app.use(express.static(__dirname + "/build"))

app.listen(3001)

app.get('/', (req, res) => {
    // const file = fileSystem.readFileSync('./src/index.js')
    res.send('hello')
})

app.post('/upload', (req, res) => {
    const file = req.files.fileUpload
    const filename = file.name
    const path = __dirname + '/storage/' + filename
    file.mv(path, filename , function(err) {
        if (err)
          return res.status(500).send(err);
    
        //   express.static(pathFile.join(__dirname , '..' , 'frontend/server-front/build' ))
      })
      res.redirect("/")
})


app.get('/files', (req, res) => {
    const files = fileSystem.readdirSync('./storage')
    res.send(files)  
})



//schema to get files {name:*name of the file*}

app.post('/files', (req, res) => {
    const files = fileSystem.readdirSync('./storage')
    files.map(m => {
        if(req.body.name === m){
            const path = __dirname + '/storage/' + m
            fileSystem.readFile(path, function(err, cont){
                if(err){
                    res.send('error');
                }else{

                    res.download(path)
                }
            })
        }
    })
})

app.post('/delete', (req, res) => {
    const files = fileSystem.readdirSync('./storage')
    files.map(t => {
        if(t === req.body.name){
            const path = __dirname + '/storage/' + t
            fileSystem.rmSync(path)
            const files = fileSystem.readdirSync('./storage')
            res.send(files);
        }
    })
})