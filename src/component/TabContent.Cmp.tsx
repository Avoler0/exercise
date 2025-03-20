import React from "react";
import clsx from "clsx";

type TabContentGroupProps = {
    children: React.ReactNode;
    activeTab:number;
}

type TabContentProps = {
    children: React.ReactNode;
}


export function TabContentGroup({children,activeTab}:TabContentGroupProps){
    console.log('액티브 탭',activeTab)
    return(
        <div className="tab-content-group" data-active-tab="0">
            {React.Children.toArray(children).map((child, index) => {
                if (React.isValidElement(child)) {
                    return (
                        <React.Fragment key={index}>
                            {React.cloneElement(child, {showTab: activeTab == index})}
                        </React.Fragment>
                    )
                }
            })}
        </div>
    )
}

export function TabContent({children, showTab}: TabContentProps) {

    console.log('쇼우 탭',showTab)
    return (
        <div key="0" className={clsx("tab-content",showTab && "show")}>
            {children}
        </div>
    )
}
