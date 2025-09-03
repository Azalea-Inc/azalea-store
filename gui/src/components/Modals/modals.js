import { writable } from "svelte/store";

const initialState = {
  stack: [],
  current: null,
  hidden: true,
};

class Modals {
  constructor() {
    this.state = writable({ ...initialState });
  }

  push(component, props = {}) {
    this.state.update((state) => {
      const newStack = [...state.stack, { component, props }];
      return {
        ...state,
        stack: newStack,
        current: newStack[newStack.length - 1],
        hidden: false,
      };
    });
  }

  close() {
    this.state.update((state) => {
      const newStack = state.stack;
      newStack.pop();

      return {
        ...state,
        stack: newStack,
        current: newStack.length > 0 ? newStack[newStack.length - 1] : null,
        hidden: newStack.length === 0,
      };
    });
  }
}

export const modals = new Modals();
