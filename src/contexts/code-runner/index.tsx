import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const initialContext = async () => {
  throw new Error(
    '"useCodeRunner" must be inside a component wrapped with "withCodeRunner"'
  );
};

const CodeRunnerContext = createContext<(code: string) => Promise<any>>(
  initialContext
);
CodeRunnerContext.displayName = "CodeRunner";

export const useCodeRunner = () => useContext(CodeRunnerContext);

type WithCodeRunner = <T>(
  Component: FunctionComponent<T>
) => FunctionComponent<T>;

export const withCodeRunner: WithCodeRunner = (Component) => (props) => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const sendMessage = useCallback(
    (code) =>
      new Promise((resolve, reject) => {
        if (worker === null) return reject("worker not loaded");
        worker.onerror = (e) => reject(e.message);
        worker.onmessage = ({ data }) => resolve(data);
        worker.postMessage(code);
      }),
    [worker]
  );
  useEffect(() => {
    const newWorker = new Worker(
      new URL("./code-runner.worker.ts", import.meta.url)
    );
    setWorker(newWorker);
    return () => {
      newWorker.terminate();
      setWorker(null);
    };
  }, []);
  return (
    <CodeRunnerContext.Provider value={sendMessage}>
      <Component {...props} />
    </CodeRunnerContext.Provider>
  );
};
