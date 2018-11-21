const socket = io()


socket.on("replyBinary", data=> {
	console.log("Just received Binary Q: ", data);
	document.getElementById("binary").innerText=data
	activeBinary=1;
})

socket.on("replyMCQ", data=> {
	console.log("Just received MCQ : ", data);
	document.getElementById("MCQ").innerText=data
	activeMCQ=1;
})

socket.on("PostCP", data=> {
	console.log("Instructor allowed you to post CP "+ data + " times");
	document.getElementById("cp").innerText="You can post: "+data
	activeCp=data;
})
socket.on("cpResponse", data=> {
	console.log("Just received cp: ", data);
	document.getElementById("cp").innerText=document.getElementById("cp").innerText+"\n"+"Anony: "+data;
})

class MainPage extends React.Component {  //This is a component corrosponding to the module main page
	render() {
		return (
			React.createElement('div',null,

				// React.createElement('button',{onClick: ()=> {binaryUpdate()} },"Binary_Submit"),
				// React.createElement('button',{onClick: ()=> MCQUpdate()},"MCQ_Submit"),
				// React.createElement('button',{onClick: ()=> cpUpdate()},"CP_Post")
				)
			);
	}
}



const binaryUpdate =(x)=>{
	if(activeBinary==1){            //This means instructor posted the question
	console.log("came in update")

	let bAns=x 		//Binary value to be selected from the options 
	let className="AP300"		//Will be equal to the relevant class pressed
	
    socket.emit('S_binary', bAns);
	activeBinary=0;
	}
	else{
		console.log("This is not the right time to post")
	}
	document.getElementById("binary").innerText="Submitted"
}

const MCQUpdate =(val)=>{
	if(activeMCQ==1){            //This means instructor posted the question

	let MCQAns=val 		//MCQ value to be selected from the options 
	let className="AP300"		//Will be equal to the relevant class pressed
	
	socket.emit('S_MCQ', MCQAns);
	console.log("Submitted ans")
	activeMCQ=0;
	}
	else{
		console.log("This is not the right time to post")
	}
	document.getElementById("MCQ").innerText="Submitted"
}
const cpUpdate =()=>{
	if(activeCp){            //This means instructor posted the question

	let cp=document.getElementById("cpInput").value; 		//CP value to be selected from the options 
	let className="AP-300"		//Will be equal to the relevant class pressed
	
	socket.emit('S_cp', cp);
	console.log("Submitted cp")
	activeCp= activeCp-1;
	document.getElementById("cp").innerText=document.getElementById("cp").innerText +"\n"+"Mine: "+ document.getElementById("cpInput").value;
	}
	else{
		console.log("This is not the right time to post")
	}

}

const setState = ()=>{
	ReactDOM.render(React.createElement(MainPage,null),document.getElementById('root'));
}

activeBinary=0;
activeMCQ=0;
activeCp=0;							//Can post cp twice
socket.emit('Student',"AP-300");     //To notify the server that student got connected So that server can discriminate b/w users
// setState();

