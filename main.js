const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const final_resolution = prompt("Enter your final resolution: ", );

function start() {
    let field = Array(Math.round(canvas.height / final_resolution)).fill().map(() => Array(Math.round(canvas.width / final_resolution)).fill(0));
    let horizontal = isHorizontal(field.length, field[0].length);

    boarder(field)
    recursiveDivision(field, horizontal, 1, field[0].length, 1, field.length);
    draw(field);
    console.log(field)
}

function recursiveDivision(field, horizontal, min_x, max_x, min_y, max_y) {
    //console.log(max_x, max_y)
    console.log("HERE I AM")
    if (horizontal) {
        console.log("HOR")
        if (max_x - min_x < 2) {
            console.log("FINISHED")
            return;
        }
        let random_y = RandomNumberInRange(max_x, max_y)
        //console.log(random_y)
        horizontalWall(min_x, max_x, random_y, field);

        recursiveDivision(field, !horizontal, min_x, max_x, min_y, random_y);
        recursiveDivision(field, !horizontal, min_x, max_x, random_y, max_y);
    }
    else {
        console.log("VER")
        if (max_y - min_y < 2) {
            console.log("FINISHED")
            return;
        }
        let random_x = RandomNumberInRange(min_x, max_x)
        verticalWall(min_y, max_y, random_x, field);

        recursiveDivision(field, !horizontal, min_x, random_x, min_y, max_y);
        recursiveDivision(field, !horizontal, random_x, max_x, min_y, max_y);
    }
}

function horizontalWall(min_x, max_x, y, field) {
    let door = RandomNumberInRange(min_x, max_x);
    console.log(min_x, max_x)
    for (let x = min_x; x <= max_x; i++) {
        if (x != door) {
            field[x][y] = "w"
        }
    }
}

function verticalWall(min_y, max_y, x, field) {
    let door = RandomNumberInRange(min_y, max_y);
    for (let y = min_y; y <= max_y; y++) {
        if (y != door) {
            field[x][y] = "w"
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
