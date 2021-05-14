type Message = {
  level: string | symbol;
  argArray: any[];
};

let messages: Message[] = [];

type ConsoleMethods = Console[keyof Console];

type CreateApply = (
  level: string | symbol
) => ProxyHandler<ConsoleMethods>["apply"];

const createApply: CreateApply = (level: string | symbol) => (
  target,
  thisArg,
  argArray
) => {
  messages.push({ level, argArray });
  return target.apply(thisArg, argArray);
};

const get: ProxyHandler<Console>["get"] = (target, prop) =>
  new Proxy(target[prop as keyof Console], {
    apply: createApply(prop),
  });

console = new Proxy(console, { get });

self.onmessage = ({ data }: { data: string }) => {
  new Function(data)();
  self.postMessage(messages);
  messages = [];
};

export {};
