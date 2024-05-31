let gridSize = 10; // Define grid size as 10 pixels
let colors = ['#FFD700', '#FF0000', '#0000FF', '#D3D3D3', '#F5F5DC']; // Define Color Array
let specialCols; // Storage objects for special columns
let bigBlocks = []; // An array for storing large blocks
let grid = []; // An array for storing grid information
let hoverCell = null; // Mouse hovering cells
let noiseScale = 0.1; // Noise scaling factor
let startNoiseTime = 15000; // Starting noise effect in 15 seconds
let noiseStarted = false; // Does the sign start noise effect
let changeIndex = 0; // Index for controlling noise effects

function setup() {
  createCanvas(650, 690); 
  noStroke(); 
  specialCols = {
    1: getRandomSegments(), // Special line segment in column 1
    24: getRandomSegments(), // Special line segment in column 24
    37: getRandomSegments(), // Special line segment in column 37
    39: getRandomSegments() // Special line segment in column 39
  };

  // Initialize Grid
  for (let y = 0; y < height / 1.5; y += gridSize) {
    let row = [];
    for (let x = 0; x < width / 1.5; x += gridSize) {
      let colorIndex = 4; // Default Color Index
      if (isSpecialRow(y) || isSpecialCol(x)) {
        colorIndex = getRandomPrimaryColor(); // Main color for special rows or columns
      } else if (isSpecialRowSecond(y, x)) {
        colorIndex = getRandomSecondaryColor(); // Special secondary row secondary color
      } else if (isSpecialColThird(x, y)) {
        colorIndex = getRandomTertiaryColor(x, y); // Special three-level column with three colors
      }
      row.push({ x, y, colorIndex, isModified: false }); // Store cell information
    }
    grid.push(row); // Add rows to grid
  }

  // Set a timer to start the noise effect after 15 seconds
  setTimeout(() => {
    noiseStarted = true;
  }, startNoiseTime);

  drawGrid(); 
  drawBigBlocks(); 
  drawSmallBlocks(); 
}

function draw() {
  if (noiseStarted) {
    drawGridWithNoise(); // Draw a grid with noisy effects
  } else {
    drawGrid(); 
  }
  drawBigBlocks(); 
  drawSmallBlocks(); 
}

function drawGrid() {
  for (let row of grid) {
    for (let cell of row) {
      fill(colors[cell.colorIndex]); // Set fill color
      rect(cell.x, cell.y, gridSize, gridSize); 
    }
  }

  if (hoverCell) {
    stroke(0); // Set the border color to black when hovering
    strokeWeight(2); // Set the grid border width to 2 pixels when hovering
    fill(colors[hoverCell.colorIndex]); 
    rect(hoverCell.x, hoverCell.y, gridSize, gridSize); // Draw hovering cells
    noStroke(); // Do not draw borders
  }
}

function drawGridWithNoise() {
  let numCells = grid.length * grid[0].length; // Calculate the total number of cells
  let cellIndex = 0; // Initialize cell index

  for (let row of grid) {
    for (let cell of row) {
      if (cellIndex < changeIndex) {
        if (!cell.isModified) {
          let noiseVal = noise(cell.x * noiseScale, cell.y * noiseScale); // Calculate noise value
          let colorIndex = floor(noiseVal * colors.length); // Map noise values to color indices
          fill(colors[colorIndex]); 
        } else {
          fill(colors[cell.colorIndex]); // Use modified colors
        }
      } else {
        fill(colors[cell.colorIndex]); // Use original colors
      }
      rect(cell.x, cell.y, gridSize, gridSize); // Draw cell rectangle
      cellIndex++; // Increase cell index
    }
  }

  if (frameCount % 10 === 0 && changeIndex < numCells) { // Control the speed of change
    changeIndex++;
  }

  if (hoverCell) {
    stroke(0); 
    strokeWeight(2); 
    fill(colors[hoverCell.colorIndex]); 
    rect(hoverCell.x, hoverCell.y, gridSize, gridSize); 
    noStroke(); 
  }
}

