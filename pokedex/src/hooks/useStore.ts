import createStore from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Store {
  listView?: boolean;
  toggleListView: (value?: boolean) => void;
  viewedPokemonIds: number[];
  saveAsViewedPokemon: (id: number) => void;
  clear: () => void;
}

const useStore = createStore<Store>(
  persist(
    devtools((set, get) => ({
      toggleListView: (value) => {
        return set((state) => ({
          listView: typeof value === "boolean" ? value : !state.listView,
        }));
      },
      viewedPokemonIds: [],
      saveAsViewedPokemon: (id) => {
        return set(() => {
          // copy
          const current = [...get().viewedPokemonIds];
          // remove from viewed ids if it exists
          const filtered = current.includes(id)
            ? current.filter((currentId) => id !== currentId)
            : current;

          return {
            viewedPokemonIds: [id /* should be the most recent*/, ...filtered],
          };
        });
      },
      clear: () => set({}, true),
    })),
    { name: "POKEDEX" }
  )
);

export default useStore;
