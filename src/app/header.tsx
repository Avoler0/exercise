'use client';

import React from "react"
import Link from "next/link";

export default function Header() {
    const refNavSub = React.useRef(null);
    const refHeader = React.useRef(null);
    const [navSubState,setNavSubState] = React.useState(false);

    const navMenu = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "Resume",
            url: null
        },
        {
            name: "Portfolio",
            url: null,
            sub: [
                {
                    name: "Portfolio 1",
                    url: "#",
                },
                {
                    name: "Portfolio 1",
                    url: "#",
                },
                {
                    name: "Portfolio 2",
                    url: "#",
                }
            ]
        },
        {
            name: "Exercise",
            url: null,
            sub:[
                {
                    name: "Drag And Drop",
                    url: "/exercise/drag",
                }
            ]
        }
    ]

    function enterNavigation(evt,sub){
        const targetText = evt.currentTarget.textContent.trim();

        if(sub && refNavSub.current){
            const ulElements = refNavSub.current.querySelectorAll('ul');

            setNavSubState(true);

            ulElements.forEach((ul) => {
                if(ul.dataset.menuName == targetText){
                    ul.classList.add('active');
                }else{
                    ul.classList.remove('active');
                }
            })
        }else{
            setNavSubState(false);
        }
    }

    const leaveSubNav = () => {
        setNavSubState(false);
    };

    function darkMode(){
        const $body = document.getElementsByTagName('body')[0];

        $body.classList.toggle('dark');
    }

    return (
        <React.Fragment>
            <header id="header" ref={refHeader} className={navSubState ? "open-menu" : ""}>
                <div className="inner">
                    <h1 className="title">
                        Exercise
                    </h1>
                    <nav>
                        <ul>
                            {navMenu.map((menu)=>(
                                <li key={menu.name}>
                                    <Link href={menu.url ? menu.url : '#'} onMouseEnter={(evt) => enterNavigation(evt,menu.sub)} >{menu.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="header-utils">
                        <button className="mode" type="button" onClick={darkMode}></button>
                    </div>
                </div>
            </header>
            <div ref={refNavSub} className={`nav-sub ${navSubState ? "drop" : ""}`} onMouseLeave={leaveSubNav}>
                {navMenu.map((menu) =>
                    menu.sub ? (
                        <ul key={menu.name} data-menu-name={menu.name}>
                            {menu.sub.map((sub,index) => (
                                <li key={menu.name + index}>
                                    <Link href={sub.url}>{sub.name}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : null
                )}
            </div>


        </React.Fragment>
    )
}