"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("node:fs/promises"));
const core_1 = require("@actions/core");
// Methods
function generateSvg(data) {
    const { text, font, fontSize, color } = data;
    return `
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 500"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1">
          <path id="animate-text" d="M0,110 H0" />

          <text
            fill="${color}"
            font-family="${font}"
            font-size="${fontSize}">
              <textPath xlink:href="#animate-text">${text}</textPath>
          </text>

          <!-- Typing Animation -->
          <animate
            xlink:href="#animate-text"
            attributeName="d"
            from="M0,110 H0"
            to="M0,110 H1100"
            dur="2s"
            begin="0s; delete.end+1s"
            fill="freeze" 
            id="typing" />

          <!-- Deleting Animation -->
          <animate
            xlink:href="#animate-text"
            attributeName="d"
            from="M0,110 H1100"
            to="M0,110 H0"
            dur="2s"
            begin="typing.end+1s"
            fill="freeze" 
            id="delete" />
    </svg>
  `;
}
function RandomInt(min, max) {
    return Math.random() * (max - min) + min;
}
function getInputs(inputs) {
    const InputData = {};
    inputs.forEach((input) => {
        InputData[input[0]] = (0, core_1.getInput)(input[1]) || (input === null || input === void 0 ? void 0 : input[2]);
    });
    return InputData;
}
async function main() {
    try {
        // Inputs
        const ActionInputs = getInputs([
            // Strings
            ['text', 'text'],
            ['font', 'font', 'arial'],
            ['color', 'color', 'white'],
            // Numbers
            ['fontSize', 'font-size', '60'],
        ]);
        console.log(ActionInputs);
        const { text, font, color, fontSize, } = ActionInputs;
        const TextInputs = text
            .split('\n')
            .filter((txt) => txt !== '');
        const GeneratedSVGContent = generateSvg({
            text: TextInputs[RandomInt(0, TextInputs.length - 1)],
            font,
            color,
            fontSize
        });
        (0, core_1.setOutput)('Generating SVG', '...');
        await fs.writeFile('typing.svg', GeneratedSVGContent);
        (0, core_1.setOutput)('Generated SVG', GeneratedSVGContent);
    }
    catch (err) {
        (0, core_1.setFailed)('Unable to Generate SVG File: ' +
            (err === null || err === void 0 ? void 0 : err.message));
    }
}
main();
