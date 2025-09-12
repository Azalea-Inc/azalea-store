export class SalesVM {
  constructor() {
    this.cart = writable([]);
    this.total = derived(() =>
      this.cart().reduce((acc, item) => acc + item.price, 0),
    );
  }
}
