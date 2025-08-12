require("module-alias/register");
const Store = require("./Store");

const store = new Store();
store.start();
