const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const favicon = require('serve-favicon')
const fs = require('fs') 
const http = require('http') 
const socketIO = require('socket.io')


const app = express();
app.use(favicon(__dirname + '/public/img/logo.png'));

// Load routes
const users = require('./routes/users');


// Passport Config
require('./config/passport')(passport);
// DB Config
const db = require('./config/database');

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Use routes
app.use('/users', users);


// Main Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/splashscreen.html'));
});

///////////////////////////////////////////////////////////////////////////////////

const port = process.env.PORT || 5001;
server=app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});

var io = require('socket.io').listen(server);

io.on('connection', socket =>{         //All the events are handeled here
    console.log("A user got connected!!")
    
//Write functions here

socket.on('Student', data=> { console.log("A student got connected!")
    //Do update record of people who are live

    if(liveInst[data[1]]){
    socket.join(data[1]);
    }else{
          console.log("Class isn't live yet")
    }
    // liveStud[data].push(socket);
  })

  socket.on('Instructor', data=> { console.log("An Instructor got connected!")
    //Do update record of people who are live
    liveInst[data[1]]=socket;      //Dictionary of instructor corrosponding to the className
  })

  socket.on('PostBinary',data=>{
    console.log("Instructor asked: "+  data);
      io.to(data[1]).emit("replyBinary",data[0]);
  })

  socket.on('PostMCQ',data=>{
    console.log("Instructor asked for the binary Ans");
    io.to(data[1]).emit("replyMCQ",data[0]);
  })
  socket.on('PostCP',data=>{
    console.log("Instructor allowed students to post");
    io.to(data[1]).emit("PostCP",data[0]);
  })


  socket.on('S_binary', data => {

    console.log("binary data received from student: ", data);
    console.log("Forwarding to instructor...");


    liveInst[data[1]].emit("BinaryResponse",data[0]);
  } ) 

socket.on('S_MCQ', data => {

    console.log("MCQ data received from student: ", data);
    liveInst[data[1]].emit("MCQResponse",data[0]);
  }) 

socket.on('S_cp', data => {

    console.log("Cp received from student: ", data);
    // liveInst["AP-300"].emit("cpResponse",data);
    liveInst[data[1]].emit("cpResponse",data[0]);
    io.to(data[1]).emit("cpResponse",data[0]);
    // socket.broadcast.emit("cpResponse",data)
  } ) 

  socket.on('disconnect', () =>{     //Against connection lost///Disconnection
        var key = (liveInst,socket);
        if(key){
          console.log("Instructor class removed!")
          delete liveInst.key
          
          // io.sockets.clients(key).forEach(function(s){
          //   s.leave(key);
          //     });
          // socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(key));
          // console.log("Students successfully kicked out of the roam")

        }
        console.log("User got disconnected");
            })
  })
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

liveStud={}     ////Json object with key = Classname and pair is the student
liveInst={}    //Json object with key = Classname and pair is the instructor
// server.listen(9000, () => console.log('Starting ...'))

//////////////////////////////////////////////////////////////////////






