var pg, imgField, imgField6, imgField9, imgFieldKeys, rotateKeys, orOctane, blOctane, orDominus, blDominus, orBatmob, blBatmob, ball, penOn, penOff, reset, title, signature, orange, blue, penColor, penWeight;
var drawMode = false;
var things = []; //array for the objects (cars and ball)
var field = 1; //variable to define the grid template over the field
var help = true; //variable that display instructions on screen

//Class for the objects (cars and ball) used within the drawboard.
class Thing {
	constructor(x,y,img) {
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.img = img;
    this.select = false;
	}
//function to display it on screen.
  display() {
    push();
    translate(this.x, this.y)
    rotate(this.angle);
    image(this.img, 0, 0);
    pop();
  }
}

//function that loads all images in the app
function preload() {
  imgField = loadImage("assets/field.png");
	imgField6 = loadImage("assets/field6.png");
	imgField9 = loadImage("assets/field9.png");
	imgFieldKeys = loadImage("assets/fieldgridkeys.png");
	rotateKeys = loadImage("assets/rotate.png");
  ball = loadImage("assets/ball.png");
  orOctane = loadImage("assets/orange_octane.png");
  orDominus = loadImage("assets/orange_dominus.png");
  orBatmob = loadImage("assets/orange_batmobile.png");
  blOctane = loadImage("assets/blue_octane.png");
  blDominus = loadImage("assets/blue_dominus.png");
  blBatmob = loadImage("assets/blue_batmobile.png");
  penOn = loadImage("assets/pen_on.png");
  penOff = loadImage("assets/pen_off.png");
  reset = loadImage("assets/reset.png");
	title = loadImage("assets/title.png");
	signature = loadImage("assets/signature.png");
}

//defines the workspace
function setup() {
  createCanvas(windowWidth, windowHeight);
  orange = color('#f15a24');
  blue = color('#0071bc');
	penColor = color(0); //Brush default color
	penWeight = 4; //Brush default windowHeight
	pg = createGraphics(windowWidth, windowHeight);
  imageMode(CENTER);
  angleMode(DEGREES);
  strokeWeight(0);
  frameRate(60);
}

//function that actually display stuff on screen. Refreshes every frame.
function draw() {
	fill(blue);
	rect(0,0,windowWidth/2,windowHeight);
	fill(orange);
	rect(windowWidth/2,0,windowWidth/2,windowHeight);
	fill(180);
	rect(0,0, 150, windowHeight);
	if (field === 2) image(imgField6,windowWidth/2,windowHeight/2);
	else if (field === 3) image(imgField9,windowWidth/2,windowHeight/2);
	else image(imgField,windowWidth/2,windowHeight/2);
	if (!drawMode) image(penOff, 50, windowHeight/2-340);
  else image(penOn, 50, windowHeight/2-340);
	push();
	strokeWeight(1);
	stroke(120);
	line(20, windowHeight/2-390, 130, windowHeight/2-390);
	line(20, windowHeight/2-165, 130, windowHeight/2-165);
	line(20, windowHeight/2+185, 130, windowHeight/2+185);
	fill(0);
	ellipse(30, windowHeight/2-280, 20, 20);
	fill(255, 30, 30);
	ellipse(57, windowHeight/2-280, 20, 20);
	fill(30, 255, 30);
	ellipse(84, windowHeight/2-280, 20, 20);
	fill(255);
	ellipse(115, windowHeight/2-280, 30, 30);
	fill('rgba(255, 30, 30, 0.50)');
	ellipse(45, windowHeight/2-230, 45, 45);
	fill('rgba(30, 255, 30, 0.50)');
	ellipse(105, windowHeight/2-230, 45, 45);
	pop();
	image(reset, 100, windowHeight/2-340);
	image(ball, 75, windowHeight/2-120);
  image(blOctane, 50, windowHeight/2-60);
  image(orOctane, 100, windowHeight/2-60);
  image(blDominus, 50, windowHeight/2);
  image(orDominus, 100, windowHeight/2);
  image(blBatmob, 50, windowHeight/2+65);
  image(orBatmob, 100, windowHeight/2+65);
	image(rotateKeys, 75, windowHeight/2+140);
	image(imgFieldKeys, 75, windowHeight/2+310);
	image(title, 75, 60);
	fill(50);
	textSize(10);
	text("created by s0nera • v0.2.1", 15, windowHeight-20);
	image(pg, windowWidth/2, windowHeight/2);
	for (var i = 0; i < things.length; i++) {
			things[i].display();
	}
	if (help) { // This draw the instructions
		push();
		fill(0);
		rect(150, windowHeight/2-380, 300, 140);
		rect(150, windowHeight/2-145, 300, 220);
		rect(150, windowHeight/2+200, 300, 65);
		rect(150, windowHeight/2+385, 300, 70);
		rect(windowWidth/2, windowHeight/2-220, 200, 50);
		rect(windowWidth/2, windowHeight/2-350, 230, 50);
		fill(255);
		textSize(12);
		text("Click the pen icon to turn Draw Mode on and off, drag the mouse over the screen to draw.", 160, windowHeight/2-370, 280, 30);
		text("Click on the 'refresh' icon to erase your drawing.", 160, windowHeight/2-320);
		text("The circles are brush presets. The white slightly bigger one is an 'eraser', and the bigger green and red ones are highlighters with low opacity.", 160, windowHeight/2-300, 280, 70);
		text("Click on the ball icon to spawn a ball on the center of the field. Clicking this icon again will reset the ball position to the center of the field (useful for kick offs).", 160, windowHeight/2-135, 280, 100);
		text("Click and drag cars directly from the side bar to the field. Use keyboard arrow keys, left and right, to rotate the cars (it will rotate the last car you clicked or dragged).", 160, windowHeight/2-60, 280, 100);
		text("Use the keyboard keys 1, 2 or 3 to place a grid over the field, dividing it in 6 or 9 zones (often used in youtube tutorials on rotation and positioning).", 160, windowHeight/2+210, 280, 60);
		text("Refresh the browser if you get stuck or have any other problem. Press H if you want to see these tips again.", 160, windowHeight/2+400, 280, 60);
		text("This is the field. The yellow marks are the boost locations.", windowWidth/2+10, windowHeight/2-210, 180, 40);
		text("This grey area around the field represents the walls and backboards.", windowWidth/2+10, windowHeight/2-340, 210, 40);
		fill(255,50,50);
		text("Do not stack cars or they will be stuck together.", 160, windowHeight/2+25);
		text("It's not possible to drag the cars in Draw Mode.", 160, windowHeight/2+50);
		pop();
	}
}

