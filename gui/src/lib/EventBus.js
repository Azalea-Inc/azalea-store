class EventBus {
  constructor() {
    this.eventTarget = new EventTarget();
  }

  reset() {
    this.eventTarget = new EventTarget();
  }

  on(event, callback) {
    this.eventTarget.addEventListener(event, callback);
    return () => this.eventTarget.removeEventListener(event, callback);
  }

  emit(event, data) {
    this.eventTarget.dispatchEvent(new CustomEvent(event, { detail: data }));
  }
}

export const bus = new EventBus();
