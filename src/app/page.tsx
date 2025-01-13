"use client";

import Image from "next/image";
import React, {useEffect} from "react";
import {debounce} from "next/dist/server/utils";


export default function Home() {
    const dragStartRef = React.useRef(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        // if(listRef.current){
        //     const $list = listRef.current;
        //     const $columns = $list.querySelectorAll('.column');
        //
        //     document.addEventListener("mousedown",(event)=>{
        //         const $target = event.target as HTMLElement;
        //
        //         if (listRef.current && listRef.current.contains($target)) {
        //             if ($target.classList.contains("card")) {
        //                 dragStartRef.current = {
        //                     element: $target,
        //                     column: $target.closest('.column'),
        //                     x: event.clientX,
        //                     y: event.clientY
        //                 }
        //                 mouseDownRef.current = true;
        //                 console.log(listRef.current.contains($target),'다운')
        //
        //             } else {
        //                 return;
        //             }
        //         }
        //     })
        //
        //     document.addEventListener("mousemove",debounce((event: MouseEvent) => {
        //         if(mouseDownRef.current){
        //             const $target = dragStartRef.current.element;
        //             const $column = $target.closest('.column');
        //             // console.log($column === dragStartRef.current.column,'같나?',event);
        //
        //             $target.classList.add("dragging");
        //             $target.classList.add("asd");
        //             $target.style.transform = `translate(${event.clientX - dragStartRef.current.x}px, ${event.clientY - dragStartRef.current.y}px)`;
        //         }
        //     }, 20));
        //
        //     document.addEventListener("dragenter",debounce((event: MouseEvent) => {
        //         console.log(event);
        //     }, 20));
        //
        //     function cardDragEnd(event){
        //         if(mouseDownRef.current){
        //             const $target = dragStartRef.current.element;
        //             mouseDownRef.current = false;
        //
        //             $target.classList.remove("dragging");
        //             $target.style.transform = ``;
        //         }
        //     }
        //
        //     document.addEventListener("mouseup",cardDragEnd)
        //
        //     document.addEventListener("dragend",cardDragEnd)
        //
        // }

    }, []);

    function dragStart(event){
        const $target = event.target as HTMLElement;
        const $dragClone = $target.cloneNode(true);
        const rect = $target.getBoundingClientRect();

        const dragX = event.clientX - rect.left;
        const dragY = event.clientY - rect.top;
        console.log(event)

        $dragClone.style.position = "absolute";
        $dragClone.style.top = "-9999px"; // 화면 밖으로 이동
        $dragClone.style.pointerEvents = "none";
        $dragClone.style.width = `${$target.offsetWidth}px`;
        $dragClone.style.height = `${$target.offsetHeight}px`;

        document.body.appendChild($dragClone);
        if (event.dataTransfer) {
            event.dataTransfer.setDragImage($dragClone, dragX, dragY);
        } else {
            console.error("dataTransfer is not supported during dragStart.");
        }

        console.log($dragClone)

        $target.classList.add("dragging");
        dragStartRef.current = {
            element: $target,
            column: $target.closest('.column'),
            x: event.clientX,
            y: event.clientY
        }
    }

    function dragMove(event){
        event.preventDefault();
        // console.log(event);
    }
    function dragEnd(event){
        event.preventDefault();

        const $target = event.target as HTMLElement;
        $target.classList.remove("dragging");
    }

    const dragTest = debounce((event: MouseEvent) => {
        if(dragStartRef.current.element){
            const $target = event.target as HTMLElement;
            const clientY = event.clientY;
            const childCards = $target.closest('.column').querySelectorAll('.card');

            console.log(childCards)
            let closestChild = null;
            let closestDistance = Infinity;

            childCards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const childCenter = rect.top + rect.height / 2;
                const distance = Math.abs(clientY - childCenter);

                // console.log(childCenter,clientY,distance,closestChild)

                if(distance < closestDistance){
                    closestDistance = distance;
                    closestChild = card;
                }
            })


            if((closestChild.offsetHeight / 2) > closestDistance){
                closestChild.before(dragStartRef.current.element);
            }else{
                closestChild.after(dragStartRef.current.element);
            }
        }
    },20)

    document.addEventListener("mouseup",debounce((event: MouseEvent) => {
        const $target = dragStartRef.current.element;

        $target.classList.remove("dragging");
    }, 20));

    function listCard(_,index) {
        return <li key={index} className="card"
                   draggable="true"
                   onDragStart={(event) => dragStart(event)}
                   onDrag={(event) => dragMove(event)}
                    onDragEnd={(event) => dragEnd(event)}
            >
            <div className="in-drag">
                <div className="">
                    <img src="/images/temp_img01.png" alt="logo" draggable="false" />
                </div>
                <div className="">
                    <strong>1234 ${index}</strong>
                </div>
            </div>
        </li>;
        // return <li key={index} className="card" onDragStart={dragStart} onDrag={dragMove} onDragEnd={dragEnd}></li>;
    }

    document.addEventListener("mouseup", (event) => {

    })

    return (
        <div className="list" ref={listRef}>
            <div className="column" onDragOver={dragTest}>
                <ol data-list-id="1" >
                    {new Array(3).fill(0).map(listCard)}
                </ol>
            </div>
            <div className="column" onDragOver={dragTest}>
                <ol data-list-id="1">
                    {new Array(2).fill(0).map(listCard)}
                </ol>
            </div>
            <div className="column" onDragOver={dragTest}>
                <ol data-list-id="1">
                    {new Array(1).fill(0).map(listCard)}
                </ol>
            </div>

        </div>
    );
}
