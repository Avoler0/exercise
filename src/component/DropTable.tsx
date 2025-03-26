"use client";

import {useDropStore} from "src/stores/useDropStore";
import React, {MouseEventHandler, useCallback, useId} from "react";
import clsx from "clsx";
import { throttle } from 'lodash';
import { v4 as uuidv4 } from 'uuid';



function dragItemPosition(evt:MouseEvent,item:HTMLElement){
    if(item){
        const offsetX = evt.clientX;
        const offsetY = evt.clientY;

        if(item instanceof HTMLElement){
            item.style.left = `${offsetX}px`;
            item.style.top = `${offsetY}px`;
        }
    }
}

export function DropTablesGroup({children}:any){
    const groupTableRef = React.useRef<HTMLDivElement>(null);
    const items = useDropStore((state)=>state.items);
    const dragItem = useDropStore((state) => state.dragItem);
    const dragItemRef = React.useRef<HTMLElement | null>(null);

    React.useEffect(()=>{
        dragItemRef.current = dragItem;
        if(dragItemRef.current) {
            const dragItemContent:HTMLElement | null = dragItemRef.current.querySelector('.in-item');

            const mouseUpHandler = (evt) => {
                if(dragItem){
                    const toTableId = (evt.target as HTMLElement).closest('.drop-table')?.getAttribute('data-table-id');
                    const fromTableId = useDropStore.getState().fromTableId;
                    const insertIndex = useDropStore.getState().insertIndex;
                    const dragItemId = dragItem.getAttribute('data-item-id');
                    const dragItemMeta = useDropStore.getState().dragItemMeta;
                    if(toTableId){
                        const newItems = [...items];
                        const dragItemIndex = items.findIndex(item=>item.id === dragItemId);
                        const draggedItem = newItems.splice(dragItemIndex,1)[0];
                        draggedItem.table_id = toTableId;
                        newItems.splice(insertIndex,0,draggedItem);

                        console.log(newItems)
                        useDropStore.setState({items:newItems})
                    }

                    dragItem?.classList.remove("draggable");
                    useDropStore.setState({dragItem:null,dragItemMeta:null,fromTableId:null,toTableId:null});
                }
            }
            const mouseMoveHandler = (evt:MouseEvent) => {  dragItemPosition(evt,dragItemContent); }

            window.addEventListener("mousemove",mouseMoveHandler);
            window.addEventListener("mouseup",mouseUpHandler);

            return () => {
                window.removeEventListener("mousemove",mouseMoveHandler);
                window.removeEventListener("mouseup",mouseUpHandler);
            }
        }
    },[dragItem])

    return (
        <ul ref={groupTableRef} className={clsx("flex relative gap-6 select-none")}>
            {React.Children.toArray(children).map((child:ReactNode, index:number) => {
                return (
                    <React.Fragment key={index}>
                        {React.cloneElement(child,{tableId:`table-${index + 1}`})}
                    </React.Fragment>
                )
            })}
        </ul>
    )
}
// 플레이스 홀더, insertTableId 지정
export function DropTable({key,table,children}:any){
    const enterRef = React.useRef(false);
    const insertIndex = useDropStore.getState().insertIndex;
    const toTableId = useDropStore((state)=>state.toTableId);
    const dragItem = useDropStore((state)=>state.dragItem);
    const { setToTableId } = useDropStore();

    const enterHandler = () => {
        if(!enterRef.current){
            setToTableId(table.id);
            enterRef.current = true;
        }
    }
    const leaveHandler = () => {
        if(enterRef.current){
            enterRef.current = false;
        }
    }
    const moveHandler = useCallback(
        throttle((evt: MouseEvent) => {
            const target = evt.currentTarget as HTMLElement;
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const mouseY = evt.clientY - rect.top;
            const childrens:NodeListOf<Element> | undefined = target.querySelectorAll('li.drop-item');
            if (enterRef.current && childrens.length >= 0) {
                let closestIndex = 0;
                let closestOffset = Infinity;
                let isBelow = false;

               childrens.forEach((child, index) => {
                   const childRect = child.getBoundingClientRect();
                   const middleY = childRect.top - rect.top + childRect.height / 2;
                   const offset = Math.abs(mouseY - middleY);


                   if(offset < closestOffset){
                       closestOffset = offset;
                       closestIndex = index;
                       isBelow = mouseY > middleY;
                   }

               })

                useDropStore.setState({ insertIndex: isBelow ? closestIndex + 1 : closestIndex })
            }
        }, 16),
        []
    );

    return (
        <li key={key} data-table-id={table.id} className="drop-table border p-3 h-full w-52" onMouseEnter={enterHandler} onMouseLeave={leaveHandler}
             onMouseMove={moveHandler}>
            <h3 className="text-gray-500 mb-4 text-xl font-semibold">{table.title}</h3>
            <ol className="flex flex-col h-full gap-4">
                {React.Children.toArray(children).map((child, index) => (
                    <React.Fragment key={index}>
                        {index === insertIndex && toTableId === table.id && dragItem && (
                            <DropTableItemPlaceholder item={dragItem} />
                        )}
                        {child}
                    </React.Fragment>
                ))}

                {/* 👇 마지막 인덱스일 때 추가로 렌더링 (children.length === insertIndex인 경우) */}
                {insertIndex === React.Children.count(children) &&
                    toTableId === table.id &&
                    dragItem && (
                        <DropTableItemPlaceholder item={dragItem} />
                    )}
            </ol>
        </li>
    )
}

export function DropTableItem({item}:any){
    function evtItemMouseDown(evt:React.MouseEvent<HTMLLIElement>){
        if(evt.button !== 0) return;

        const target = evt.currentTarget as HTMLElement;
        const targetRect = target.getBoundingClientRect();
        const width = targetRect.width;
        const height = targetRect.height;
        const dragItemContent = target.querySelector('.in-item');
        const fromTableId = target.closest('.drop-table').dataset.tableId;

        target.style.setProperty("--drop-item-width",width+"px");
        target.style.setProperty("--drop-item-height",height + "px");
        target.classList.add("draggable");

        const offsetX = evt.clientX;
        const offsetY = evt.clientY;

        if(dragItemContent instanceof HTMLElement){
            dragItemContent.style.left = `${offsetX}px`;
            dragItemContent.style.top = `${offsetY}px`;
        }

        useDropStore.setState({ dragItem: target, dragItemMeta:item, fromTableId:fromTableId })
    }

    return(
        <>
            {
                (
                    <li data-item-id={item.id} className="drop-item bg-white border-solid border border-gray-400 rounded-lg drag"
                        onMouseDown={evtItemMouseDown}>
                        <div className="in-item min-h-16 py-2 px-3">
                            <strong>{item.title}</strong>
                            <p>{item.content}</p>
                        </div>
                    </li>
                )
            }
        </>
)
}

export function DropTableItemPlaceholder({item}: any) {


    return (
        <>
            <div className="drop-item-placholder bg-gray-200 rounded-lg"
                 style={{
                     width: item.offsetWidth + "px",
                     height: item.offsetHeight + "px",
                 }}
            >

            </div>
        </>
    )
}
