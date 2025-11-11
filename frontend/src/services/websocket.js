import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = null;
    this.connected = false;
  }

  connect(roomId, onMessageReceived) {
    return new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.client.onConnect = () => {
        this.connected = true;

        this.client.subscribe(`/topic/chat/${roomId}`, (message) => {
          const receiveMessage = JSON.parse(message.body);
          onMessageReceived(receiveMessage);
        });

        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
        reject(frame);
      };

      this.client.activate();
    });
  }

  sendMessage(
    roomId,
    sender,
    sessionId,
    message,
    targetSessionId = null,
    type = "CHAT"
  ) {
    if (this.client && this.connected) {
      const chatMessage = {
        roomId,
        sender,
        sessionId,
        targetSessionId,
        message,
        type,
      };

      this.client.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
    }
  }

  addUser(roomId, username, sessionId) {
    if (this.client && this.connected) {
      const chatMessage = {
        roomId,
        sender: username,
        sessionId,
        type: "JOIN",
      };

      this.client.publish({
        destination: "/app/chat.addUser",
        body: JSON.stringify(chatMessage),
      });
    }
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.connected = false;
    }
  }
}

export default new WebSocketService();
