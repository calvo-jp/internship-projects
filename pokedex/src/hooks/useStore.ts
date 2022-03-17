import createStore from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  listView?: boolean;
  toggleListView: (value?: boolean) => void;
}

const useStore = createStore<Store>(
  persist(
    devtools((set) => ({
      toggleListView: (value) => {
        return set((state) => ({
          listView: typeof value === "boolean" ? value : !state.listView,
        }));
      },
    })),
    { name: "currentState" }
  )
);

export default useStore;
