import { saleStore } from "@store/SaleStore";

export const load = async () => {
  await saleStore.initialize();
  return {};
};
