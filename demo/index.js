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
  const handleCJK = document.getElementById('input-handle-cjk');
  const cssBalance = document.getElementById('input-balance');
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
      handleCJK: handleCJK.checked,
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
  [typeLines, typeWords, typeChars, noAriaLabel, noBalance, handleCJK, cssBalance].forEach((checkbox) => {
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
  inputText.value = [/*html*/ `<h1>split anything 🐳 🍔 🍕 into words, chars, lines</h1>`, /*html*/ `<p>Try typing some text here to see it split into lines, words, and characters!</p>`].join('\n');

  updateSplit();
});
