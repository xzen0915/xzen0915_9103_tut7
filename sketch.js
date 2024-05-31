let gridSize = 10;
let colors = ['#FFD700', '#FF0000', '#0000FF', '#D3D3D3', '#F5F5DC'];
let specialCols;
let bigBlocks = [];
let grid = [];
let hoverCell = null;
let noiseScale = 0.1;
let startNoiseTime = 15000; // 15 seconds
let noiseStarted = false;
let changeIndex = 0;

function setup() {
  createCanvas(650, 690);
  noStroke();
  specialCols = {
    1: getRandomSegments(),
    24: getRandomSegments(),
    37: getRandomSegments(),
    39: getRandomSegments()
  };

  for (let y = 0; y < height / 1.5; y += gridSize) {
    let row = [];
    for (let x = 0; x < width / 1.5; x += gridSize) {
      let colorIndex = 4; // Default color
      if (isSpecialRow(y) || isSpecialCol(x)) {
        colorIndex = getRandomPrimaryColor();
      } else if (isSpecialRowSecond(y, x)) {
        colorIndex = getRandomSecondaryColor();
      } else if (isSpecialColThird(x, y)) {
        colorIndex = getRandomTertiaryColor(x, y);
      }
      row.push({ x, y, colorIndex, isModified: false });
    }
    grid.push(row);
  }

  setTimeout(() => {
    noiseStarted = true;
  }, startNoiseTime);

  drawGrid();
  drawBigBlocks();
  drawSmallBlocks();
}

function draw() {
  if (noiseStarted) {
    drawGridWithNoise();
  } else {
    drawGrid();
  }
  drawBigBlocks(); // 保留大方块
  drawSmallBlocks(); // 保留小方块
}

function drawGrid() {
  for (let row of grid) {
    for (let cell of row) {
      fill(colors[cell.colorIndex]);
      rect(cell.x, cell.y, gridSize, gridSize);
    }
  }

  if (hoverCell) {
    stroke(0);
    strokeWeight(2);
    fill(colors[hoverCell.colorIndex]);
    rect(hoverCell.x, hoverCell.y, gridSize, gridSize);
    noStroke();
  }
}

function drawGridWithNoise() {
  let numCells = grid.length * grid[0].length;
  let cellIndex = 0;

  for (let row of grid) {
    for (let cell of row) {
      if (cellIndex < changeIndex) {
        if (!cell.isModified) {
          let noiseVal = noise(cell.x * noiseScale, cell.y * noiseScale);
          let colorIndex = floor(noiseVal * colors.length); // 将噪声值映射到颜色索引
          fill(colors[colorIndex]);
        } else {
          fill(colors[cell.colorIndex]);
        }
      } else {
        fill(colors[cell.colorIndex]);
      }
      rect(cell.x, cell.y, gridSize, gridSize);
      cellIndex++;
    }
  }

  if (frameCount % 10 === 0 && changeIndex < numCells) { // 控制变化速度
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
  let colors = ['#FF0000', '#FDFD96', '#0000FF']; // Red, Yellow, Blue
  for (let i = 0; i < bigBlocks.length; i++) {
    let block = bigBlocks[i];
    fill(block.color);
    rect(block.x * gridSize, block.y * gridSize, block.w * gridSize, block.h * gridSize);
  }
}

function drawSmallBlocks() {
  let selectedBlocks = shuffle(bigBlocks).slice(0, 9);
  selectedBlocks.forEach(block => {
    let smallWidth = block.w * 2 / 5;
    let smallHeight = block.h * 2 / 5;
    let smallX = block.x + (block.w - smallWidth) / 2;
    let smallY = block.y + (block.h - smallHeight) / 2;

    let otherColors = ['#FF0000', '#FDFD96', '#0000FF'].filter(c => c !== block.color);
    let smallColor = random(otherColors);
    fill(smallColor);
    rect(smallX * gridSize, smallY * gridSize, smallWidth * gridSize, smallHeight * gridSize);
  });
}

function isSpecialRow(y) {
  let row = y / gridSize;
  return [1, 8, 21, 27, 30, 42, 47].includes(row);
}

function isSpecialRowSecond(y, x) {
  let row = y / gridSize;
  let col = x / gridSize;
  if ([33, 38, 44].includes(row)) {
    return col < 3;
  }
  return false;
}

function isSpecialCol(x) {
  let col = x / gridSize;
  return [3, 6, 11, 22, 35, 41].includes(col);
}

function isSpecialColThird(x, y) {
  let col = x / gridSize;
  return [1, 24, 37, 39].includes(col);
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
    let segmentLength = random(10, 15);
    let segmentStart = Math.floor(random(49 - segmentLength));
    for (let i = 0; i < segmentLength; i++) {
      if (positions.length < 24 && !positions.includes(segmentStart + i)) {
        positions.push(segmentStart + i);
      }
    }
  }
  return positions;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mouseMoved() {
  let row = floor(mouseY / gridSize);
  let col = floor(mouseX / gridSize);
  if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length) {
    hoverCell = grid[row][col];
  } else {
    hoverCell = null;
  }
  if (!noiseStarted) {
    drawGrid();
  }
}

function keyPressed() {
  if ((key === 'A' || key === 'a') && hoverCell) {
    hoverCell.colorIndex = floor(random(4)); // Change color to random of Red, Yellow, Blue, Gray
    hoverCell.isModified = true; // 标记为手动修改
    if (!noiseStarted) {
      drawGrid();
    }
  }
}
