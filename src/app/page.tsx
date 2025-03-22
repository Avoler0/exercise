
import React from "react";
import {FullPageWrap, FullPage, FullPageNav} from "src/component/FullPage.Cmp";

export default async function Home(props) {
    return (
        <>
            <FullPageWrap>
                <FullPage >
                    <div className="h-screen flex items-center justify-center">
                        <p className="text-3xl">테스트 풀 페이지 1</p>
                    </div>
                </FullPage>
                <FullPage >
                    <div className="h-screen flex items-center justify-center">
                        <p className="text-3xl">테스트 풀 페이지 2</p>
                    </div>
                </FullPage>
                <FullPage >
                    <div className="h-screen flex items-center justify-center">
                        <p className="text-3xl">테스트 풀 페이지 3</p>
                    </div>
                </FullPage>
            </FullPageWrap>

            <FullPageNav />
        </>
    );
}
