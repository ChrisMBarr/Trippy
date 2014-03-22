var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");
var debug = false;

var boxes=[];

function drawBox(index, isOdd, drawInner, x, y, size){
	var white = "#FFF";
	var black = "#000";

	var ratio = 0.25;
	var ssize = Math.round(size * ratio);
	var padding = Math.round(ssize * ratio);

	boxes[index]={
		box1:{},
		box2:{},
		corners: [
			[x + padding, y + padding],
			[x + size - ssize - padding, y + padding],
			[x + size - ssize - padding, y + size - ssize - padding],
			[x + padding, y + size - ssize - padding]
		]
	};

	//initial box positions - in opposite corners
	boxes[index].box1={
		x: boxes[index].corners[0][0],
		y: boxes[index].corners[0][1]
	};
	boxes[index].box2={
		x: boxes[index].corners[2][0],
		y: boxes[index].corners[2][1]
	};

	setInterval(function(){
	
		//Alternate color
		ctx.fillStyle = isOdd ? black : white;
		//Position & size it
		ctx.fillRect(x, y, size, size);

		if(drawInner){
			//Opposite color
			ctx.fillStyle = isOdd ? white : black;
			
			moveBox(index, "box1", ssize);
			moveBox(index, "box2", ssize);
		}
	}, 10);
}

function moveBox(index, key, size){
	var boxInfo = boxes[index];
	var x = boxInfo[key].x;
	var y = boxInfo[key].y;
	var pos = boxInfo.corners;
	ctx.fillRect(x, y, size, size);

	if(debug){
		//debug coordinates for each corner
		ctx.font="13px";
		for (var i = 0; i < pos.length; i++) {
			ctx.fillText(pos[i][0]+", "+pos[i][1], pos[i][0], pos[i][1]);
		};		

		//debug coordinates for moving box
		ctx.fillStyle = isOdd ? black : white;
		ctx.fillText("x: "+x, x+5, y+15);
		ctx.fillText("y: "+y, x+5, y+25);
	}

	if(x >= pos[0][0] && x < pos[1][0] && y == pos[0][1]){
		boxInfo[key].x ++; //move TL to TR
	}else if(y >= pos[1][1] && y < pos[2][1] && x == pos[1][0]){
		boxInfo[key].y++; //move TL to BL
	}else if(x <= pos[2][0] && x > pos[3][0]){
		boxInfo[key].x--; //move BL to BR
	}else if(y <= pos[3][1] && y > pos[0][1]){
		boxInfo[key].y--; //move BR to TR
	}
}

function drawCheckerboard(canvasSize, gridCount){
	//Set the size
	canvas.width = canvasSize;
	canvas.height = canvasSize;

	//Setup box grid
	var mid = (gridCount - 1) / 2;
	var boxSize= Math.round(canvasSize / gridCount);
	var totalBoxes = gridCount * gridCount;
	var row=0, col=0;
	for (var i = 0; i < totalBoxes; i++) {
		//Reset every row
		if(i % gridCount === 0){
			row++;
			col=0;
		}
		drawBox(
			i,
			i % 2 === 0,
			!(row-1 === mid && col === mid),
			Math.round(boxSize * col),
			Math.round(boxSize * (row-1)),
			boxSize
		);
		col++;
	}
}

console.clear();

//pass in square canvase size
//then number of rows/columns of boxes
//The 2nd param MUST be an odd number!
drawCheckerboard(550, 9);