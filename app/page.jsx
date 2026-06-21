"use client";

import {Card, Loading, Title, Typewriter, Collapse} from 'animal-island-ui'
import {useEffect, useState} from "react";
import Image from "next/image";

export default function Home() {

    const [data, setData] = useState(null);
    const [history, setHisotry] = useState(null);

    useEffect(() => {
        fetch(`/api/merchant/current`)
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);

        fetch(`/api/merchant/history`)
            .then((res) => res.json())
            .then(setHisotry)
            .catch(console.error);
    }, []);

    if (!data) {
        return <Loading active={true} style={{position: 'absolute', inset: 0, height: '100%'}}/>;
    }

    return (
        <div className="mx-auto max-w-4xl px-4">
            <div className="my-12 flex justify-center">
                <Title
                    color="app-orange"
                    size="large"
                >
                    今日远行商人
                </Title>
            </div>

            <div className="mb-6 flex justify-center">
                <Typewriter>
                    <p>
                        每4小时换一次货 · 别错过当前班次
                    </p>
                </Typewriter>
            </div>

            <Card className="mb-6" type="dashed">
                当前班次：{data.round.date} {data.round.slot}
            </Card>

            <div className="flex flex-col gap-4 mb-6">
                {
                    data.round.items.map((item) => (
                        <Card className="flex items-center gap-4 p-4" key={item.name}>
                            <div className="relative shrink-0">
                                <Card type="dashed"
                                      className="flex h-16 w-16 items-center justify-center p-2!">
                                    <div className="relative shrink-0">
                                        <Image
                                            src={item.icon_url}
                                            alt={item.name}
                                            width={40}
                                            height={40}
                                            className="object-contain"
                                        />
                                    </div>
                                </Card>
                                {/* 数量角标 */}
                                <span className="
                                absolute
                                -right-1
                                -top-1
                                flex
                                h-6
                                min-w-6
                                items-center
                                justify-center
                                rounded-full
                                bg-[#ff9f43]
                                px-1.5
                                text-[11px]
                                font-bold
                                text-white
                                shadow
                            ">x{item.purchase_limit}</span>
                            </div>

                            {/* 内容 */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        {item.name}
                                    </h4>
                                    <span
                                        className="rounded-full bg-[#f0e8d8] px-2 py-0.5 text-[10px] font-medium text-[#a08060]">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </Card>
                    ))
                }
            </div>

            {/*过去的3个班次*/}
            {
                history && (
                    <>
                        <div className="my-12 flex justify-center">
                            <Title
                                color="brown"
                                size="middle"
                            >
                                历史商品
                            </Title>
                        </div>
                        <div className="mb-6 flex justify-center">
                            <Typewriter>
                                <p>
                                    过去的3个班次
                                </p>
                            </Typewriter>
                        </div>

                        <div className="flex flex-col gap-4 mb-6">
                            {
                                history.rounds.map((round) => (
                                    <Collapse key={round.round_id} question={`${round.date} ${round.slot}`} defaultExpanded
                                              answer={
                                                  round.items.map(item => (
                                                      <span
                                                          key={item.name}
                                                          className="
                                                          m-1
                                                          rounded-full
                                                          bg-[#f0e8d8]
                                                          px-2
                                                          py-0.5
                                                          text-[0.8rem]
                                                          font-medium
                                                          text-[#a08060]">
                                                        {item.name}
                                                    </span>
                                                  ))
                                              }
                                    />
                                ))
                            }

                        </div>
                    </>
                )
            }
        </div>
    );
}
