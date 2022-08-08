//ctx is the canvas context for road and the cars
//netCtx is the canvas context for the NN visualizer

//setting the canvas element to emulate the road
const canvas=document.getElementById("myCanvas");
canvas.width=200;

/*const netCanvas=document.getElementById("networkCanvas");
netCanvas.width=300;*/


const ctx=canvas.getContext("2d");
//const netCtx=netCanvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9);
const cars=generateCars(200);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
	for (let i=0; i<cars.length;i++) {
		cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
		if(i!=0){
			NeuralNetwork.mutate(cars[i].brain,0.2);
		}		
	}
}
const traffic=[
	new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
	new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
	new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2)
];

animate();


function animate(){
	for(let i=0;i<traffic.length;i++){
		traffic[i].update(road.borders,[]);
	}
	for(let i=0;i<cars.length;i++){
		cars[i].update(road.borders,traffic);	
	}

	bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y))); //fitness function
	canvas.height=window.innerHeight; //updates the road height in case the inspect window is rescaled
	//netCanvas.height=window.innerHeight;
	ctx.save();
	ctx.translate(0,-bestCar.y+canvas.height*0.7); //focus only on one car
	road.draw(ctx);
	for(let i=0;i<traffic.length;i++){
		traffic[i].draw(ctx,"red");
	}
	ctx.globalAlpha=0.2; //makes every car but one translucent
	for(let i=1;i<cars.length;i++){
		cars[i].draw(ctx,"blue");
	}
	ctx.globalAlpha=1;
	bestCar.draw(ctx,"blue",true); //we emphasize this car only by drawing it's sensors and making it opaque
	ctx.restore();
	//Visualizer.drawNetwork(netCtx,bestCar.brain);
	requestAnimationFrame(animate);
}

function generateCars(N){
	const cars=[];
	for(let i=1;i<=N;i++){
		cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI",4));	
	}
	return cars;
}

function save(){
	localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
}

function discard(){
	localStorage.removeItem("bestBrain",JSON.stringify(bestCar.brain));
}