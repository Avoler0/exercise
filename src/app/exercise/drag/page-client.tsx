"use client";

import React, {useEffect} from "react";
import {DropTable, DropTablesGroup,DropTableItem} from "src/component/DropTable";
import {useDropStore} from "src/stores/useDropStore";


export default function DragClient({ tables: initialTables, items: initialItems }){
    const { setTables, setItems } = useDropStore();
    const tables = useDropStore((state) => state.tables)
    const items = useDropStore((state) => state.items)

     React.useEffect(()=>{
         setItems(initialItems);
         setTables(initialTables);
     },[initialTables,initialItems])

    return (
        <DropTablesGroup >
              {tables.map(table => (
                  <DropTable table={table} key={table.id}>
                      {items && items.filter(item => item.tableId === table.id).map(item => (
                          <DropTableItem key={item.id} item={item} />
                      ))}
                  </DropTable>
              ))}
          </DropTablesGroup>
    )
}
