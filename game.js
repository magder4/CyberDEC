let cursor, Bottom, gorillaArms, monoWire, proLaun, mantisBlades;
let Background;
var cards = ["mW", "gA", "mB"];//pL
var all = ["mW", "gA", "mB", "pL"];
var gax, gay, mwx, mwy, plx, ply, mbx, mby;
var screenWidth = 1880; screenHeight = 840;
var playerTurn = true;
var i, j;
var temp, attackDelay, enemyAttackDelay;
var framesPassed = 0;
var pastAttack, playerDamage, playerHealth, enemyHealth;
function preload() {
    cursor = loadImage('cursor.png');
    Bottom = loadImage("Bottom.png");
    gorillaArms = loadImage("Gorilla Arms.png");
    monoWire = loadImage("monowire.png");
    proLaun = loadImage("projectile launcher.png");
    mantisBlades = loadImage("mantis blades.png");
    Background = loadImage("fightBackground.gif");
    Player = loadImage("player.gif");
    Enemy = loadImage("enemy.png");
    Slash = loadImage("slash.png");
    Zap = loadImage("zap.png");
    Punch = loadImage("punch.png");
    Explosion = loadImage("explosion.png");
    enemySlash = loadImage("enemySlash.png");
    enemyPunch = loadImage("enemyPunch.png");
    win = loadImage("win.png");
    lose = loadImage("lose.png");
}


