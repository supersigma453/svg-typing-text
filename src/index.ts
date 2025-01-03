import * as fs from 'node:fs/promises';
import {
  getInput,
  setOutput, setFailed
} from '@actions/core';

// Methods
function generateSvg(
  data: SVGFontData
): string {
  const {
      text,
      font,
      fontSize,
      color
  } = data;
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

function RandomInt(
  min: number,
  max: number
): number {
  return Math.random() * (max - min) + min
}

function getInputs<T = {}>(inputs: (string[])[]): T {
  const InputData = {} as { [key: string]: any };

  inputs.forEach((input: string[]) => {
    InputData[input[0]] = getInput(input[1]) || input?.[2];
  });
  return InputData as T;
}

async function main(): Promise<void> {
  try {
    // Inputs
    const ActionInputs = getInputs<ActionInputData>([
      // Strings
      ['text', 'text'],
      ['font', 'font', 'arial'],
      ['color', 'color', 'white'],
      // Numbers
      ['fontSize', 'font-size', '60'],
    ]);
    console.log(ActionInputs);

    const {
      text,
      font,
      color,
      fontSize,
    } = ActionInputs;

    const TextInputs = text
      .split('\n')
      .filter((txt: string) => txt !== '');
  
    const GeneratedSVGContent = generateSvg({
      text: TextInputs[RandomInt(0, TextInputs.length - 1)],
      font,
      color,
      fontSize
    });
    
    setOutput('Generating SVG', '...');
    await fs.writeFile('typing.svg', GeneratedSVGContent);

    setOutput('Generated SVG', GeneratedSVGContent);
  } catch (err) {
    setFailed('Unable to Generate SVG File: ' +
      (err as Error)?.message);
  }
}

main();