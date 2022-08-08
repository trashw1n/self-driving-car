class Controls{
	constructor(type){
		this.forward=false;
		this.left=false;
		this.right=false;
		this.reverse=false;
		switch(type){
			case "KEYS":
				this.#addKeyboardListeners();
				break;
			case "DUMMY":
				this.forward=true;
				break;
		}
	}
	#addKeyboardListeners(){
		document.onkeydown=(event)=>{ //detects pressing of key
			switch(event.key){ 
				case "ArrowLeft":
				this.left=true;
				//console.log("rotating counter-clockwise");
				break;
				case "ArrowRight":
				this.right=true;
				//console.log("rotating clockwise");
				break;
				case "ArrowUp":
				this.forward=true;
				//console.log("moving forward");
				break;
				case "ArrowDown":
				this.reverse=true;
				//console.log("moving backward");
				break;
			}
		}
		document.onkeyup=(event)=>{ //detects release of key
			switch(event.key){ 
				case "ArrowLeft":
				this.left=false;
				break;
				case "ArrowRight":
				this.right=false;
				break;
				case "ArrowUp":
				this.forward=false;
				break;
				case "ArrowDown":
				this.reverse=false;
				break;
			}
		}
	}
}