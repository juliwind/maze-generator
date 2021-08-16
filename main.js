const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const final_resolution = prompt("Enter your final resolution: ", );

function start() {
    let field = [];
    let y = canvas.height / final_resolution;
    if (y % 2 == 1) {
        y++;
    }
    let x = canvas.width / final_resolution;
    if (x % 2 == 1) {
        x++
    }
    for (i = 0; i < y; i++) {
        field.push(new Array());
        for (j = 0; j < x; j++) {
            field[i].push("0");
        }  
    }
    let horizontal = isHorizontal(field.length, field[0].length);

    boarder(field)
    recursiveDivision(field, horizontal, 1, field[0].length - 2, 1, field.length - 2);
    draw(field);
}

function recursiveDivision(field, horizontal, min_x, max_x, min_y, max_y) {
    if (horizontal) {
        if (max_x - min_x < 2) {
            return;
        }
        let random_y = RandomNumberInRange(min_y, max_y - 1)
        if (random_y % 2 == 1) {
            random_y++;
        }
        horizontalWall(min_x, max_x, random_y, field);
        let dir_1 = isHorizontal(max_x - min_x, (random_y - 1) - min_y);
        let dir_2 = isHorizontal(max_x - min_x, max_y - (random_y + 1));
        recursiveDivision(field, dir_1, min_x, max_x, min_y, random_y - 1);
        recursiveDivision(field, dir_2, min_x, max_x, random_y + 1, max_y);
    }
    else {
        if (max_y - min_y < 2) {
            return;
        }
        let random_x = RandomNumberInRange(min_x, max_x - 1)
        if (random_x % 2 == 1) {
            random_x++;
        }
        verticalWall(min_y, max_y, random_x, field);
        let dir_3 = isHorizontal((random_x - 1) - min_x, max_y - min_y);
        let dir_4 = isHorizontal(max_x - (random_x + 1), max_y - min_y);
        recursiveDivision(field, dir_3, min_x, random_x - 1, min_y, max_y);
        recursiveDivision(field, dir_4, random_x + 1, max_x, min_y, max_y);
    }
}

function horizontalWall(min_x, max_x, y, field) {
    let door = RandomNumberInRange(min_x, max_x - 1);
    if (door % 2 == 0) {
        door++;
    }
    for (let x = min_x; x <= max_x; x++) {
        if (x != door) {
            field[y][x] = "w";
        }
        else {
            field[y][x] = "0";
        }
    }
}

function verticalWall(min_y, max_y, x, field) {
    let door = RandomNumberInRange(min_y, max_y - 1);
    if (door % 2 == 0) {
        door++;
    }
    for (let y = min_y; y <= max_y; y++) {
        if (y != door) {
            field[y][x] = "w";
        }
        else {
            field[y][x] = "0";
        }
    }
}

function isHorizontal(width, height) {
    if(width < height) {
        return true;
    }
    else {
        return false;
    }
}

function boarder(field) {
    for (i = 0; i < field.length; i++) {
        if (i == 0 || i == field.length - 1) {
            for (j = 0; j < field[0].length; j++) {
                field[i][j] = "w";
            }
        }
        else {
            field[i][field[0].length - 1] = "w";
            field[i][0] = "w";
        }
    }
}

function draw(field) {
    for (i = 0; i < field.length; i++) {
        for (j = 0; j < field[0].length; j++) {
            let x = final_resolution * j;
            let y = final_resolution * i;
            switch (field[i][j]) {
                case "w":
                    ctx.beginPath();
                    ctx.fillRect(x, y, final_resolution, final_resolution);
                    break;
            }
        }
    }
}

function RandomNumberInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rNumber = Math.floor(Math.random() * (max - min)) + min;
    return rNumber;
}

