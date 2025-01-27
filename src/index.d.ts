export type SplitTextOptions = {
  type?: 'lines' | 'words' | 'chars';
  minLines?: number;
  lineThreshold?: number;
  noAriaLabel?: boolean;
  noBalance?: boolean;
  balanceRatio?: number;
  handleCJT?: boolean;
};

export default class SplitText {
  constructor(element: HTMLElement, options?: SplitTextOptions): void;
  split(): void;
  revert(): void;
  isSplit: boolean;
  chars: string[];
  words: string[];
  lines: string[];
  originals: HTMLElement[];
}
