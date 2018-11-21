
const socket = io()


let mStat=[0,0,0,0]
let bStat=[0,0]
socket.on("BinaryResponse", data=> {
	console.log("Just received Binary response: ", data);
	bStat[data]=bStat[data]+1;
	console.log("Updated binary stats: ", bStat);
	//document.getElementById("binary").innerText=bStat.toString();
})

socket.on("MCQResponse", data=> {
	console.log("Just received MCQ response: ", data);
	mStat[data]=mStat[data]+1;
	console.log("Updated MCQ stats: ", mStat);
	//document.getElementById("MCQ").innerText=mStat.toString();
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
	socket.emit('PostBinary',q);

}

const MCQUpdate= ()=>{
	console.log("Asked Q: Countries in the world? ")
	let q=document.getElementById("MCQInput").value;

	socket.emit('PostMCQ',q); 


}


const cpTime = ()=>{
	let numCp=2
	console.log("Alloawing students to post CP!--CP time.")
	socket.emit('PostCP',numCp);   

}

const setState = ()=>{
	ReactDOM.render(React.createElement(MainPage,null),document.getElementById('root'));
}

const binaryGraph = ()=>{
    var binPop = document.getElementById("binaryToggle");
    if (binPop.style.display === "none") {
        binPop.style.display = "block";
    } else {
        binPop.style.display = "none";
    }
    var barGraph = document.getElementById("binaryChart").getContext("2d")
    var barsss = new Chart(barGraph, {
        type: 'bar',
        data: {
            labels: ["Yes", "No"],
            datasets: [{
                    label: "Results",
                    data: [bStat[1],bStat[0]],
                    fill: false,
                    backgroundColor: "#00aba9",
                    borderColor: "#eebcde",
                    borderCapStyle: 'butt',
                    borderDash: [3, 3],
                }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                   label: function(tooltipItem) {
                          return tooltipItem.yLabel;
                   }
                }
            },
            hover: {
                mode: 'label'
            },
            scales: {
                xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false,
                        }
                    }],
                yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            steps: Math.max(bStat[0], bStat[1]) + 2,
                            stepValue: 2,
                            max: Math.max(bStat[0], bStat[1]) + 2
                        }
                }]
            }
        }
    })
}

const mcqGraph = ()=>{
    var mcqPop = document.getElementById("mcqToggle");
    if (mcqPop.style.display === "none") {
        mcqPop.style.display = "block";
    } else {
        mcqPop.style.display = "none";
    }
    var mcqGraph = document.getElementById("mcqChart").getContext("2d")
    var mcqsss = new Chart(mcqGraph, {
        type: 'pie',
        data: {
            labels: ['A', 'B', 'C', 'D'],
            datasets: [{
                    label: "Results",
                    data: mStat,
                    fill: false,
                    backgroundColor: [
                        "#00aba9",
                        "#fd6a02",
                        "#ffc43e",
                        "#5f6c72",
                    ],
                    borderCapStyle: 'butt',
                    borderDash: [3, 3],
                }]
        },
        options: {
            responsive: true,
            
            legend: {
                display: false
            },
            hover: {
                mode: 'label'
            }
        }
    })
}
socket.emit('Instructor',"AP-300");   //To notify the server that inst got connected So that server can discriminate b/w users
setState();

