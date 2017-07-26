// Gorillas

// define gorilla object
function gorillaObject(x,y,z) {
  this.coord = [x,y,z];
  this.pos = coordToPos(x,y,z);
  this.coordPrev = [x,y,z];
  this.posPrev = coordToPos(x,y,z);
  this.radius = 35;
  this.colour = '#' + Math.floor(Math.random()*16777215).toString(16);
} //*/


var prob = new Array();
for(var i = 0; i < 5; i++) {
  prob[i] = new Array;
  for(var j = 0; j < 5; j++) {
    prob[i][j] = new Array();
    for(var k = 0; k < 5; k++) {
      prob[i][j][k] = 0;
    }
  }
}
for(var i = 1; i < 4; i++) {
  for(var j = 1; j < 4; j++) {
    for(var k = 1; k < 4; k++) {
      prob[i][j][k] = Math.floor(10*Math.random()+1);
    }
  }
}
console.log(prob); //*/


function moveGorilla(i) {
  var x = gorilla[i].coord[0],
      y = gorilla[i].coord[1];
      z = gorilla[i].coord[2];
  var pos1 = prob[x+1][y][z+1],
      pos2 = prob[x][y+1][z+1],
      pos3 = prob[x+1][y+1][z+1],
      pos4 = prob[x+2][y+1][z+1],
      pos5 = prob[x+1][y+2][z+1],
      pos6 = prob[x+1][y+1][z],   // down
      pos7 = prob[x+1][y+1][z+2]; // up

  var total = pos1+pos2+pos3+pos4+pos5+pos6+pos7;

  var prob1 = pos1/total,
      prob2 = pos2/total,
      prob3 = pos3/total,
      prob4 = pos4/total,
      prob5 = pos5/total,
      prob6 = pos6/total,
      prob7 = pos7/total;

  prob2 += prob1;
  prob3 += prob2;
  prob4 += prob3;
  prob5 += prob4;
  prob6 += prob5;
  prob7 += prob6;

  var gorillaMind = Math.random();
  if(0 < gorillaMind && gorillaMind < prob1) {
      gorilla[i].coord[0] = x;
      gorilla[i].coord[1] = y-1;
  }
  else if (prob1 < gorillaMind && gorillaMind< prob2) {
      gorilla[i].coord[0] = x-1;
      gorilla[i].coord[1] = y;
  }
  else if (prob2 < gorillaMind && gorillaMind < prob3) {
      gorilla[i].coord[0] = x;
      gorilla[i].coord[1] = y;
  }
  else if (prob3 < gorillaMind && gorillaMind < prob4) {
      gorilla[i].coord[0] = x+1;
      gorilla[i].coord[1] = y;
  }
  else if (prob4 < gorillaMind && gorillaMind < prob5) {
      gorilla[i].coord[0] = x;
      gorilla[i].coord[1] = y+1;
  }
  else if (prob5 < gorillaMind && gorillaMind < prob6) {
      gorilla[i].coord[0] = x;
      gorilla[i].coord[1] = y;
      gorilla[i].coord[2] = z-1;
  }
  else if (prob6 < gorillaMind && gorillaMind < prob7) {
      gorilla[i].coord[0] = x;
      gorilla[i].coord[1] = y;
      gorilla[i].coord[2] = z+1;
  }

  gorilla[i].pos = coordToPos(gorilla[i].coord[0], gorilla[i].coord[1], gorilla[i].coord[2]);
} //*/


// work out relative co-ordinates of grid - layer 1
function coordToPos(x,y,z) {
  var pos = [];
  if(z == 0) {
    pos[0] = x_offset + (x+0.5)*(length/3);
    pos[1] = y_offset + (y+0.5)*(length/3);
    return pos;
  }
  else if(z == 1) {
    pos[0] = x_offset + 5*unit + (x+0.5)*(length/3);
    pos[1] = y_offset + (y+0.5)*(length/3);
    return pos;
  }
  else if(z == 2) {
    pos[0] = x_offset + 10*unit + (x+0.5)*(length/3);
    pos[1] = y_offset + (y+0.5)*(length/3);
    return pos;
  }
  //*/
}


// initialise two instance
var elem = document.getElementById('draw-shapes');
var params = { width: 1200, height: 800 };
var two = new Two(params).appendTo(elem);


// grid settings and creation
var x_max = 1100;
var y_max = 500;
var x_offset = 100;
var y_offset = 50;
var unit = (x_max-x_offset)/14;
var length = 4*unit;
createGrid();

var heatmap = new Array();
for(var i = 0; i < 3; i++) {
  heatmap[i] = new Array;
  for(var j = 0; j < 3; j++) {
    heatmap[i][j] = new Array();
    for(var k = 0; k < 3; k++) {
      heatmap[i][j][k] = 0;
    }
  }
}
createHeatMap();

var gorNum = 10;
var gorilla = [];
var gorillaCircle = [];

for(var i = 0; i < gorNum; i++) {
  gorilla[i] = new gorillaObject(1,1,1);
  gorilla[i].radius = 35 - 5*i
  // gorillaCircle[i] = two.makeCircle(gorilla[i].pos[0], gorilla[i].pos[1], 35 - 5*i);
  gorillaCircle[i] = generateGorilla(gorilla[i].pos[0], gorilla[i].pos[1], 0.5, gorilla[i].colour);
}

// generateGorilla(gorilla[i].pos[0], gorilla[i].pos[1], 0.5);
// generateGorilla(150, 150, 0.5);

var gorillaHeatMap = new Array();
for(var i = 0; i < 3; i++) {
  gorillaHeatMap[i] = new Array;
  for(var j = 0; j < 3; j++) {
    gorillaHeatMap[i][j] = new Array();
    for(var k = 0; k < 3; k++) {
      gorillaHeatMap[i][j][k] = 0;
    }
  }
}


// animation function
var frameCounter = 0;
var speed = 20;
two.bind('update', function(framecount) {
  // add animation stuff here
  two.clear()
  createGrid();
  createHeatMap();

  if(frameCounter == speed) {
    for(var i = 0; i < gorNum; i++) {
      gorillaHeatMap[ gorilla[i].coord[0] ][ gorilla[i].coord[1] ][ gorilla[i].coord[2] ] += 1;
      moveGorilla(i);
      gorillaCircle[i] = generateGorilla(gorilla[i].pos[0], gorilla[i].pos[1], 0.5, gorilla[i].colour);
    }
    frameCounter = 0;
  }

  // redraw monkeys
  for(var i = 0; i < gorNum; i++) {
    //var posX = gorilla[i].posPrev[0] + (gorilla[i].posPrev[0] - gorilla[i].pos[0])/speed * framecounter;
    //var posY = gorilla[i].posPrev[1] + (gorilla[i].posPrev[1] - gorilla[i].pos[1])/speed * framecounter;
    //gorillaCircle[i] = generateGorilla(posX, posY, 0.5, gorilla[i].colour);
  }
  updateHeatMap();

  frameCounter += 1;
}).play();
two.update();
