import { HubConnectionBuilder } from "@microsoft/signalr";
class CallHub {
  constructor() {
    this.client = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/SignalRServer")
      .build();
  }
  start() {
    this.client.start();
  }
}
export default new CallHub();
