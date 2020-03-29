var express = require('express')
var app = express()
const port = process.env.PORT;
const http= require('http').Server(app)
app.use(express.static(__dirname))
var server = http.listen(port,()=>{
     console.log('server is listening')
});
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
app.get('/favicon.ico', (req, res) => res.status(204));
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
io.on('disconnect', function(socket){
   console.log('user disconnected')
});
setTimeout(()=>{
     server.close();
     console.log('closed');
},80005)


