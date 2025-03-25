"use client";

import React, { createContext, useContext } from "react";
import {useFullPageStore} from "src/stores/useFullPageStore";
import clsx from "clsx";

export function FullPageWrap({children}: any) {
    const { setLength } = useFullPageStore();
    const debounceRef = React.useRef(false);
    const fullWrapRef = React.useRef(null);
    const hideTimeRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(()=>{
        setLength(React.Children.count(children))

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        if(window){
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
            window?.addEventListener('mousewheel',  evtMouseWheel);

            return () => {
                document.body.style.overflow = "";
                window?.removeEventListener('mousewheel',  evtMouseWheel);
            }
        }
    },[window])

    function evtMouseWheel(evt: MouseEvent) {
        const vH = window.innerHeight;
        const isUp = evt.deltaY < 0;
        const store = useFullPageStore.getState();
        const duration = 1000;
        let move = true;
        let hideTime = null;

        if(debounceRef.current) return;
        debounceRef.current = true;

        const max = React.Children.count(children);
        let nextAnchor = isUp ? store.anchor - 1 : store.anchor + 1;
        let nextOffset = isUp ? store.offset + vH : store.offset - vH;

        if(isUp && store.anchor === 1) {
            nextAnchor = 1;
            nextOffset = 0;
            move = false;
        }

        if(!isUp && store.anchor === max){
            nextAnchor = max;
            nextOffset = store.offset;
            move = false;
        }

        store.setOffset(nextOffset);
        store.setAnchor(nextAnchor);

        const target = fullWrapRef?.current as HTMLElement | null;
        if(target) {
            target.setAttribute('data-anchor', String(nextAnchor));
            target.style.transform = `translate3d(0, ${nextOffset}px, 0)`;
            target.style.transition = `transform ${duration}ms`;
        }

        if(move){
            document?.querySelector("header#header").classList.add('hide');
            if (hideTimeRef.current) {
                clearTimeout(hideTimeRef.current);
            }
            hideTimeRef.current = setTimeout(()=>{
                document?.querySelector("header#header").classList.remove('hide');
            },duration * 1.1)
        }

        setTimeout(()=>{
            debounceRef.current = false;
        },duration)

    }

    return (
        <div ref={fullWrapRef} className="h-full overflow-hidden" style={{
            transform: "translate3d(0px,0px,0px)"
        }}>
            {children}
        </div>
    )
}


export function FullPage({children}:any){
    return (
        <section className="h-screen relative w-full">
            {children}
        </section>
    )
}


export function FullPageNav() {
    const childrenLength = useFullPageStore((state) => state.length);
    const anchor = useFullPageStore((state) => state.anchor); // 상태 구독

    if(childrenLength == 0) return;

    return (
        <div className="fixed top-1/2 -translate-x-1/2 right-5 flex flex-col gap-2">
            {
                childrenLength > 0 &&
                Array.from({length: childrenLength}, (_, i) => (
                    <span
                        key={i}
                        className={clsx("block h-6 bg-gray-300 mb-1 overflow-hidden rounded-3xl relative w-2 before:content-[''] before:block before:duration-500 before:absolute before:top-0 before:w-full", anchor == i + 1 && "before:bg-gray-500 before:h-full")}
                    ></span>
                ))
            }
        </div>
    );
}
