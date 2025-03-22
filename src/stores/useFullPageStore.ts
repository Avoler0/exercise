import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface PageStore {
    anchor: number;
    offset: number;
    length: number
    setAnchor: (index: number) => void;
    setOffset: (offset: number) => void;
    setLength: (leng: number) => void;
}

export const useFullPageStore = create<PageStore>((set, get) => ({
    length: 0,
    anchor: 1,
    offset: 0,
    setAnchor: (value) =>
        set({
            anchor: typeof value === "function"
                ? (value as (prev: number) => number)(get().anchor)
                : value,
        }),
    setOffset: (value) =>
        set({
            offset: typeof value === "function"
                ? (value as (prev: number) => number)(get().offset)
                : value,
        }),
    setLength: (leng:number) => set({length: leng})
    })
);