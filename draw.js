var canvas = document.getElementById("draw");
var ctx = canvas.getContext("2d");

function drawBox(isOdd, drawInner, x, y, size){
	var white = "#FFF";
	var black = "#000";

	var ratio = 0.25;
	var ssize = Math.round(size * ratio);
	var padding = Math.round(ssize * ratio);

	//console.log(x, y, size, ssize, padding);

	//define x,y points for each corner
	var pos=[
		[x + padding, y + padding],
		[x + size - ssize - padding, y + padding],
		[x + size - ssize - padding, y + size - ssize - padding],
		[x + padding, y + size - ssize - padding]
	];

	//console.log(pos);

	//console.log(x, y, pos)

	//initial box positions - in opposite corners
	var box1x = pos[0][0];
	var box1y = pos[0][1];
	var box2x = pos[2][0];
	var box2y = pos[2][1];

	setInterval(function(){
	
		//Alternate color
		ctx.fillStyle = isOdd ? black : white;
		//Position & size it
		ctx.fillRect(x, y, size, size);

		if(drawInner){
			//Opposite color
			ctx.fillStyle = isOdd ? white : black;
			
			ctx.fillRect(box1x, box1y, ssize, ssize);
			//ctx.fillRect(box2x, box2y, ssize, ssize);
			//ctx.fillRect(pos[3][0], pos[3][1], ssize, ssize);
		

			if(box1x >= pos[0][0] && box1x <= pos[1][0]){
				box1x ++;
				//console.log("one")
			}else if(box1y >= pos[1][1] && box1y <= pos[2][1]){
				box1y++;
			}else if(box1x >= pos[2][0] && box1x <= pos[3][0]){
				box1x --;
			}else if(box1y >= pos[3][1]){
				//box1y--;
				//console.log("ELSE")
			}

			//console.log(box1x >= pos[2][0], box1x <= pos[3][0])
			
			//debug coordinates
			ctx.font="13px";
			ctx.fillText(box1x+", "+box1y, x+size/2 - ssize/2, y+size/2);

			//box2x --;
		}
	}, 10);
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
drawCheckerboard(500, 3);