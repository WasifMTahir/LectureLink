const socket = io()
className = "AP-300"

let mStat=[0,0,0,0]
let bStat=[0,0]
socket.on("BinaryResponse", data=> {
	console.log("Just received Binary response: ", data);
	bStat[data]=bStat[data]+1;
	console.log("Updated binary stats: ", bStat);
	document.getElementById("binary").innerText=bStat.toString();
})

socket.on("MCQResponse", data=> {
	console.log("Just received MCQ response: ", data);
	mStat[data]=mStat[data]+1;
	console.log("Updated MCQ stats: ", mStat);
	document.getElementById("MCQ").innerText=mStat.toString();
})
socket.on("cpResponse", data=> {
	console.log("Just received cp: ", data);
	document.getElementById("cp").innerText=document.getElementById("cp").innerText+"\n"+data;
})


class MainPage extends React.Component {  //This is a component corrosponding to the module main page

	render() {
		return (
			React.createElement('div',null,

				// React.createElement('button',{onClick: ()=> binaryUpdate()},"PostBinary"),
				// React.createElement('button',{onClick: ()=> MCQUpdate()},"PostMCQ"),
				// React.createElement('button',{onClick: ()=> cpTime()},"PostCP")
				)
			);
	}

}

const binaryUpdate= ()=>{

	console.log("Asked Q: Are you guyz sleeping")
	let q=document.getElementById("bInput").value;
	socket.emit('PostBinary',[q,className]);
}

const MCQUpdate= ()=>{
	console.log("Asked Q: Countries in the world? ")
	let q=document.getElementById("MCQInput").value;

	socket.emit('PostMCQ',[q,className]); 
}


const cpTime = ()=>{
	let numCp=2
	console.log("Alloawing students to post CP!--CP time.")
	socket.emit('PostCP',[numCp,className]);   

}

const setState = ()=>{
	ReactDOM.render(React.createElement(MainPage,null),document.getElementById('root'));
}

socket.emit('Instructor',["",className]);   //To notify the server that inst got connected So that server can discriminate b/w users
setState();

