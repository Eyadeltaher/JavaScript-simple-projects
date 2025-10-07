const fromSelect = document.getElementById("fromSelect");
const toSelect = document.getElementById("toSelect");
const inputBox = document.getElementById("inputBox");
const outputBox = document.getElementById("outputBox");


function convert() {

    let val = inputBox.value
    const numbers = val.match(/-?\d+(\.\d+)?/g).map(Number);

    if (!numbers || numbers.length < 3) {
        outputBox.value = "Invalid input format. Example: (1,2,3)";
        return;
    }

    const deg = rad => rad * 180 / Math.PI;
    const rad = deg => deg * Math.PI / 180;

    if (fromSelect.value == "cartesian") {
        switch (toSelect.value) {
            case "cylindrical": {
                const phi = deg(Math.atan2((numbers[1]), (numbers[0])));
                outputBox.value = `(${(Math.sqrt((numbers[0] * numbers[0]) + (numbers[1] * numbers[1]))).toPrecision(3)} , ${phi.toPrecision(3)}° , ${(numbers[2]).toPrecision(3)})`
                break;
            }
            case "spherical": {
                const r = Math.sqrt((numbers[0] * numbers[0]) + (numbers[1] * numbers[1]) + (numbers[2] * numbers[2]))
                const phi = deg(Math.atan2((numbers[1]), (numbers[0])));
                const theta = deg(Math.acos((numbers[2]) / (r)));
                outputBox.value = `(${r.toPrecision(3)} , ${theta.toPrecision(3)}° , ${phi.toPrecision(3)}°)`
                break;
            }
            case "cartesian":
                outputBox.value = val;
                break;
        }
    }

    if (fromSelect.value == "cylindrical") {
        if (numbers[0] >= 0 && numbers[1] >= 0 && numbers[1] < 360) {
            switch (toSelect.value) {
                case "cylindrical":
                    outputBox.value = `(${numbers[0].toPrecision(3)} , ${(numbers[1]).toPrecision(3)}° , ${numbers[2].toPrecision(3)})`;
                    break;

                case "spherical":
                    let r = Math.sqrt((numbers[0] * numbers[0]) + (numbers[2] * numbers[2]));
                    const theta = deg(Math.acos((numbers[2]) / (r)));
                    outputBox.value = `(${r.toPrecision(3)} , ${theta.toPrecision(3)}° , ${(numbers[1]).toPrecision(3)}°)`;
                    break;

                case "cartesian":
                    const x = (numbers[0] * Math.cos(rad(numbers[1])));
                    const y = (numbers[0] * Math.sin(rad(numbers[1])));
                    outputBox.value = `(${x.toPrecision(3)} , ${y.toPrecision(3)} , ${(numbers[2]).toPrecision(3)})`;
                    break;
            }
        } else {
            outputBox.value = "point is out of boundry"
        }
    }

    if (fromSelect.value == "spherical") {
        if (numbers[0] >= 0 && numbers[1] >= 0 && numbers[1] <= 180 && numbers[2] >= 0 && numbers[2] <= 360) {
            switch (toSelect.value) {
                case "cylindrical": {
                    const z = (numbers[0] * Math.cos(rad(numbers[1])));
                    const ρ = (numbers[0] * Math.sin(rad(numbers[1])));
                    outputBox.value = `(${ρ.toPrecision(3)} , ${(numbers[2]).toPrecision(3)}° , ${z.toPrecision(3)})`
                    break;
                }
                case "spherical":
                    outputBox.value = `(${numbers[0].toPrecision(3)} , ${(numbers[1]).toPrecision(3)}° , ${numbers[2].toPrecision(3)}°)`;
                    break;

                case "cartesian": {
                    const z = (numbers[0] * Math.cos(rad(numbers[1])));
                    const x = (numbers[0] * Math.sin(rad(numbers[1])) * Math.cos(rad(numbers[2])));
                    const y = (numbers[0] * Math.sin(rad(numbers[1])) * Math.sin(rad(numbers[2])));
                    outputBox.value = `(${x.toPrecision(3)} , ${y.toPrecision(3)} , ${z.toPrecision(3)})`
                    break;
                }
            }
        } else {
            outputBox.value = "point is out of boundry"
        }
    }

}