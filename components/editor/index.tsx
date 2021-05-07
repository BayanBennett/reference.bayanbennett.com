import React from "react";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { extensions } from "./extensions";

type EditorProps = {
  setView: (view: EditorView | null) => void;
  initialCode: string;
  children?: never;
};

export const Editor: React.FunctionComponent<EditorProps> = ({
  setView,
  initialCode: doc,
}) => {
  const editorRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (editorRef.current === null) return;
    const view = new EditorView({
      state: EditorState.create({
        doc,
        extensions,
      }),
      parent: editorRef.current,
    });
    setView(view);
    return () => {
      view.destroy();
      setView(null);
    };
  }, [editorRef.current, doc]);
  return <section ref={editorRef} />;
};
