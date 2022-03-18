import createStore from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  listView?: boolean;
  toggleListView: (value?: boolean) => void;
  /**
   *
   * previously viewed pokemons
   *
   */
  history: [];
  /**
   *
   * add new item to previously viewed pokemons
   *
   */
  saveHistory: () => void;
  clearHistory: () => void;
}

const useStore = createStore<Store>(
  persist(
    devtools((set) => ({
      toggleListView: (value) => {
        return set((state) => ({
          listView: typeof value === "boolean" ? value : !state.listView,
        }));
      },
      history: [],
      saveHistory: () => {},
      clearHistory: () => {
        return set(() => ({
          history: [],
        }));
      },
    })),
    { name: "currentState" }
  )
);

export default useStore;
