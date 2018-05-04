const TOTAL_POINTS = 12;
const SPEED = 10;

let points = [];

let record_distance;
let best_ever;
let d;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(width / 25);
  fill(255);
  noStroke();
  for (let i = 0; i < TOTAL_POINTS; i++) {
    points.push(createVector(random(width / 10, 9 * width / 10), random(height / 10, 9 * height / 10)));
  }
  record_distance = calcPathLength(points);
  best_ever = points.slice();
}

function draw() {
  background(0);
  text("Traveling Salesman Problem", width / 7, width / 25);
  text("Distance: " + round(record_distance), 0, height);

  for (let i = 0; i < SPEED; i++) {
    let swaps = [];
    let num_swaps = random(1, points.length);
    for (let j = 0; j < SPEED; j++) {
      num_swaps = random(1, num_swaps);
    }
    for (let j = 0; j < num_swaps; j++) {
      swaps.push(floor(random(points.length)));
    }
    points = swap(points, swaps);

    d = calcPathLength(points);
    if (d < record_distance) {
      record_distance = d;
      best_ever = points.slice();
    }
  }

  noFill();
  stroke(255, 255, 255, 102);
  strokeWeight(1.5);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y);
  }
  endShape(CLOSE);

  stroke(32, 255, 0, 204);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < best_ever.length; i++) {
    vertex(best_ever[i].x, best_ever[i].y);
  }
  endShape(CLOSE);

  fill(255);
  noStroke();
  for (let point of points) {
    ellipse(point.x, point.y, 12);
  }

  if (d > record_distance) {
    points = best_ever.slice();
  }
}

function swap(arr, indices) {
  let temp = arr[indices[0]];
  for (let i = 0; i < indices.length - 1; i++) {
    arr[indices[i]] = arr[indices[i + 1]];
  }
  arr[indices[indices.length - 1]] = temp;
  return arr;
}

function calcPathLength(path) {
  let sum = 0;
  for (let i = 0; i < path.length - 1; i++) {
    sum += dist(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
  }
  return sum;
}