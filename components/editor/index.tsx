import React from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";

type EditorProps = {
  setView: (view: EditorView | null) => void;
  children?: never;
};

const state = EditorState.create({ doc: "console.log('hello there')" });

export const Editor: React.FunctionComponent<EditorProps> = ({ setView }) => {
  const editorRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (editorRef.current === null) return;
    const view = new EditorView({
      state,
      parent: editorRef.current,
    });
    setView(view);
    return () => {
      view.destroy();
      setView(null);
    };
  }, [editorRef.current]);
  return <section ref={editorRef} />;
};
