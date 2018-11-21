const fs = require('fs') 
const http = require('http') 
const socketio = require('socket.io')

//ID can also be assigned in this fashion:
//  socket.id = Math.floor(Math.random() * 1000);


const readFile = f => new Promise((resolve, reject) => 
  fs.readFile(f, (e, d) => e?reject(e):resolve(d))) 

const server= http.createServer(async (req,resp) => 
  resp.end(await readFile(req.url.substr(1)))) 
const io =socketio(server) 



io.on('connection', socket =>{         //All the events are handeled here
    // console.log("A user got connected!!")

    
//Write functions here

  socket.on('Student', data=> { console.log("A student got connected!")
  	//Do update record of people who are live
    socket.join("AP-300");
    // liveStud[data].push(socket);
	})

	socket.on('Instructor', data=> { console.log("An Instructor got connected!")
  	//Do update record of people who are live
    liveInst[data]=socket;
	})

	socket.on('PostBinary',data=>{
		console.log("Instructor asked: "+  data);
      io.to("AP-300").emit("replyBinary",data);
	})

  socket.on('PostMCQ',data=>{
    console.log("Instructor asked for the binary Ans");
    io.to("AP-300").emit("replyMCQ",data);
  })

  socket.on('PostCP',data=>{
    console.log("Instructor allowed students to post");
    io.to("AP-300").emit("PostCP",data);
  })


  socket.on('S_binary', data => {

  	console.log("binary data received from student: ", data);
    console.log("Forwarding to instructor");
    liveInst["AP-300"].emit("BinaryResponse",data);
  } )	

socket.on('S_MCQ', data => {

    console.log("MCQ data received from student: ", data);
    liveInst["AP-300"].emit("MCQResponse",data);
  } ) 

socket.on('S_cp', data => {

    console.log("Cp received from student: ", data);
    // liveInst["AP-300"].emit("cpResponse",data);
    socket.broadcast.emit("cpResponse",data)
  } ) 


  socket.on('disconnect', () =>{     //Against connection lost
        console.log("User got disconnected");
            })
  })
liveStud={}     ////Json object with key = Classname and pair is the student
liveInst={}    //Json object with key = Classname and pair is the instructor
server.listen(9003, () => console.log('Starting ...'))


