import React from "react";
import { Box, Fab, Paper, Typography } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import objectInspect from "object-inspect";
import { Editor } from "../../../components/editor";
import { EditorView } from "@codemirror/view";
import { SxProps } from "@material-ui/system";

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

const StringPage = () => {
  const [view, setView] = React.useState<EditorView | null>(null);
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

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
    <>
      <Typography variant="h1">Strings</Typography>
      <Box component={Paper} sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ position: "relative", flex: 2 }}>
          <Editor setView={setView} />
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
    </>
  );
};

export default StringPage;
