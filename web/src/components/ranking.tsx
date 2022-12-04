import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export function Ranking() {

    const [nameCharacter, setNameCharacter] = useState<any[]>([]);

    const username = localStorage.getItem('username');
    useEffect(() => {
        const fetchData = async() => {
            await axios.get(`http://localhost:1111/users/${username}/characters/order`).then(res => {
                console.log(res);
                setNameCharacter(res.data.order);
            })
        }
        fetchData().catch(console.error);
    }, [])

    const [finishedTimeout, setFinishedTimeout] = React.useState(false);
    React.useEffect(() => {
        const id = setTimeout(() => {
            setFinishedTimeout(true);
        }, 500);

        return () => clearTimeout(id);
    }, []);

    const calcColor = (percent: any, start: any, end: any) => {
        let a = percent / 100
        let b = (end - start) * a
        let c = b + start;

        return "hsl(" + c + ", 100%, 50%)";
    }

    return (
        <div>
            {finishedTimeout && 
                <>
                    <div className="w-full flex gap-10 h-52 mt-5">
                        <div className="h-full">
                            <h1 className="text-[#FAFF00] text-4xl top-[50%] translate-y-[-50%] relative">#1</h1>
                        </div>
                        <div className="h-52 w-full bg-[#222020] shadow-lg shadow-[#CB77FF]/80 rounded-2xl p-6">
                            <div className="flex gap-10 h-full items-center">
                                <img className="inline-block h-40 w-40 rounded-full" src={nameCharacter[0] == undefined ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' : nameCharacter[0].image} alt="" />
                                <div className="w-full flex justify-between h-full">
                                    <h1 className="text-white text-4xl">{nameCharacter[0] == undefined ? '' : nameCharacter[0].name}</h1>
                                    <div className="w-24 flex items-center">
                                        <CircularProgressbar
                                            value={nameCharacter[0] == undefined ? '' : nameCharacter[0].similarity}
                                            text={`${nameCharacter[0] == undefined ? '' : nameCharacter[0].similarity} %`}
                                            circleRatio={1}
                                            styles={{
                                                trail: {
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(-180deg)',
                                                    transformOrigin: 'center center',
                                                },
                                                path: {
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(-180deg)',
                                                    transformOrigin: 'center center',
                                                    stroke: calcColor(nameCharacter[0] == undefined ? '' : nameCharacter[0].similarity, 0, 120),
                                                },
                                                text: {
                                                    fill: '#ddd'
                                                },
                                            }}
                                            strokeWidth={7}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-10 h-52 mt-16">
                        <div className="h-full">
                            <h1 className="text-white text-3xl top-[50%] translate-y-[-50%] relative">#2</h1>
                        </div>
                        <div className="h-52 w-[996px] bg-[#222020] shadow-lg shadow-[#CB77FF]/80 rounded-2xl p-6">
                            <div className="flex gap-10 h-full items-center">
                                <img className="inline-block h-32 w-32 rounded-full" src={nameCharacter[1] == undefined ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' : nameCharacter[1].image} alt="" />
                                <div className="w-full flex justify-between h-full">
                                    <h1 className="text-white text-3xl">{nameCharacter[1] == undefined ? '' : nameCharacter[1].name}</h1>
                                    <div className="w-20 flex items-center">
                                        <CircularProgressbar
                                            value={nameCharacter[1] == undefined ? '' : nameCharacter[1].similarity}
                                            text={`${nameCharacter[1] == undefined ? '' : nameCharacter[1].similarity} %`}
                                            circleRatio={1}
                                            styles={{
                                                trail: {
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(-180deg)',
                                                    transformOrigin: 'center center',
                                                },
                                                path: {
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(-180deg)',
                                                    transformOrigin: 'center center',
                                                    stroke: calcColor(nameCharacter[1] == undefined ? '' : nameCharacter[1].similarity, 0, 120),
                                                },
                                                text: {
                                                    fill: '#ddd'
                                                },
                                            }}
                                            strokeWidth={7}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex gap-10 h-52 mt-16">
                        <div className="h-full">
                            <h1 className="text-white text-3xl top-[50%] translate-y-[-50%] relative">#3</h1>
                        </div>
                        <div className="h-52 w-[796px] bg-[#222020] shadow-lg shadow-[#CB77FF]/80 rounded-2xl p-6">
                            <div className="flex gap-10 h-full items-center">
                                <img className="inline-block h-28 w-28 rounded-full" src={nameCharacter[2] == undefined ? 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' : nameCharacter[2].image} alt="" />
                                <div className="w-full flex justify-between h-full">
                                    <h1 className="text-white text-2xl">{nameCharacter[2] == undefined ? '' : nameCharacter[2].name}</h1>
                                    <div className="w-16 flex items-center">
                                        <CircularProgressbar
                                            value={nameCharacter[2] == undefined ? '' : nameCharacter[2].similarity}
                                            text={`${nameCharacter[2] == undefined ? '' : nameCharacter[2].similarity} %`}
                                            circleRatio={1}
                                            styles={{
                                                trail: {
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(-180deg)',
                                                    transformOrigin: 'center center',
                                                },
                                                path: {
                                                    strokeLinecap: 'butt',
                                                    transform: 'rotate(-180deg)',
                                                    transformOrigin: 'center center',
                                                    stroke: calcColor(nameCharacter[2] == undefined ? '' : nameCharacter[2].similarity, 0, 120),
                                                },
                                                text: {
                                                    fill: '#ddd'
                                                },
                                            }}
                                            strokeWidth={7}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
