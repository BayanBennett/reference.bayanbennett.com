import { promises as fs } from "fs";
import { resolve } from "path";
import globby from "globby";
import { GetStaticProps } from "next";
import React, { FunctionComponent } from "react";
import { EditorView } from "@codemirror/view";
import { Box, Fab, Paper, Typography } from "@material-ui/core";
import { Editor } from "../../components/editor";
import { PlayArrow } from "@material-ui/icons";
import { SxProps } from "@material-ui/system";
import objectInspect from "object-inspect";

type JavaScriptPageTemplateProps = { initialCode: string; path: string[] };

const cwd = resolve("data", "JavaScript");

export const getStaticPaths = async () => {
  const filePaths = await globby("**/*", {
    onlyFiles: true,
    cwd,
  });
  const paths = filePaths.map((filePath) => {
    const filePathWithoutExtension = filePath.replace(/\.js$/, "");
    return `/JavaScript/${filePathWithoutExtension}`;
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  JavaScriptPageTemplateProps,
  { path: string[] }
> = async ({ params }) => {
  if (typeof params?.path === "undefined") return { notFound: true };
  const { path } = params;
  const fileName = path[path.length - 1];
  const folder = path.slice(0, path.length - 1);
  const initialCode = await fs.readFile(
    resolve(cwd, ...folder, `${fileName}.js`),
    "utf-8"
  );
  return { props: { initialCode, path } };
};

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

const JavaScriptPageTemplate: FunctionComponent<JavaScriptPageTemplateProps> = ({
  initialCode,
  path,
}) => {
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
      <Typography variant="h1" align="center">
        {path.join(" ")}
      </Typography>
      <Box component={Paper} sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ position: "relative", flex: 2 }}>
          <Editor setView={setView} initialCode={initialCode} />
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

export default JavaScriptPageTemplate;
