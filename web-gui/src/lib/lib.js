import { writable } from "svelte/store";

export function newState(_states, defaultState) {
  const states = _states;
  const state = writable(states[defaultState]);

  const actions = {
    setState(status, props) {
      states[status].props = { ...states[status].props, ...props };
      state.set(states[status]);
    },
  };

  for (const [key] of Object.entries(states)) {
    states[key].props = { ...states[key].props, actions };
  }

  return { state };
}
