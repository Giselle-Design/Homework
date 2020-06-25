//You can type any name you want in command line with any number of letters.
const name = process.argv

function drawLine (n) {
	line = "";
	for(let i=0; i<n; i++) {
		line += "━" ;
	}
	return line;
}

function drawTopBorder (n) {
	return  "┏"+drawLine(n-2)+"┓";

}

function drawBottomBorder (n) {
	return  "┗"+drawLine(n-2)+"┛";
}

function drawMiddleBorder(n) {
	return  "┠"+drawLine(n-2)+"┨";
}

//padEnd method gives you a tidy table.

function drawBarsAround (word){
	return "┃"+word.padEnd(longestBox-2)+"┃";
}

function maxLength (name){
	let max=0;
	for(let i=2; i<name.length; i++){
	 if(name[i].length>max){
		max=name[i].length;
	 }
	}
	return max;

}

let longestBox= maxLength(name)+2;



function boxIt (longestBox) {
	if (name.length === 2){
		console.log(drawTopBorder(2));
		console.log(drawBottomBorder(2));
	}

	else {
		console.log(drawTopBorder(longestBox));
		for(let i=2; i<name.length; i++){
		  console.log(drawBarsAround(name[i]));
			if(i=== name.length-1) {
			  console.log(drawBottomBorder(longestBox));
			}
			else {
			  console.log(drawMiddleBorder(longestBox));
			}
		}
	}
}





boxIt(longestBox);
