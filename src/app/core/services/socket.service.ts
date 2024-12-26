// import {Injectable} from '@angular/core';
// import {Socket} from "ngx-socket-io";
// import {environment} from "../../../environments/environment";

// @Injectable()
// export class SocketService extends Socket {

//   constructor() {
//     super({
//       url: environment.socketUrl,
//       options: {
//         autoConnect: true,
//         reconnection: true,
//         transports: ["websocket"],
//         rememberUpgrade: true,
//       }
//     });
//     this.on('connect', () => {
//       console.log("Socket connected Successfully !");
//     });
//     this.on('disconnect', () => {
//       console.warn("Socket disconnected !");
//     });
//     this.on('connect_error', (err) => {
//       console.warn("Socket trying to reconnect !", err);
//     });
//   }

//   listenTo(eventName: string) {
//     return this.fromEvent(eventName);
//   }

// }
