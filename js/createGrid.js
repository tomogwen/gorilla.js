function createGrid() {
  // two has convenience methods to create shapes.
  var borderOne = two.makeRectangle(2*unit+x_offset, 2*unit+y_offset, length, length);
  var borderTwo = two.makeRectangle(7*unit+x_offset, 2*unit+y_offset, length, length);
  var borderThree = two.makeRectangle(12*unit+x_offset, 2*unit+y_offset, length,  length);

  var borderWidth = 5;
  var borderColour = "#806517";
  borderOne.linewidth = borderWidth;
  borderTwo.linewidth = borderWidth;
  borderThree.linewidth = borderWidth;
  borderOne.stroke = borderColour;
  borderTwo.stroke = borderColour;
  borderThree.stroke = borderColour;

  //var line = [];
  for(var i = 0; i < 2; i++) {
    var line_i = two.makeLine(x_offset + (i+1)*(1/3)*length, y_offset+length,
                              x_offset + (i+1)*(1/3)*length, y_offset );
  }
  for(var i = 0; i < 2; i++) {
    var line_i = two.makeLine(x_offset + 5*unit + (i+1)*(1/3)*length , y_offset+length,
                              x_offset + 5*unit + (i+1)*(1/3)*length, y_offset );
  }
  for(var i = 0; i < 2; i++) {
    var line_i = two.makeLine(x_offset + 10*unit + (i+1)*(1/3)*length , y_offset+length,
                              x_offset + 10*unit + (i+1)*(1/3)*length, y_offset );
  }

  for(var i = 0; i < 2; i++) {
    var line_i = two.makeLine(x_offset , y_offset + (i+1)*(1/3)*length,
                              x_offset + length, y_offset + (i+1)*(1/3)*length);
  }
  for(var i = 0; i < 2; i++) {
    var line_i = two.makeLine(x_offset + 5*unit , y_offset + (i+1)*(1/3)*length,
                              x_offset + 5*unit + length, y_offset + (i+1)*(1/3)*length);
  }
  for(var i = 0; i < 2; i++) {
    var line_i = two.makeLine(x_offset + 10*unit , y_offset + (i+1)*(1/3)*length,
                              x_offset + 10*unit + length, y_offset + (i+1)*(1/3)*length);
  }
}


function createHeatMap() {

  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      for(var k = 0; k < 3; k++) {
        position = coordToPos(i,j,k);
        heatmap[i][j][k] = two.makeRectangle(position[0], position[1] +length*1.2, length/3, length/3);
        var text = two.makeText(prob[i+1][j+1][k+1], position[0], position[1]+length*1.2, {
          alignment: 'center',
          weight: '500',
          fill: '#ffffff',
          size: '18'
        });
      }
    }
  }
}

function updateHeatMap() {
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      for(var k = 0; k < 3; k++) {
        var colour = 'rgba( ' + 15*gorillaHeatMap[i][j][k] + ', 0, 0, 0.75)';
        heatmap[i][j][k].fill = colour;
      }
    }
  }
}
