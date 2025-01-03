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
function generateSvg(text, font, fontSize) {
    return `
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="50">
    <text x="10" y="30" font-family="${font}" font-size="${fontSize}">
      <tspan>${text}</tspan>
    </text>
  </svg>
  `;
}
function RandomInt(min, max) {
    return Math.random() * (max - min) + min;
}
async function main() {
    try {
        // Inputs
        const textInputs = (0, core_1.getInput)('text')
            .split('\n')
            .filter((txt) => txt !== "");
        const font = (0, core_1.getInput)("font");
        const fontSize = (0, core_1.getInput)("font-size");
        const svg = generateSvg(textInputs[RandomInt(0, textInputs.length - 1)], font, fontSize);
        await fs.writeFile('typing.svg', svg);
        console.log(textInputs);
        (0, core_1.setOutput)('Generated SVG', svg);
    }
    catch (err) {
        (0, core_1.setFailed)('Unable to Generate SVG File: ' +
            (err === null || err === void 0 ? void 0 : err.message));
    }
}
main();
