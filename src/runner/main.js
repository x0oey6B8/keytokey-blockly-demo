import './style.css'
import { parse, stepCode, runCode } from "./runner"

const runButton = document.getElementById('runButton');
const stepButton = document.getElementById('stepButton');
const code = `
for (var i = 0; i < 10; i++) {
    alert(i);
};`;

const interpreter = parse(code);

runButton.addEventListener("click", () => {
    runCode(interpreter);
});

stepButton.addEventListener("click", () => {
    stepCode(interpreter);
});