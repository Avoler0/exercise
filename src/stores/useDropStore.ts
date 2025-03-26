import { create } from "zustand";
import React from "react";

type Table = {
    id: string,
    title: string, // 테이블 이름
}

type Item = {
    id: string,
    table_id: string,
    title: string,
    content?: string,
    thumbnail?: string,
}

type DropStore = {
    tables: Table[];
    items: Item[];
    groupRef: HTMLDivElement | null;
    dragItem: HTMLElement | null;
    dragItemMeta: any;

    fromTableId: string | null;
    toTableId: string | null;
    insertIndex: number | null;

    mouseX: number;
    mouseY: number;

    setGroupRef: (el: HTMLDivElement | null) => void;
    setDragItem: (el: HTMLElement | null, id: string | null) => void;
    setDropTarget: (tableId: string, index: number) => void;
    setMousePosition: (x: number, y: number) => void;
    reset: () => void;
}

export const useDropStore = create<DropStore>((set) => ({
    tables:[],
    items:[],
    groupRef: null,
    dragItem: null,
    dragItemMeta: null,

    fromTableId: null,
    toTableId: null,
    insertIndex: null,
    insertIndexRef: { current: null },

    placeholderItem: null,

    mouseX: 0,
    mouseY: 0,

    setTables: (data:Item[]) => set({ tables:data }),
    setItems: (data:Item[]) => set({ items:data }),
    setGroupRef: (el) => set({ groupRef: el }),
    setFromTableId: (id) => set({ fromTableId: id }),
    setToTableId: (id) => set({ toTableId: id }),
    setInsertIndex: (index) => set({ insertIndex: index }),
    setInsertIndexRef: (index) => set((state) => {
        state.insertIndexRef.current = index;
        return {};
    }),
    setDragItem: (el) => set({ dragItem: el }),
    setDropTarget: (tableId, index) =>
        set({ toTableId: tableId, insertIndex: index }),
    setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),
    reset: () =>
        set({
            dragItem: null,
            dragItemId: null,
            fromTableId: null,
            toTableId: null,
            insertIndex: null,
        }),
}));
