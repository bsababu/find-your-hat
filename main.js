const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{

    constructor(field = [[]]) {
        this.field = field;
        this.x_location = 0;
        this.y_location = 0;
        this.field[0][0] = pathCharacter;
    }
    //Static generate function for the board
    static generateField(height, width, percentage) {
        let field = new Array(height);
        for (let i = 0; i < field.length; i++) {
        field[i] = new Array(width);
        }
        for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            const rand = Math.random();
            field[i][j] = rand > percentage ? fieldCharacter : hole;
        }
        }
        //Place the hat at a starting random location
        const hatLocation = {
        xx: Math.floor(Math.random() * width),
        yy: Math.floor(Math.random() * height),
        };

        field[hatLocation.yy][hatLocation.xx] = hat;
        return field;
    }

    //Start playing the game
    startEngine() {
        let playing = true;
        while (playing) {
          this.print();
          this.startPlay();
          if (!this.isInBounds()) {
            console.log("Whoops. off limits");
            playing = false;
            break;
          } else if (this.isHole()) {
            console.log("Sorry, you and hole are buddies now - ⛳");
            playing = false;
            break;
          } else if (this.isHat()) {
            console.log("Awwwe, time to put on your hat! - 🏆");
            playing = false;
            break;
          }
          
          this.field[this.y_location][this.x_location] = pathCharacter; // updating the board
        }
      }

      // Initiate the game with the user's moves
      startPlay() {
        const answer = prompt("Which way would you like to move? (Up = 'U' Down = 'D' Left = 'L' Right = 'R' x = 'Exit'--> ").toLowerCase();
        switch (answer) {
          case "u":
            this.y_location -= 1;
            break;
          case "d":
            this.y_location += 1;
            break;
          case "l":
            this.x_location -= 1;
            break;
          case "r":
            this.y_location += 1;
            break;
        case "x":
           return false;
            break;
        default:
        console.log("bad choice, try again");
        this.startPlay();
        break;
        }
      }
      //Checking if the keys aren't out of the board
      isInBounds() {
        return (
          this.y_location >= 0 &&
          this.x_location >= 0 &&
          this.y_location < this.field.length &&
          this.x_location < this.field[0].length
        );
      }
      //If payer found the hat
      isHat() {
        return this.field[this.y_location][this.x_location] === hat;
      }
      //If the player got in hole -
      isHole() {
        return this.field[this.y_location][this.x_location] === hole;
      }
      //Print the board
      print() {
        const displayString = this.field
          .map((row) => {
            return row.join(" ");
          })
          .join("\n");
        console.log(displayString);
      }
}

let height = prompt('what is your board height?');
let width = prompt('what is your board width?');
percentag = 0.2;
const boardMap = Field.generateField(Number(height), Number(width), Number(percentag));
const newField = new Field(boardMap);
newField.startEngine();