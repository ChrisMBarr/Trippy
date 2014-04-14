'strict';
(function(){
	var canvas = document.getElementById("draw");
	var ctx = canvas.getContext("2d");
	var containerSize = 500;
	canvas.width = containerSize;
	canvas.height = containerSize;

	//Set the BG color
	ctx.fillStyle = '#040404';
	ctx.fillRect(0,0,containerSize,containerSize);

	//Determine properties for drawing circles
	var startAngle = 1 * Math.PI;
    var endAngle = 2 * Math.PI;
    var perRow = 8;
    var totalCount = 15//perRow*perRow;
    var radius = containerSize/perRow/2; //
    
    var diameter = radius * 2;
	var padding= 1;

    var hPos = radius, vPos = 0;
    var col=0, row=0;
    for (var i = 0; i < totalCount; i++) {
    	var flip = i % 2 !== 0;
    	
    	if(i % perRow ===0){
    		col++;
    		vPos = (diameter)*col;
    		hPos=radius;
    	}else{
    		hPos = (diameter)*i;
    	}

    	if(!flip){
    		hPos==radius;
    	}

    	console.log(i, flip, hPos, vPos)

    	ctx.beginPath();
	    ctx.arc(hPos, vPos, radius, startAngle, endAngle, flip);
	    ctx.closePath();
		ctx.fillStyle = '#e6e6e6';
		ctx.fill();
    };

})();