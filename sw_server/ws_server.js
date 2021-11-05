import WSServer from "express-ws";
import { rooms } from "../data/data.js";


export default function ws_server( app ) {
  const expressWs = WSServer(app);
  const aWss = expressWs.getWss("/");

  function broadcastMessage(message) {
    aWss.clients.forEach((client) => {
      client.send(JSON.stringify(message));
    });
  }

  app.ws("/", function (ws, res) {
    ws.on("message", (msg) => {
      const mess = JSON.parse(msg);
      const { from, to, message } = mess;
      const room = rooms.filter(
        (el) => el.IDList.includes(from) && el.IDList.includes(to)
      )[0];
      switch (mess.event) {
        case "message":
          if (room) {
            const index = rooms.indexOf(room);
            rooms[index].messages.push({ id: from, message: message });
            broadcastMessage(room);
          } else {
            rooms.push({
              IDList: [from, to],
              messages: [{ id: from, message: message }],
            });
            broadcastMessage({ IDList: [from, to], messages: [] });
          }
          broadcastMessage(mess);
          break;

        case "connection":
          if (room) {
            broadcastMessage(room);
          } else {
            rooms.push({ IDList: [from, to], messages: [] });
            broadcastMessage({ IDList: [from, to], messages: [] });
          }
          break;
      }
    });
  });
}
