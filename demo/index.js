import './styles.css';
import SplitText from '../src/index.js';

document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const inputText = document.getElementById('input-text');
  const outputText = document.getElementById('output-text');
  const originalText = document.getElementById('original-text');
  const revertButton = document.getElementById('output-revert');

  // Get option checkboxes
  const typeLines = document.getElementById('input-type-lines');
  const typeWords = document.getElementById('input-type-words');
  const typeChars = document.getElementById('input-type-chars');
  const noAriaLabel = document.getElementById('input-no-aria-label');
  const noBalance = document.getElementById('input-no-balance');
  const handleCJT = document.getElementById('input-handle-cjt');
  const cssBalance = document.getElementById('input-balance');
  const balanceRatio = document.getElementById('input-balance-ratio');
  const minLines = document.getElementById('input-min-lines');
  const lineThreshold = document.getElementById('input-line-threshold');

  // Get font size input
  const fontSize = document.getElementById('input-font-size');

  let splitInstance = null;

  // Helper to get current options
  const getOptions = () => {
    const types = [];
    if (typeLines.checked) types.push('lines');
    if (typeWords.checked) types.push('words');
    if (typeChars.checked) types.push('chars');

    return {
      type: types.join(','),
      noAriaLabel: noAriaLabel.checked,
      noBalance: noBalance.checked,
      handleCJT: handleCJT.checked,
      balanceRatio: Number(balanceRatio.value),
      minLines: Number(minLines.value),
      lineThreshold: Number(lineThreshold.value),
    };
  };

  // Update split text
  const updateSplit = () => {
    outputText.style.removeProperty('max-width');

    if (cssBalance.checked) {
      outputText.style.setProperty('text-wrap', 'balance');
    } else {
      outputText.style.removeProperty('text-wrap');
    }

    const text = inputText.value.trim();
    if (!text) return;

    // Store original text
    originalText.innerHTML = text;

    // Update output
    outputText.innerHTML = text;

    // Create new split instance
    splitInstance = new SplitText(outputText, getOptions());
  };

  const updateFontSize = () => {
    outputText.style.fontSize = `${fontSize.value}px`;
    updateSplit();
  };

  // Event listeners
  inputText.addEventListener('input', updateSplit);
  fontSize.addEventListener('input', updateFontSize);
  [typeLines, typeWords, typeChars, noAriaLabel, noBalance, handleCJT, cssBalance, balanceRatio, minLines, lineThreshold].forEach((checkbox) => {
    checkbox.addEventListener('change', updateSplit);
  });

  // Revert button
  revertButton.addEventListener('click', () => {
    outputText.style.removeProperty('max-width');

    if (splitInstance) {
      splitInstance.revert();
      splitInstance = null;
    }
  });

  window.addEventListener('resize', () => {
    updateSplit();
  });

  // Initial text
  inputText.value = /* html */ `
    <h1>split anything 🐳 🍔 🍕 into words, chars, lines</h1>
    <p>Try typing some text to see it split into lines, words, and characters!</p>
    <p> Link <a href="https://www.google.com">here</a></p>
    <ul>
      <li>pizza <b>margherita</b></li>
      <li>hamburger</li>
      <li>taco</li>
    </ul>
  `.trim();

  updateSplit();
});
