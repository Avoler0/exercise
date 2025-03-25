import DragClient from "src/app/exercise/drag/page-client";


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
        description: '1번의 짧은 설명'
    },
    {
        id:'table-1-2',
        tableId:'table-1',
        title: '1-2',
        description: '1번의 짧은 설명'
    },
    {
        id:'table-1-3',
        tableId:'table-1',
        title: '1-3',
        description: '1번의 짧은 설명'
    },
    {
        id:'table-2-1',
        tableId:'table-2',
        title: '2-1',
        description: '2번의 짧은 설명'
    },
    {
        id:'table-2-2',
        tableId:'table-2',
        title: '2-1',
        description: '2번의 짧은 설명'
    },
    {
        id:'table-3-1',
        tableId:'table-3',
        title: '3-1',
        description: '3번의 짧은 설명'
    },
    {
        id:'table-3-2',
        tableId:'table-3',
        title: '3-2',
        description: '3번의 짧은 설명'
    },
    {
        id:'table-3-3',
        tableId:'table-3',
        title: '3-3',
        description: '3번의 짧은 설명'
    },
    {
        id:'table-3-4',
        tableId:'table-3',
        title: '3-4',
        description: '3번의 짧은 설명'
    },
]

export default function Home() {

   return (
      <div className="h-screen flex items-center justify-center">
          <DragClient tables={tempTable} items={tempItems} />
      </div>
   );
}
