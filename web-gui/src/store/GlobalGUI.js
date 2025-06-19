class GlobalGUI {
  constructor() {
    this.state = {
      // Initialize your state here
    };
  }

  updateState(newState) {
    this.state = newState;
  }

  getState() {
    return this.state;
  }
}

export const globalGUI = new GlobalGUI();
