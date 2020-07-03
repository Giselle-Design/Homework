

const readline = require('readline');
const fs = require ('fs');
const emoji = require('node-emoji');




// read from file
function read (){
  if (process.argv[2]){
    const fileName = process.argv[2];
    // This method check the existence of fileName,because the user could provide a filename just for saving purpose.
    if(fs.existsSync(fileName)) {
        console.log("The file exists.");
        // I tried for several hours to use async version but I was not able to.
        // The reason is I want to return data and store it in a variable to be used throughout the program.
        var data = fs.readFileSync(fileName);
        // Parse the data with JSON.parse(), and the data becomes a JavaScript object.
        return JSON.parse(data.toString());

    } else {
        console.log('The file does not exist.');
        return [];
    }

  }
  else {
    return [];
  }

};

let arr = read();

function write (data){
    if (process.argv[2]){
      const fileName = process.argv[2];
      //Convert a JavaScript object into a string with JSON.stringify()
      fs.writeFile(fileName, JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
        }
        console.log(`save data to "${fileName}"`);
      })
    }
    else {
      return;
    }


};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'TODO> '
});



// print welcome message
console.log (`Welcome to Todo CLI!

--------------------

(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit • (s) Save`);
// change defaut prompt
rl.prompt();




// function to show object in predefined format
function view(arr) {
	arr.forEach((element,index) => {
		if(element.complete){
			console.log(index+1+" [+] "+ element.item);
		}
		else{
			console.log(index+1+" [] "+ element.item);
		}
    })
    menu();
}

// function to cover cx and dx
function other(arr,str) {
	if(str.startsWith("c")){
		let index=parseInt(str.slice(1));
		arr[index-1].complete = true;
	}
	else if (str.startsWith("d")) {
		let index=parseInt(str.slice(1));
    arr.splice(index-1,1);
	}
  menu();
}

// function to add item to our data structure
function addNew (answer){
  arr.push({item:answer, complete:false});
  menu();
}


// arrow function to show menu after running each command
const menu = () => {
  console.log(
    "(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit • (s) Save");
}



rl.on('line', (line) => {
  switch (line.trim()) {
    case 'v':
      view(arr);
      break;
		case 'n':
      rl.question('What? \n', (answer) => {
        addNew(answer);
        rl.prompt();
      });
      break;
    case 's':
      write(arr);
      break;
    case 'q':
      rl.close();
      break;
    default:
      other (arr,line);
      break;
}

rl.prompt();
}).on('close', () => {
  const smile = emoji.get('smile');
  console.log("See You Soon!", smile);
  process.exit(0);
});