function setup() {
    gay = 595;
    mwy = 595;
    ply = 595;
    mby = 595;
    pastAttack = "mB";
    createCanvas(screenWidth, screenHeight);
    cursor.resize(50,50);
    Bottom.resize(1880,840);
    Background.resize(2030,1021);
    gorillaArms.resize(150,229);
    monoWire.resize(150,229);
    mantisBlades.resize(150,229);
    proLaun.resize(150,229);
    Player.resize(500,402);
    Enemy.resize(250, 303);
    Slash.resize(250,250);
    enemySlash.resize(250,250);
    Explosion.resize(400,400);
    noCursor();
    lose.resize(screenWidth, screenHeight+600);
    win.resize(screenWidth, screenHeight+200);
    playerHealth = 100;
    enemyHealth = 100;
    playerDamage = 0;
    enemyDamage = 0;
  }

  function draw() {
    background(100);
    fill(255);
    noStroke();
    rectMode(CENTER);
    image(Background, 0, -290);
    image(Bottom, 0, 10);
    image(Player, 300, 215);
    image(Enemy, 1220, 270);
    drawHealthBars(100,110);
    drawCards();
    image(cursor, mouseX, mouseY);
    textSize(32);
    //text(enemyAttackDelay, 10, 40);
    if(playerTurn){
        cardHover();
    }
    framesPassed++;
    attackDelay++;
    enemyAttackDelay++;
    animateAttacks();
    enemyAttack();
    if(attackDelay > 50 && attackDelay < 100){
        playerTurn = false;
        enemyAttackDelay = 0;
        attackDelay = 150;
    }
    if(enemyAttackDelay > 50 && enemyAttackDelay < 100){
        playerTurn = true;
        enemyAttackDelay = 150;
    }
    checkWinner();
  }

  function animateAttacks(){
    if(attackDelay < 50){
        if(pastAttack.localeCompare("gA") == 0){
            image(Punch,1020,100);
        }

        if(pastAttack.localeCompare("mW") == 0){
            image(Zap,1230,80);
        }

        if(pastAttack.localeCompare("pL") == 0){
            image(Explosion,1230,80);
        }

        if(pastAttack.localeCompare("mB") == 0){
            image(Slash,1130,260);
        }

        enemyHealth -= playerDamage/50;
    }


  }

  function drawHealthBars(){
    fill(50,50,50); 
    rect(510, 230, 310, 30);
    fill(0,225,45); 
    rect(510-((300-playerHealth*3)/2), 230, playerHealth*3, 20);

    fill(50,50,50); 
    rect(1370, 230, 310, 30);
    fill(0,225,45); 
    rect(1370-((300-enemyHealth*3)/2), 230, enemyHealth*3, 20);


  }

  function cardHover(){
      if(mousething() == "gorillaArms"){
         if(gay > 560){
             gay -= 5;
         }   
      }else{
        if(gay < 595){
            gay += 5;
        }
      }

      if(mousething() == "mantisBlades"){
        if(mby > 560){
            mby -= 5;
        }   
     }else{
       if(mby < 595){
           mby += 5;
       }
     }

     if(mousething() == "proLaun"){
        if(ply > 560){
            ply -= 5;
        }   
     }else{
       if(ply < 595){
        ply += 5;
       }
     }

     if(mousething() == "monoWire"){
        if(mwy > 560){
            mwy -= 5;
        }   
     }else{
       if(mwy < 595){
        mwy += 5;
       }
     }
     
     
      
  }

  function drawCards(){
    for(i = 0; i < 3; i++){
        for(j = 0; j < 4; j++){
            if(j == 0){
                if(cards.indexOf("gA") == i){
                    gax = (screenWidth/4)*(i+1) - (gorillaArms.width/2);
                }
            }else if(j == 1){
                if(cards.indexOf("mB") == i){
                    mbx = (screenWidth/4)*(i+1) - (mantisBlades.width/2);
                }
            }else if(j == 2){
                if(cards.indexOf("pL") == i){
                    plx = (screenWidth/4)*(i+1) - (proLaun.width/2);
                }
            }else if(j == 3){
                if(cards.indexOf("mW") == i){
                    mwx = (screenWidth/4)*(i+1) - (monoWire.width/2);
                }
            }


        }
    }
    if(cards.indexOf("gA") != -1){
        image(gorillaArms, gax, gay);
    }
    if(cards.indexOf("mB") != -1){
        image(mantisBlades, mbx, mby);
    }
    if(cards.indexOf("pL") != -1){
        image(proLaun, plx, ply);
    }
    if(cards.indexOf("mW") != -1){
        image(monoWire, mwx, mwy);
    }
    
    
  }

  function missing(){
      for(i = 0; i < 4; i++){
          if(cards.indexOf(all[i]) == -1){
              return all[i];
          }
      } 
  }



  function attack(){
      temp = missing();
      attackDelay = 0;
    if(mousething() == "gorillaArms"){
        cards[cards.indexOf("gA")] = "null";
        pastAttack = "gA";
    }else if(mousething() == "monoWire"){
        cards[cards.indexOf("mW")] = "null";
        pastAttack = "mW";
    }else if(mousething() == "mantisBlades"){
        cards[cards.indexOf("mB")] = "null";
        pastAttack = "mB";
    }else if(mousething() == "proLaun"){
        cards[cards.indexOf("pL")] = "null";
        pastAttack = "pL";
    }

    if(pastAttack.localeCompare("gA") == 0){
        power = 783;
    }else if(pastAttack.localeCompare("mB") == 0){
        power = 601;
    }else if(pastAttack.localeCompare("mW") == 0){
        power = 669;
    }else if(pastAttack.localeCompare("pL") == 0){
        power = 704;
    }

    playerDamage = power/125 * Math.random()*(power/100);

    for(i = 0; i < 3; i++){
        if(cards[i] == "null")
        cards[i] = temp;
    }


  }

  function mousething(){
    if(mouseX >= gax && mouseX <= gax+gorillaArms.width && mouseY >= gay && mouseY <= gay + gorillaArms.height){
        return "gorillaArms";
    }else if(mouseX >= mbx && mouseX <= mbx+mantisBlades.width && mouseY >= mby && mouseY <= mby + mantisBlades.height){
        return "mantisBlades";
    }else if(mouseX >= plx && mouseX <= plx+proLaun.width && mouseY >= ply && mouseY <= ply + proLaun.height){
        return "proLaun";
    }else if(mouseX >= mwx && mouseX <= mwx+monoWire.width && mouseY >= mwy && mouseY <= mwy + monoWire.height){
        return "monoWire";
    }else{
        return "null";
    }
  }

  function mousePressed(){
      if(playerTurn == true && mousething().localeCompare("null") != 0){
      attack();
      randomNumberTime = Math.trunc(Math.random()*4+1);
      }
  }

  function enemyAttack(){
    if(playerTurn == false){
        if(randomNumberTime == 1){
            enemyAni("explode");
        }else if(randomNumberTime == 2){
            enemyAni("zap");
        }else if(randomNumberTime == 3){
            enemyAni("slash");
        }else if(randomNumberTime == 4){
            enemyAni("punch");
        }
    }
    enemyDamage = (Math.random()*50);
  }

  function enemyAni(type){
    
      if(playerTurn == false){
            if(enemyAttackDelay < 50){
        if(type.localeCompare("punch") == 0){
            image(enemyPunch,500,100);
        }

        if(type.localeCompare("zap") == 0){
            image(Zap,400,80);
        }

        if(type.localeCompare("explode") == 0){
            image(Explosion,400,180);
        }

        if(type.localeCompare("slash") == 0){
            image(enemySlash,500,260);
        }


        playerHealth -= enemyDamage/50;
        
    }
}

  }

  function checkWinner(){
      if(playerHealth < 0){
          image(lose,0,-300);
      }else if(enemyHealth < 0){
        image(win,0,0);
        playerHealth = 10000;
      }
  }

  