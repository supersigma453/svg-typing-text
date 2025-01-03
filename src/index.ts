import * as fs from 'node:fs/promises';
import {
  getInput,
  setOutput, setFailed
} from '@actions/core';

// Methods
function generateSvg(
  text: string,
  font: string,
  fontSize: string
): string {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="50">
    <text x="10" y="30" font-family="${font}" font-size="${fontSize}">
      <tspan>${text}</tspan>
    </text>
  </svg>
  `;
}

function RandomInt(
  min: number,
  max: number
): number {
  return Math.random() * (max - min) + min
}

async function main(): Promise<void> {
  try {
    // Inputs
    const textInputs = getInput('text')
      .split('\n')
      .filter((txt: string) => txt !== "");
    const font = getInput("font");
    const fontSize = getInput("font-size");
  
    const svg = generateSvg(textInputs[RandomInt(0, textInputs.length - 1)], font, fontSize);
    
    await fs.writeFile('typing.svg', svg);

    console.log(textInputs);
    setOutput('Generated SVG', svg);
  } catch (err) {
    setFailed('Unable to Generate SVG File: ' +
      (err as Error)?.message);
  }
}

main();