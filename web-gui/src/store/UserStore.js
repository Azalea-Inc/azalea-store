import { writable } from "svelte/store";

const initialState = {
  id: "usr_123456789",
  email: "usuario@ejemplo.com",
  name: "María García",
  avatar:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHyxPK2yeehZRCtrNt-LzzQKQ5sDRLeBqGQ&s",
  role: "administrador",
  permissions: ["read", "write", "delete", "manage_users"],
  status: "activo",
  lastLogin: "2023-05-15T14:30:45Z",
  createdAt: "2022-01-10T09:20:33Z",
  updatedAt: "2023-05-15T14:30:45Z",
};

function createUserStore() {
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    set,
    update,
    reset: () => set(initialState),
  };
}

export const userStore = createUserStore();
