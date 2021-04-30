import { javascript } from "@codemirror/lang-javascript";
import { defaultHighlightStyle } from "@codemirror/highlight";
import { bracketMatching } from "@codemirror/matchbrackets";
import { highlightStyle } from "./highlight-style";
import { EditorView } from "@codemirror/view";
import { lineNumbers } from "@codemirror/gutter";

export const extensions = [
  EditorView.theme({}, { dark: true }),
  highlightStyle,
  EditorView.lineWrapping,
  lineNumbers(),
  javascript({ jsx: true, typescript: true }),
  bracketMatching(),
  defaultHighlightStyle.fallback,
];
