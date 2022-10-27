import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/menu";
import TableCharacters from "../components/table";
import Progress from "../components/progress";
import { Button } from "primereact/button";

function Main_page() {

    const [loginStatus, setLoginStatus] = useState("");

    const navigate = useNavigate();

    let tokenUsuario = localStorage.getItem("tokenUsuario");
    useEffect(() => {
        axios.get("http://localhost:1111/user", {
            method: "GET",
            headers: {"authorization": `${tokenUsuario}`}
        }).then((response) => {
            if (response.data.auth == false) {
                navigate("/");
            } else {
                setLoginStatus(response.data.user[0].username);
            }
        })
    }, [])

    return(
        <div className='mx-auto flex flex-col h-screen bg-[#272323] font-quicksand font-normal overflow-x-hidden'>

            <Navbar />

            <h1 className="text-4xl text-white font-bold mt-16 ml-40">WELCOME 
                <span className="text-[#CB77FF]"> {loginStatus.toUpperCase()}</span>
            </h1>

            <h5 className='max-w-[450px] text-white text-lg mt-10 ml-40'>
                Here you can see all the characters registered by you. The 3 characters most similar to you are on the top ranking.
            </h5>
            
            <div className="w-full">
                <hr className='w-40 mt-7 border-[#CB77FF] ml-[50%] translate-x-[-50%]' />
            </div>

            <h2 className="text-white text-3xl ml-40 mt-12">TOP</h2>

            <div className="ml-40 w-screen flex gap-10 h-52 mt-5">
                <div className="h-full">
                    <h1 className="text-[#FAFF00] text-4xl top-[50%] translate-y-[-50%] relative">#1</h1>
                </div>
                <div className="h-52 w-[896px] bg-[#222020] shadow-lg shadow-[#CB77FF]/80 rounded-2xl p-6">
                    <div className="flex gap-10 h-full items-center">
                        <img className="inline-block h-40 w-40 rounded-full" src="https://play-lh.googleusercontent.com/nCVVCbeSI14qEvNnvvgkkbvfBJximn04qoPRw8GZjC7zeoKxOgEtjqsID_DDtNfkjyo" alt="" />
                        <div className="w-full flex justify-between h-full">
                            <h1 className="text-white text-4xl">Naruto Uzumaki</h1>
                            <div className="w-24 flex items-center">
                                <Progress />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="ml-40 w-screen flex gap-10 h-52 mt-16">
                <div className="h-full">
                    <h1 className="text-white text-3xl top-[50%] translate-y-[-50%] relative">#2</h1>
                </div>
                <div className="h-52 w-[796px] bg-[#222020] shadow-lg shadow-[#CB77FF]/80 rounded-2xl p-6">
                    <div className="flex gap-10 h-full items-center">
                        <img className="inline-block h-32 w-32 rounded-full" src="http://2.bp.blogspot.com/-pQeEMQZrTBE/T-OtfvZTBWI/AAAAAAAABuk/GgL7uHvHgy8/s1600/HinataShippuden.png" alt="" />
                        <div className="w-full flex justify-between h-full">
                            <h1 className="text-white text-3xl">Hinata Hyuuga</h1>
                            <div className="w-20 flex items-center">
                                <Progress />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ml-40 w-screen flex gap-10 h-52 mt-16">
                <div className="h-full">
                    <h1 className="text-white text-3xl top-[50%] translate-y-[-50%] relative">#3</h1>
                </div>
                <div className="h-52 w-[696px] bg-[#222020] shadow-lg shadow-[#CB77FF]/80 rounded-2xl p-6">
                    <div className="flex gap-10 h-full items-center">
                        <img className="inline-block h-28 w-28 rounded-full" src="data:image/jpeg;base64,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" alt="" />
                        <div className="w-full flex justify-between h-full">
                            <h1 className="text-white text-2xl">Sakurajima Mai</h1>
                            <div className="w-16 flex items-center">
                                <Progress />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full mt-40 mb-40">
                <hr className='w-40 border-[#CB77FF] ml-[50%] translate-x-[-50%] rotate-90' />
            </div>

            <Link to="/character_registration" className="w-40 h-10 mb-16">
                <Button label="Register character" className="bg-[#CB77FF] w-full rounded-2xl h-full text-white font-bold mt-10 ml-[90px] justify-center" />
            </Link>

            <TableCharacters />

        </div>
    )
}

export default Main_page;