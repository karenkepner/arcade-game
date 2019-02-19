let score = 0;
let scorePost = document.querySelector('#score');


// Enemies our player must avoid
class Enemy {
    constructor(y) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.speed = Math.floor((Math.random() * 180) + (Math.random() * 142) + 80);
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.        
        this.x = this.x + this.speed * dt;
        //when the enemy travels off the screen, return it back to the start.
        if (this.x > 500) {
            this.x = -100;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-horn-girl.png';
        this.x = 200;
        this.y = 400;
        this.width = 50;
        this.height = 50;
    }

    update() {
        //detect collisions with enemy using bounding box test
        for (let enemy of allEnemies) {
            if (this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && this.y + this.height > enemy.y) {
                //collision occured! send player to starting point.
                this.x = 200;
                this.y = 315;
                //remove points if player has any.
                if (score > 5) {
                    score-= 5;
                }
            }
        }
        if (this.y === -25) {
            //return player to start
            this.x = 200;
            this.y = 400;
            //alert player that they won
            alert("you made it!");
            //give player points
            score+= 25;
        }
        scorePost.innerHTML = `Score: ${score}`;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if (key === 'left' && this.x > 20) {
            return this.x -= 100;
        } else if (key === 'up' && this.y >30) {
            this.y -= 85;
        } else if (key === 'right' && this.x < 400) {
            this.x += 100;
        } else if (key === 'down' && this.y < 400) {
            this.y += 85;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player =  new Player;

let allEnemies = [];

function makeEnemy(y) {
  let enemy = new Enemy(y);
  allEnemies.push(enemy);
}

makeEnemy(225);
makeEnemy(150);
makeEnemy(50);
makeEnemy(150);
makeEnemy(50);
makeEnemy(225);
makeEnemy(150);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
