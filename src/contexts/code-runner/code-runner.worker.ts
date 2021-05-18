type ConsoleKeys = keyof Console;

export type Message = {
  level: ConsoleKeys;
  argArray: any[];
};

let messages: Message[] = [];

type ConsoleMethods = Console[ConsoleKeys];

type CreateApply = (
  level: ConsoleKeys
) => ProxyHandler<ConsoleMethods>["apply"];

const createApply: CreateApply = (level) => (target, thisArg, argArray) => {
  messages.push({ level, argArray });
  return target.apply(thisArg, argArray);
};

const get: ProxyHandler<Console>["get"] = (target, prop: ConsoleKeys) =>
  new Proxy(target[prop], {
    apply: createApply(prop),
  });

console = new Proxy(console, { get });

self.onmessage = ({ data }: { data: string }) => {
  new Function(data)();
  self.postMessage(messages);
  messages = [];
};