//Function for keyboard hotkeys
function keyPressed() {
	if (key === 'h') help = !help;
	if (key === 'e') pg = createGraphics(windowWidth, windowHeight);
  if (key === 'd') drawMode = !drawMode;
	if (key === '1') field = 1;
	if (key === '2') field = 2;
	if (key === '3') field = 3;
  if (keyCode === RIGHT_ARROW) {
    for (var i = 0; i < things.length; i++) {
      if (things[i].select) {
        things[i].angle += 30;
      }
    }
  }
  if (keyCode === LEFT_ARROW) {
    for (var i = 0; i < things.length; i++) {
      if (things[i].select) {
        things[i].angle -= 30;
      }
    }
  }
}

//function for selecting tools and items on screen
function mousePressed() {
	help = false;
	if (mouseX > 50-23 && mouseX < 50+23 && mouseY > windowHeight/2-340-23 && mouseY < windowHeight/2-340+23) {
    drawMode = !drawMode;
  } else if (mouseX > 100-23 && mouseX < 100+23 && mouseY > windowHeight/2-340-23 && mouseY < windowHeight/2-340+23) {
		pg = createGraphics(windowWidth, windowHeight);
	} else if (mouseY > windowHeight/2-280-15 && mouseY < windowHeight/2-280+15) {
		if (mouseX > 20 && mouseX < 40) {
			penColor = color(0);
			penWeight = 4;
		} else if (mouseX > 47 && mouseX < 67) {
			penColor = color(255, 30, 30);
			penWeight = 4;
		} else if (mouseX > 74 && mouseX < 94) {
			penColor = color(30, 255, 30);
			penWeight = 4;
		} else if (mouseX > 100 && mouseX < 130) {
			penColor = color(255);
			penWeight = 20;
		}
	} else if (mouseY > windowHeight/2-230-22 && mouseY < windowHeight/2-230+22) {
		if (mouseX > 45-22 && mouseX < 45+22) {
			penColor = color('rgba(255, 30, 30, 0.10)');
			penWeight = 48;
		} else if (mouseX > 105-22 && mouseX < 105+22) {
			penColor = color('rgba(30, 255, 30, 0.10)');
			penWeight = 48;
		}
	} else if (mouseX > 75-23 && mouseX < 75+23 && mouseY > windowHeight/2-120-20 && mouseY < windowHeight/2-120+20) {
		var ifBall = false;
		for (var i = 0; i < things.length; i++) {
			if (things[i].img == ball) {
				things[i].x = windowWidth/2;
				things[i].y = windowHeight/2;
				ifBall = true;
				break;
			}
		}
		if (!ifBall) { // this one spawn the ball
			things.push(new Thing(windowWidth/2, windowHeight/2, ball));
		}
  } else if (mouseX > 50-20 && mouseX < 50+20) { 		// these spawn the blue cars
    if (mouseY > windowHeight/2-80 && mouseY < windowHeight/2-40) {
      things.push(new Thing(mouseX, mouseY, blOctane));
    } else if (mouseY > windowHeight/2-20 && mouseY < windowHeight/2+20) {
      things.push(new Thing(mouseX, mouseY, blDominus));
    } else if (mouseY > windowHeight/2+45 && mouseY < windowHeight/2+85) {
      things.push(new Thing(mouseX, mouseY, blBatmob));
    }
  } else if (mouseX > 100-20 && mouseX < 100+20) {		// these spawn the orange cars
    if (mouseY > windowHeight/2-80 && mouseY < windowHeight/2-40) {
      things.push(new Thing(mouseX, mouseY, orOctane));
    } else if (mouseY > windowHeight/2-20 && mouseY < windowHeight/2+20) {
      things.push(new Thing(mouseX, mouseY, orDominus));
    } else if (mouseY > windowHeight/2+45 && mouseY < windowHeight/2+85) {
      things.push(new Thing(mouseX, mouseY, orBatmob));
    }
	}
	if (!drawMode) { //Activates draw mode
    for (var i = 0; i < things.length; i++) {
      if (dist(mouseX, mouseY, things[i].x, things[i].y) < 20) {
        things[i].select = true;
      } else {
        things[i].select = false;
      }
    }
  }
}

//function to drag stuff around
function mouseDragged() {
  if (drawMode) {
    push();
    pg.stroke(penColor);
    pg.strokeWeight(penWeight);
    pg.line(mouseX, mouseY, pmouseX, pmouseY);
    pop();
  } else if (!drawMode) {
    for (var i = 0; i < things.length; i++) {
      if (things[i].select) {
        things[i].x = mouseX;
        things[i].y = mouseY;
      }
    }
  }
}

//function to resize the canvas if resizing thw window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
