import { javascript } from "@codemirror/lang-javascript";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { bracketMatching } from "@codemirror/matchbrackets";

export const extensions = [
  bracketMatching(),
  defaultHighlightStyle.fallback,
  javascript(),
];
