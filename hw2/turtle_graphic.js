class Turtle {
	constructor(x,y) {
		this.current_x = x;
		this.current_y = y;
		this.visitedPoint = [[x,y]];
		this.direction ="right";
		this.dots = [ ];
	}

	forward(n) {
		for(let i =0; i<n; i++){
			switch(this.direction) {

				case "right" :
					this.current_x +=1;
					break;


				case "left":
					 this.current_x -=1;
					 break;


				case "up":
					this.current_y -=1;
					break;



				case "down":
					this.current_y +=1;
					break;

       		 }

        this.visitedPoint.push([this.current_x,this.current_y]);


		}


	}

	draw() {

		for (let i=0; i<= this.max()[1]; i++){
			let line = "";
			for(let j=0;  j<= this.max()[0]; j++){

				if(this.visitedPoint.some (element => element[0]==j && element[1]==i)) {
					line+='*'

				}

				else {
					line+= ' '
				}


			}

			console.log(line);
		}


	}

	max () {
		let max_x = 0;
		let max_y = 0;
		for(let i=0; i<this.visitedPoint.length ; i++){
			let [x,y] = this.visitedPoint[i];
			if( x > max_x){
				max_x = x;
			}

			if( y > max_y){
				max_y = y;
			}
	    }

		return [max_x,max_y] ;

	}




	right () {
		this.direction ="right";
	}

	left () {
		this.direction ="left";
	}

	up () {
		this.direction ="up";
	}

	down () {
		this.direction ="down";

	}


	allPoint () {
		console.log(this.visitedPoint);

	}



}



const turtle = new Turtle (10,10);

turtle.forward(4);
turtle.up();
turtle.forward(4);
turtle.right();
turtle.forward(4);
turtle.down();
turtle.forward(4);
turtle.right();
turtle.forward(4);
turtle.down();
turtle.forward(4);
turtle.left();
turtle.forward(4);
turtle.down();
turtle.forward(4);
turtle.left();
turtle.forward(4);
turtle.up();
turtle.forward(4);
turtle.left();
turtle.forward(4);
turtle.up();
turtle.forward(4);
turtle.draw();

// turtle.allPoint();
// console.log(turtle.current_x);
// console.log(turtle.current_y);
