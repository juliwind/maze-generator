const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let final_resolution = 1;
final_resolution = prompt("Enter your final resolution: ", );

init();
function init() {
    let field = new Array();
    for (i = 0; i < canvas.height / final_resolution; i++) {
        field.push(new Array());
        for (j = 0; j < canvas.width / final_resolution; j++) {
            field[i].push("0");
        }  
    }
    console.log(field);
    ctx.lineWidth = 2;
    start(field);
}

function start(field) {
    recursiveDivision(field, canvas.width, canvas.height, 0, canvas.width, 0, canvas.height);
}

function recursiveDivision(field, width, height, width_min, width_max, height_min, height_max) {
    //console.log(width, height)
    if(width <= final_resolution || height <= final_resolution) {
        return field;
    }
    let direction = selectDirection(width, height);
    let wallX = RandomNumberInRange(width_min, width_max);
    let wallY = RandomNumberInRange(height_min, height_max);
    drawWall(direction, width_min, width_max, height_min, height_max, wallX, wallY);

    if(direction == "horizontal") {
        recursiveDivision(field, width, height_min + wallY, width_min, width_max, height_min, wallY);
        recursiveDivision(field, width, height_max - wallY, width_min, width_max, wallY, height_max);
    }
    else if(direction == "vertical") {
        recursiveDivision(field, width_min + wallX, height, width_min, wallX, height_min, height_max);
        recursiveDivision(field, width_max - wallX, height, wallX, width_max, height_min, height_max);
    }

    
}
//!
//!
function drawWall(direction, w_min, w_max, h_min, h_max, wallX, wallY) { //w = width, h = height
    if(direction == "horizontal") {
        let door_coord_min = setDoorCoordinates(h_min, h_max);
        let door_coord_max = door_coord_min + final_resolution;
        ctx.beginPath();
        ctx.moveTo(w_min, wallY);
        ctx.lineTo(door_coord_min, wallY);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w_max, wallY);
        ctx.lineTo(door_coord_max, wallY);
        ctx.stroke();
    }
    else {
        let door_coord_min = setDoorCoordinates(w_min, w_max);
        let door_coord_max = door_coord_min + final_resolution;
        ctx.beginPath();
        ctx.moveTo(wallX, w_min);
        ctx.lineTo(wallX, door_coord_min);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(wallX, w_max);
        ctx.lineTo(wallX, door_coord_max);
        ctx.stroke();
    }

}

function selectDirection(width, height) {
    if(width < height) {
        return "horizontal";
    }
    else {
        return "vertical";
    }
}
function setDoorCoordinates(value_min, value_max) {
    value_max = value_max - final_resolution;
    let rNumber = RandomNumberInRange(value_min, value_max);
    return rNumber;
}
function RandomNumberInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rNumber = Math.floor(Math.random() * (max - min)) + min;
    return rNumber;
}

  /*

  */