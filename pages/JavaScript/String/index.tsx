import React from "react";
import { Box, Fab } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import objectInspect from "object-inspect";

const fabStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
};

const originalConsoleLogger = console.log;
const originalConsoleError = console.error;

const reduceArgs = (formattedList: any[], arg: any) => [
  ...formattedList,
  objectInspect(arg),
];

const formatArgs = (args: any[]) => args.reduce(reduceArgs, []).join(" ");

const StringPage = () => {
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  console.log = (...args: any[]) => {
    const formattedLog = formatArgs(args);
    setResult(formattedLog);
    originalConsoleLogger.call(console, ...args);
  };

  console.error = function (...args: any[]) {
    const formattedError = formatArgs(args);
    setError(formattedError);
    originalConsoleError.call(console, ...args);
  };

  const codeRef = React.useRef<HTMLTextAreaElement>(null);
  const evaluateCode = () => {
    if (codeRef.current === null) return;
    const code = codeRef.current.value;
    if (code.length === 0) return;
    try {
      new Function(code)();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ position: "relative", flex: 2 }}>
          <textarea ref={codeRef} />
          <Fab size="small" sx={fabStyle} onClick={evaluateCode}>
            <PlayArrow />
          </Fab>
        </Box>
        <Box sx={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}>
          {result}
          {error}
        </Box>
      </Box>
    </>
  );
};

export default StringPage;
