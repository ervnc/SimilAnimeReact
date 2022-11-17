import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/menu";
import TableCharacters from "../components/table";
import { Button } from "primereact/button";
import "../components/css/button_registerCharacter.css";
import { Ranking } from "../components/ranking";

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

            <Ranking />

            <div className="w-full mt-40 mb-40">
                <hr className='w-40 border-[#CB77FF] ml-[50%] translate-x-[-50%] rotate-90' />
            </div>

            <Link to="/character_registration" className="w-40 h-10 ml-12">
                <Button label="Register character" className="p-button-success" />
            </Link>

            <TableCharacters />

        </div>
    )
}

export default Main_page;