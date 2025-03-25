"use client";

import {useDropStore} from "src/stores/useDropStore";
import React, {useCallback, useId} from "react";
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
    const dragItemId = useDropStore((state) => state.dragItemId);
    const fromTableId = useDropStore((state) => state.fromTableId);
    const dragItemRef = React.useRef<HTMLElement | null>(null);
    const {setDragItem} = useDropStore();

    React.useEffect(()=>{
        dragItemRef.current = dragItem;
        if(dragItemRef.current) {
            const dragItemContent:HTMLElement | null = dragItemRef.current.querySelector('.in-item');

            const mouseUpHandler = (evt) => {
                if(dragItem){
                    const toTableId = (evt.target as HTMLElement).closest('.drop-table')?.getAttribute('data-table-id');
                    const insertIndex = useDropStore.getState().insertIndex;
                    if(toTableId){
                        console.log('인설트',insertIndex)
                        console.log('투 테이블 있음',toTableId,fromTableId)
                    }

                    dragItem?.classList.remove("draggable");
                    setDragItem(null,null);
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

export function DropTable({key,table,children}:any){
    const enterRef = React.useRef(false);
    const insertIndex = useDropStore.getState().insertIndex;
    const formTableId = useDropStore((state)=>state.fromTableId);
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
            const toTableId = target.dataset.tableId;
            const mouseY = evt.clientY - rect.top;
            const childrens = target.querySelectorAll('li.drop-item');
            if (enterRef.current) {
                let closestIndex = 0;
                let closestOffset = Infinity;

               childrens.forEach((child, index) => {
                   const childRect = child.getBoundingClientRect();
                   const middleY = childRect.top - rect.top + childRect.height / 2;
                   const offset = Math.abs(mouseY - middleY);

                   if(offset < closestOffset){
                       closestOffset = offset;
                       closestIndex = index;
                   }

               })

                const targetRect = childrens[closestIndex].getBoundingClientRect();
                const insertIndex = mouseY > targetRect.top + targetRect.height / 2
                    ? closestIndex + 1
                    : closestIndex;


                console.log('마지막으러 넣는 인썰ㅇ트',insertIndex)
                useDropStore.setState({ insertIndex: insertIndex })
                // setInsertIndexRef(insertIndex);
            }
        }, 16),
        []
    );

    return (
        <li key={key} data-table-id={table.id} className="drop-table border p-3 h-full" onMouseEnter={enterHandler} onMouseLeave={leaveHandler}
             onMouseMove={moveHandler}>
            <div>{table.title}</div>
            <ol className="flex flex-col h-full gap-4">
                {React.Children.toArray(children).map((child, index) => (
                    <React.Fragment key={index}>
                        {index === insertIndex && toTableId === table.id && formTableId !== table.id && dragItem && (
                            <DropTableItem item={dragItem} />
                        )}
                        {child}
                    </React.Fragment>
                ))}

                {/* 👇 마지막 인덱스일 때 추가로 렌더링 (children.length === insertIndex인 경우) */}
                {insertIndex === React.Children.count(children) &&
                    toTableId === table.id &&
                    formTableId !== table.id &&
                    dragItem && (
                        <DropTableItem item={dragItem} />
                    )}
            </ol>
        </li>
    )
}

export function DropTableItem({item,children}:any){
    const dragItem = useDropStore((state)=>state.dragItem);
    const {setDragItem,setFromTableId} = useDropStore();

    function evtItemMouseDown(evt){
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

        dragItemPosition(evt,dragItemContent);
        setFromTableId(fromTableId)
        setDragItem(target,item.id);
    }



    return(
        <li data-item-id={item.id} className="drop-item bg-white border-solid border border-gray-400 rounded-lg drag" onMouseDown={evtItemMouseDown}>
            <div className="in-item min-h-16 py-2 px-3 min-w-32">
                <strong>{item.title}</strong>
            </div>
        </li>
    )
}
