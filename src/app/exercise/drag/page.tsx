import DragClient from "src/app/exercise/drag/page-client";
import supabaseServer from "src/utils/supabase/supabase-server";


const tempTable = [
    {
        id:'table-1',
        title:'1번 테이블'
    },
    {
        id:'table-2',
        title:'2번 테이블'
    },
    {
        id:'table-3',
        title:'3번 테이블'
    }
]

const tempItems = [
    {
        id:'table-1-1',
        tableId:'table-1',
        title: '1-1',
        content: '1번의 긴 설명 입니다ㅁㅁㅁㅁㅁㅁㅁㅁ'
    },
    {
        id:'table-1-2',
        tableId:'table-1',
        title: '1-2',
        content: '1번의 짧은 설명'
    },
    {
        id:'table-1-3',
        tableId:'table-1',
        title: '1-3',
        content: '1번의 짧은 설명'
    },
    {
        id:'table-2-1',
        tableId:'table-2',
        title: '2-1',
        content: '2번의 짧은 설명'
    },
    {
        id:'table-2-2',
        tableId:'table-2',
        title: '2-1',
        content: '2번의 짧은 설명'
    },
    {
        id:'table-3-1',
        tableId:'table-3',
        title: '3-1',
        content: '3번의 짧은 설명'
    },
    {
        id:'table-3-2',
        tableId:'table-3',
        title: '3-2',
        content: '3번의 짧은 설명'
    },
    {
        id:'table-3-3',
        tableId:'table-3',
        title: '3-3',
        content: '3번의 짧은 설명'
    },
    {
        id:'table-3-4',
        tableId:'table-3',
        title: '3-4',
        content: '3번의 짧은 설명'
    },
]

export default async function Home() {
    const supabase = supabaseServer();

    const { data:todoTables,error:todoTablesError } = await supabase.from('todo_tables').select('*');
    const { data:todoItems,error:todoItemsError } = await supabase.from('todo_items').select('*');

    console.log(todoItems)
   return (
      <div className="h-screen flex items-center justify-center">
          <DragClient tables={todoTables} items={todoItems} />
      </div>
   );
}
