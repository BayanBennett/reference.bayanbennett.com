import { SxProps } from "@material-ui/system";
import objectInspect from "object-inspect";
import { CodeComponent } from "react-markdown/src/ast-to-react";
import React, { FunctionComponent } from "react";
import { EditorView } from "@codemirror/view";
import { Box, Fab, Paper, Typography } from "@material-ui/core";
import { Editor } from "../editor";
import { PlayArrow } from "@material-ui/icons";
import { useCodeRunner, withCodeRunner } from "../../contexts/code-runner";

const fabStyle: SxProps = {
  position: "absolute",
  bottom: 0,
  right: 0,
  margin: 1,
};

const reduceArgs = (formattedList: any[], arg: any) => [
  ...formattedList,
  objectInspect(arg),
];

const formatArgs = (args: any[]) => args.reduce(reduceArgs, []).join(" ");

const Code: CodeComponent = ({ inline = false, children }) => {
  const [view, setView] = React.useState<EditorView | null>(null);
  const [result, setResult] = React.useState([]);
  const [error, setError] = React.useState("");

  const sendMessage = useCodeRunner();

  if (inline) return <code>{children}</code>;

  const evaluateCode = () => {
    if (view === null) return;
    const code = view.state.doc.toString();
    sendMessage(code).then(setResult).catch(setError);
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
        component="aside"
        sx={{
          flex: 1,
          padding: 1,
          overflow: "auto",
          backgroundColor: "rgba(0,0,0,0.1)",
          display: "flex",
          flexFlow: "column nowrap",
        }}
      >
        {result.map(({ level, argArray }, index) => (
          <Typography
            key={index}
            component="code"
            variant="caption"
            sx={{ fontFamily: "monospace" }}
          >
            {level === "assert" && argArray[0] === true
              ? "✔️"
              : formatArgs(argArray)}
          </Typography>
        ))}
        {error}
      </Box>
    </Box>
  );
};

export const code = withCodeRunner(Code as FunctionComponent);