function drawBigBlocks() {
  let colors = ['#FF0000', '#FDFD96', '#0000FF']; 
  for (let i = 0; i < bigBlocks.length; i++) {
    let block = bigBlocks[i];
    fill(block.color); 
    rect(block.x * gridSize, block.y * gridSize, block.w * gridSize, block.h * gridSize); 
  }
}

function drawSmallBlocks() {
  let selectedBlocks = shuffle(bigBlocks).slice(0, 9); // Randomly select 9 large blocks
  selectedBlocks.forEach(block => {
    let smallWidth = block.w * 2 / 5; // Small block width
    let smallHeight = block.h * 2 / 5; // height
    let smallX = block.x + (block.w - smallWidth) / 2; // x-position
    let smallY = block.y + (block.h - smallHeight) / 2; // y-position

    let otherColors = ['#FF0000', '#FDFD96', '#0000FF'].filter(c => c !== block.color); // Choose another color different from the color of the large square
    let smallColor = random(otherColors); // Randomly select a color
    fill(smallColor); // Set Fill Color
    rect(smallX * gridSize, smallY * gridSize, smallWidth * gridSize, smallHeight * gridSize); // Draw small squares
  });
}

function isSpecialRow(y) {
  let row = y / gridSize;
  return [1, 8, 21, 27, 30, 42, 47].includes(row); // Determine if it is a special row
}

function isSpecialRowSecond(y, x) {
  let row = y / gridSize;
  let col = x / gridSize;
  if ([33, 38, 44].includes(row)) {
    return col < 3; // Determine if it is a special secondary row
  }
  return false;
}

function isSpecialCol(x) {
  let col = x / gridSize;
  return [3, 6, 11, 22, 35, 41].includes(col); // Determine if it is a special column
}

function isSpecialColThird(x, y) {
  let col = x / gridSize;
  return [1, 24, 37, 39].includes(col); // Determine if it is a special third level column
}

function getRandomPrimaryColor() {
  let rnd = random(100);
  if (rnd < 70) {
    return 0; // Yellow
  } else if (rnd < 80) {
    return 1; // Red
  } else if (rnd < 90) {
    return 2; // Blue
  } else {
    return 3; // Gray
  }
}

function getRandomSecondaryColor() {
  let rnd = random(100);
  if (rnd < 66) {
    return 0; // Yellow
  } else if (rnd < 100) {
    return Math.floor(random(1, 4)); // Random between Red, Blue, Gray
  }
}

function getRandomTertiaryColor(x, y) {
  let col = x / gridSize;
  let row = y / gridSize;

  if (specialCols[col] && specialCols[col].includes(row)) {
    let rnd = random(100);
    if (rnd < 60) {
      return 0; // Yellow
    } else {
      return Math.floor(random(1, 4)); // Random between Red, Blue, Gray
    }
  }
  return 4; // Skin color
}

function getRandomSegments() {
  let positions = [];
  while (positions.length < 24) {
    let segmentLength = random(10, 15); // The length of a random segment
    let segmentStart = Math.floor(random(49 - segmentLength)); // Starting position of segment
    for (let i = 0; i < segmentLength; i++) {
      if (positions.length < 24 && !positions.includes(segmentStart + i)) {
        positions.push(segmentStart + i); // Add position in paragraph
      }
    }
  }
  return positions;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap array elements
  }
  return array;
}

function mouseMoved() {
  let row = floor(mouseY / gridSize); // Calculate the row where the mouse is located
  let col = floor(mouseX / gridSize); // Calculate the column where the mouse is located
  if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
    hoverCell = grid[row][col]; // Set hovering cells
  } else {
    hoverCell = null; // If the mouse is not within the grid, hovering cells will be null
  }
  if (!noiseStarted) {
    drawGrid(); // If the noise effect has not started, redraw the grid
  }
}

function keyPressed() {
  if ((key === 'A' || key === 'a') && hoverCell) {
    hoverCell.colorIndex = floor(random(4)); // Randomly change the color of hovering cells to one of Red, Yellow, Blue, Gray
    hoverCell.isModified = true; // Mark as manual modification
    if (!noiseStarted) {
      drawGrid(); // If the noise effect has not started, redraw the grid
    }
  }
}
