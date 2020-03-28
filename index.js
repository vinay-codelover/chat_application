var express = require('express')
var app = express()
const port = process.env.PORT;
const http= require('http').Server(app)
app.use(express.static('/sam.html'))
var server = http.listen(port)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
     res.header("Access-Control-Allow-Origin","*");
     res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
     res.header(
          "Acess-Control-Allow-Headers",
          "Content-Type"
          );
     next();
          
});
var messages = []
app.get('/vinay',(req,res)=>{
     res.send(messages);
   
})
app.post('/vinay',(req,res)=>{
     console.log(req.body);
     messages.push(req.body);
     io.emit('message',req.body)
     res.sendStatus(200);
})
io.on('connection',(socket)=>{
     console.log('user connected');
})



