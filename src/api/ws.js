import { headersCalculation } from "./headersCalculation";

const domain = process.env.VUE_APP_WSS_DOMAIN;
const path = process.env.VUE_APP_WSS_PATH;
const socket = new WebSocket(domain + "/" + path);
const handlers = new Map();

socket.addEventListener("message", (e) => {
  const { action, data, table, filter } = JSON.parse(e.data);
  if (action && data) {
    const key = filter?.symbol ? `${table}:${filter.symbol}` : table;
    const fns = handlers.get(key) ?? [];
    fns.forEach((fn) =>
      fn({
        action,
        data,
        table,
        filter,
      })
    );
  }
});

async function sendToWebSocket(message) {
  const stringifiedMessage = JSON.stringify(message);

  if (socket.readyState === WebSocket.OPEN) {
    await socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}

export const ws = {
  subscribe(topic, cb) {
    if (!topic || !cb) return;
    const subscribers = handlers.get(topic) ?? [];
    handlers.set(topic, [...subscribers, cb]);
    sendToWebSocket({ op: "subscribe", args: topic });
  },

  unsubscribe(topic) {
    if (!topic) return;
    handlers.delete(topic);
    sendToWebSocket({ op: "unsubscribe", args: topic });
  },
  async authentication() {
    const headers = await headersCalculation("GET", `/${path}`);
    const args = [
      headers["api-key"],
      +headers["api-expires"],
      headers["api-signature"],
    ];
    await sendToWebSocket({ op: "authKeyExpires", args });
  },
};
