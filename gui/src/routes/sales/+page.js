import { saleStore } from "@store/SaleStore";

export const load = async () => {
  saleStore.initialize();
  return {};
};
