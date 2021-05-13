import { SxProps } from "@material-ui/system";
import objectInspect from "object-inspect";
import { CodeComponent } from "react-markdown/src/ast-to-react";
import React from "react";
import { EditorView } from "@codemirror/view";
import { Box, Fab, Paper } from "@material-ui/core";
import { Editor } from "../editor";
import { PlayArrow } from "@material-ui/icons";

const fabStyle: SxProps = {
  position: "absolute",
  bottom: 0,
  right: 0,
};

const reduceArgs = (formattedList: any[], arg: any) => [
  ...formattedList,
  objectInspect(arg),
];

const formatArgs = (args: any[]) => args.reduce(reduceArgs, []).join(" ");

export const code: CodeComponent = ({ inline = false, children }) => {
  const [view, setView] = React.useState<EditorView | null>(null);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  if (inline) return <code>{children}</code>;

  console.log = new Proxy(console.log, {
    apply(target, self, args) {
      setResult(formatArgs(args));
      target(...args);
    },
  });

  console.error = new Proxy(console.error, {
    apply(target, self, args) {
      setError(formatArgs(args));
      target(...args);
    },
  });

  const evaluateCode = () => {
    if (view === null) return;
    const code = view.state.doc.toString();
    try {
      new Function(code)();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box component={Paper} sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ position: "relative", flex: 2 }}>
        <Editor setView={setView} initialCode={String(children)} />
        <Fab size="small" sx={fabStyle} onClick={evaluateCode}>
          <PlayArrow />
        </Fab>
      </Box>
      <Box
        component="code"
        sx={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}
      >
        {result}
        {error}
      </Box>
    </Box>
  );
};
