let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 10; i++) {
    points.push(createVector(random(width / 10, 9 * width / 10), random(height / 10, 9 * height / 10)));
  }
}

function draw() {
  background(0);
  for (let point of points) {
    ellipse(point.x, point.y, 25);
  }
}