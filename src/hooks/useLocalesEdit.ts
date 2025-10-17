import { Key } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocalesEditStore {
  massEditId?: Key | null;
  selectedRowKeys: Key[];
  setSelectedRowKeys: (keys: Key[]) => void;
  setMassEditId: (id: Key | null) => void;
}

export const useLocalesEdit = create(
  persist<LocalesEditStore>(
    (set) => ({
      massEditId: null,
      selectedRowKeys: [],
      setSelectedRowKeys: (keys) => set({ selectedRowKeys: keys }),
      setMassEditId: (id) => set({ massEditId: id }),
    }),
    {
      name: "locales-edit",
    }
  )
);
