const TOTAL_POINTS = 12;
const SPEED = 12;

let points = [];

let record_distance;
let ang;
let best_ever;
let d;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // textSize(width / 25);
  fill(255);
  noStroke();
  for (let i = 0; i < TOTAL_POINTS; i++) {
    points.push(createVector(random(-width, width), random(-height, height), random(-(width + height) / 2, (width + height) / 2)));
  }
  record_distance = calcPathLength(points);
  best_ever = points.slice();
  ang = 0;
  console.log("Taveling Salesman Problem");
}

function draw() {
  background(0);
  // text("Traveling Salesman Problem", width / 7, width / 25);
  // text("Distance: " + round(record_distance), 0, height);

  translate(0, 0, -2500);

  rotateX(ang);
  rotateY(0.6 * ang);
  // rotateZ(1.3 * ang);

  for (let i = 0; i < SPEED; i++) {
    let swaps = [];
    let num_swaps = random(1, points.length);
    for (let j = 0; j < i; j++) {
      num_swaps = random(1, num_swaps);
    }
    for (let j = 0; j < num_swaps; j++) {
      swaps.push(floor(random(points.length)));
    }
    points = best_ever.slice();
    points = swap(points, swaps);

    d = calcPathLength(points);
    if (d < record_distance) {
      record_distance = d;
      best_ever = points.slice();
      console.log("Distance: " + round(record_distance));
    }
  }

  noFill();
  stroke(255, 255, 255, 102);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < points.length; i++) {
    vertex(points[i].x, points[i].y, points[i].z);
  }
  endShape(CLOSE);

  stroke(32, 255, 0, 204);
  strokeWeight(5);
  beginShape();
  for (let i = 0; i < best_ever.length; i++) {
    vertex(best_ever[i].x, best_ever[i].y, best_ever[i].z);
  }
  endShape(CLOSE);

  fill(255);
  noStroke();
  for (let point of points) {
    push();
    translate(point.x, point.y, point.z);
    sphere(10);
    pop();
  }

  if (d > record_distance) {
    points = best_ever.slice();
  }

  ang += 0.009;
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
    sum += dist(path[i].x, path[i].y, path[i].z, path[i + 1].x, path[i + 1].y, path[i + 1].z);
  }
  return sum;
}