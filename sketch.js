let player;
let harmony = 50;
let fragments = [];

function setup() {
  createCanvas(800, 400);
  player = createVector(width / 2, height / 2);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  generateFragments();
}

function draw() {
  drawWorldBackground();

  // Fragmentos
  for (let f of fragments) {
    if (!f.collected) {
      fill(f.color, 80, 100);
      ellipse(f.x, f.y, 12 + sin(frameCount * 0.1 + f.x) * 5);
      
      if (dist(player.x, player.y, f.x, f.y) < 15) {
        f.collected = true;
        harmony += 10;
      }
    }
  }

  // Jogador
  fill(0, 0, 100);
  ellipse(player.x, player.y, 20 + sin(frameCount * 0.2) * 5);

  handleMovement();
  updateHarmony();
  displayHUD();
}

function drawWorldBackground() {
  // Dinamicamente desenha os dois mundos
  for (let x = 0; x < width; x += 20) {
    let t = map(x, 0, width, 0, 1);
    let hue = lerp(100, 220, t);
    let sat = 60 + sin(frameCount * 0.01 + x * 0.05) * 20;
    let bri = 90 + cos(frameCount * 0.02 + x * 0.05) * 10;
    fill(hue, sat, bri);
    rect(x, 0, 20, height);
  }

  // Campo (formas orgânicas)
  for (let i = 0; i < 5; i++) {
    fill(120, 80, 80, 0.2);
    ellipse(i * 150 + 50, height - 50 + sin(frameCount * 0.03 + i) * 10, 80, 60);
  }

  // Cidade (formas geométricas)
  for (let i = 0; i < 6; i++) {
    let h = sin(frameCount * 0.05 + i) * 20 + 100;
    fill(220, 50, 70, 0.3);
    rect(width - i * 120 - 60, height - h, 40, h + 60);
  }
}

function handleMovement() {
  if (keyIsDown(65)) player.x -= 2; // A
  if (keyIsDown(68)) player.x += 2; // D
  if (keyIsDown(87)) player.y -= 2; // W
  if (keyIsDown(83)) player.y += 2; // S

  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

function generateFragments() {
  for (let i = 0; i < 12; i++) {
    fragments.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      color: random(0, 360),
      collected: false
    });
  }
}

function updateHarmony() {
  // Se o jogador estiver muito à esquerda ou direita, a harmonia decresce
  if (player.x < width * 0.25 || player.x > width * 0.75) {
    harmony -= 0.1;
  } else {
    harmony += 0.02;
  }

  harmony = constrain(harmony, 0, 100);

  if (harmony <= 0) {
    noLoop();
    background(0);
    fill(0, 0, 100);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Desequilíbrio alcançado. Reinicie sua jornada.", width / 2, height / 2);
  }
}

function displayHUD() {
  fill(0, 0, 0, 0.5);
  rect(10, 10, 100, 15);
  fill(60, 100, 100);
  rect(10, 10, harmony, 15);
  fill(0);
  textSize(12);
  text("Harmonia", 10, 35);
}
