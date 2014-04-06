'strict';
(function(){
	var canvas = document.getElementById("draw");
	var ctx = canvas.getContext("2d");
	
	//Set the size
	var containerSize = 500;
	canvas.width = containerSize;
	canvas.height = containerSize;
	
	//Setup
	var gridCount = 11; //MUST be an odd number!
	var mid = (gridCount - 1) / 2;	
	var boxes=[];
	var white = "#FFF";
	var black = "#000";
	
	//Box sizing
	var totalBoxes = gridCount * gridCount;
	var boxSize= Math.round(containerSize / gridCount);
	var innerRatio = 0.26;
	var innerSize = Math.round(boxSize * innerRatio);
	var padding = Math.round(innerSize * innerRatio);

	//Animation
	var updateFreqency = 40;
	var pauseDuration = 1000;
	var sideAnimationDuration = boxSize - (padding*2) - innerSize +1;

	//Create & setup initial boxes
	var row=0, col=0;
	for (var i = 0; i < totalBoxes; i++) {
		//Reset every row
		if(i % gridCount === 0){
			row++;
			col=0;
		}
		drawBox(
			i,
			row-1, //normalize row num
			col,
			Math.round(boxSize * col),
			Math.round(boxSize * (row-1)),
			boxSize
		);
		col++;
	}

	function drawBox(index, row, col, x, y){
		var isOdd = index % 2 === 0;
		var drawInner = !(row === mid && col === mid);

		//Add info about this box
		boxes[index]={
			isCenter: row === mid || col === mid,
			left: col<mid,
			right: col>mid,
			top: row<mid,
			bottom: row>mid,
			box1:{},
			box2:{},
			corners: [
				[x + padding, y + padding],
				[x + boxSize - innerSize - padding, y + padding],
				[x + boxSize - innerSize - padding, y + boxSize - innerSize - padding],
				[x + padding, y + boxSize - innerSize - padding]
			]
		};

		//Derermine the starting corners for the inner boxes
		//Depending on the position of the outer parent box
		var c1=0, c2=0;
		if(boxes[index].isCenter){
			if(boxes[index].top){
				c1=2, c2=3;
			}else if(boxes[index].right){
				c1=3, c2=0;
			}else if(boxes[index].bottom){
				c1=0, c2=1;
			}else if(boxes[index].left){
				c1=1, c2=2;
			}
		}else{
			if((boxes[index].top && boxes[index].left) || (boxes[index].bottom && boxes[index].right)){
				c1=1, c2=3;
			}else{
				c1=0, c2=2;
			}
		}
		
		//initial box positions - in opposite corners
		boxes[index].box1={
			x: boxes[index].corners[c1][0],
			y: boxes[index].corners[c1][1]
		};
		boxes[index].box2={
			x: boxes[index].corners[c2][0],
			y: boxes[index].corners[c2][1]
		};

		var life = 0;
		var timer = setInterval(_boxUpdater, updateFreqency);
		_boxUpdater();

		function _boxUpdater(){
			life++;
			if(life % sideAnimationDuration === 0){
				clearInterval(timer);
				setTimeout(function(){
					life=0;
					timer = setInterval(_boxUpdater, updateFreqency);
				}, pauseDuration)
			}else{
				//Alternate color
				ctx.fillStyle = isOdd ? black : white;
				//Position & size it
				ctx.fillRect(x, y, boxSize, boxSize);

				if(drawInner){
					moveInnerBox(index, "box1", innerSize, isOdd);
					moveInnerBox(index, "box2", innerSize, isOdd);
				}
			}
		}
	}

	function moveInnerBox(index, key, size, isOdd){
		var boxInfo = boxes[index];
		var x = boxInfo[key].x;
		var y = boxInfo[key].y;
		var pos = boxInfo.corners;

		ctx.fillStyle = isOdd ? white : black;
		ctx.fillRect(x, y, size, size);

		if(x >= pos[0][0] && x < pos[1][0] && y === pos[0][1]){
			boxInfo[key].x++; //move TL to TR
		}else if(y >= pos[1][1] && y < pos[2][1] && x === pos[1][0]){
			boxInfo[key].y++; //move TL to BL
		}else if(x <= pos[2][0] && x > pos[3][0]){
			boxInfo[key].x--; //move BL to BR
		}else if(y <= pos[3][1] && y > pos[0][1]){
			boxInfo[key].y--; //move BR to TR
		}
	}

})();