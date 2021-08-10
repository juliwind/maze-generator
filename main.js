let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let final_resolution = 1

function recursiveDivision(maze, width, height, width_min, width_max, height_min, height_max) {
    if(width <= final_resolution || height <= final_resolution) {
        return maze;
    }
    let direction = selectDirection(width, height);
    if(direction == "horizontal") {
        let wallX = RandomNumberInRange(width_min, width_max);
    }
    else {
        let wallY = RandomNumberInRange(height_min, height_max);
    }
    
}

function selectDirection(width, height) {
    if(width < heigth) {
        return "horizontal";
    }
    else {
        return "vertical";
    }
}

function RandomNumberInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }