import React from "react";

export function FullPageWrap({children}: any) {
    return (
        <div className="h-screen overflow-hidden w-full">
            {/*{children.map((child,index) => {
                return React.cloneElement(child, {})
            })}*/}
            <FullPage />
            {children}
        </div>
    )
}


export function FullPage(){
    return (
        <section className="h-screen w-full">
            <div className="text flex items-center justify-center">
                <p className="text-3xl">테스트 풀 페이지 1</p>
            </div>
        </section>
    )
}