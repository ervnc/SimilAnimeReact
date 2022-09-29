import { Popover } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import imgLogo from '../assets/logo_similanime.svg';
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/menu";

function Main_page() {

    const [loginStatus, setLoginStatus] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:1111/authenticate").then((response) => {
            if (response.data.erro) {
                navigate("/");
            } else {
                setLoginStatus(response.data.username);
            }
        
        console.log(response);
        })
    }, [])

    function logout() {
        axios.get("http://localhost:1111/logout").then((response) => {
            navigate("/");
        })
    }


    return(
        <div className='mx-auto flex flex-col h-screen bg-[#272323]'>
            <Navbar />

            <h1 className="text-white">Welcome {loginStatus}</h1>

            <button onClick={logout}>Logout</button>

        </div>
    )
}

export default Main_page;