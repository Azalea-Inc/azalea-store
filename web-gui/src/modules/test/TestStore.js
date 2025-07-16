import { writable, get } from "svelte/store";
import List from "./List.svelte";
import Controls from "./Controls.svelte";

const initialState = {
  list: ["item", "item2", "item3"],
};

export const components = writable({
  controls: { component: Controls },
  list: { component: null },
});

class TestStore {
  constructor() {
    this.state = writable({ ...initialState });
    this.subscribe = this.state.subscribe;
  }

  addItem(item) {
    this.state.update((state) => ({
      ...state,
      list: [...state.list, item],
    }));
  }

  showList() {
    components.update((state) => ({
      ...state,
      list: {
        component: List,
        props: { list: this.state.subscribe((v) => v.list) },
      },
    }));
  }
}

export const testStore = new TestStore();
