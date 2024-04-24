import { RecordObject } from "@mv-d/toolbelt";
import eventsLib, { EventEmitter } from "events";
import { Maybe } from "../types";

class Logger {
  #isWeb = false;

  #eventEmitter: Maybe<EventEmitter> = undefined;

  #message: RecordObject = {};

  constructor() {
    if ("window" in globalThis) {
      this.#isWeb = true;
    } else {
      this.#eventEmitter = new eventsLib.EventEmitter();

      this.#subscribeToNodeJsEvents();
    }
  }

  #subscribeToNodeJsEvents() {}

  #prepareWebMessage(message: RecordObject | string) {
    return new CustomEvent("log", {
      detail: typeof message === "string" ? message : JSON.stringify(message),
    });
  }

  dispatch(message: RecordObject | string) {
    let m = this.#message;

    if (typeof message !== "string") m = { ...m, ...message };
    else m = { ...m, message };

    if (this.#isWeb) document.dispatchEvent(this.#prepareWebMessage(m));
    else this.#eventEmitter?.emit(String(m));
  }

  addContext(message: RecordObject) {
    this.#message = { ...this.#message, ...message };
  }

  send() {
    if (!Object.keys(this.#message).length) this.dispatch(this.#message);
  }
}

export const LoggerService = Logger;
