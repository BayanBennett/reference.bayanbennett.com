import React from "react";
import { Box, Fab } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";

const fabStyle = {
  position: "absolute",
  bottom: 0,
  right: 0,
};

const StringPage = () => {
  const [result, setResult] = React.useState("");
  const codeRef = React.useRef<HTMLTextAreaElement>(null);
  const evaluateCode = () => {
    if (codeRef.current === null) return;
    const code = codeRef.current.value;
    if (code.length === 0) return;
    try {
      setResult(eval(code));
    } catch (e) {
      console.warn(e);
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
        <Box sx={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)" }}>{result}</Box>
      </Box>
    </>
  );
};

export default StringPage;
