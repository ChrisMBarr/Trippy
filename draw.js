var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");

function drawCheckerboard(canvasSize, gridCount){
	//Set the size
	canvas.width = canvasSize;
	canvas.height = canvasSize;

	//Setup box grid
	var mid = (gridCount - 1) / 2;
	var boxSize= canvasSize / gridCount;
	var totalBoxes = gridCount * gridCount;
	var row=0, col=0;
	for (var i = 0; i < totalBoxes; i++) {
		//Reset every row
		if(i % gridCount === 0){
			row++;
			col=0;
		}
		drawBox(
			i%2===0, 
			!(row-1 === mid && col===mid),
			boxSize * col, 
			boxSize * (row-1), 
			boxSize
		);
		col++;
	}
}

function drawBox(isOdd, drawInner, x, y, size){
	var white = "#FFF";
	var black = "#000";
	
	//Alternate color
	ctx.fillStyle = isOdd ? black : white;
	//Position & size it
	ctx.fillRect(x, y, size, size);

	if(drawInner){
		var ratio = 0.25;
		var ssize = size * ratio;
		var padding = ssize * ratio;

		//Opposite color
		ctx.fillStyle = isOdd ? white : black;
		
		ctx.fillRect(x + padding, y + padding, ssize, ssize);
		ctx.fillRect(x + size -ssize -padding, y + size - ssize - padding, ssize, ssize);
	}
}

//pass in square canvase size
//then number of rows/columns of boxes
//The 2nd param MUST be an odd number!
drawCheckerboard(500, 9);