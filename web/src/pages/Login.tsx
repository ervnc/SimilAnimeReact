import '../styles/main.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/md-dark-indigo/theme.css";
import '../components/css/password.css'
import '../components/css/input_float.css';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';

function Login() {

    const navigate = useNavigate();
    const toast = useRef(null as any);
    const [valueUsername, setValueUsername] = useState('');
    const [valuePassword, setValuePassword] = useState('');


    // ====================
    // Abrir Toast de erro
    // ====================
    const showError = () => {
        toast.current.show({ 
            content:'Username or password is invalid!', 
            life: 2000,
            closable: false,
            className: 'bg-[#e74c3c] border-l-4 border-[#fff]',
            contentClassName: 'justify-center flex text-base items-center font-bold font-quicksand'
        });
    }

    // ===============
    // Função do form
    // ===============
    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await axios.post('http://localhost:1111/login', {
                username: data.username, 
                password: data.password,

                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: data.username})
 
            }).then(async response => {

                const respostaJson = await response
                if (respostaJson.data.auth == true) {
                    localStorage.setItem("tokenUsuario", respostaJson.data.token);
                    localStorage.setItem('username', respostaJson.data.user[0].username);
                    console.log(respostaJson);
                    navigate("/main_page");
                } else {
                    showError();
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='mx-auto flex flex-col h-screen bg-background_login bg-cover bg-no-repeat shadow-left font-quicksand font-normal overflow-x-hidden'>

            <Toast ref={toast} className="fixed w-80 right-10 top-10 rounded-md" />

            <h1 className='text-7xl text-white font-medium mt-16 ml-40 font-comfortaa'>
                Simil
                <span className='text-[#1D90F4]'>Anime</span>
            </h1>

            <h5 className='max-w-[260px] text-white text-2xl mt-12 ml-40'>
                The system that shows you
                <span className='text-[#1D90F4]'> who you </span>
                look like.
            </h5>

            <hr className='w-32 ml-40 mt-7 border-[#1D90F4]' />

            <form className='ml-48' onSubmit={handleLogin} autoComplete="off">
                {/* Input username */}
                <div className='flex items-center relative w-80 mt-10'>
                    <span className="p-float-label w-full">
                        <InputText id="username" name="username" value={valueUsername} onChange={(e) => setValueUsername(e.target.value)} required/>
                        <label htmlFor="username">Username</label>
                    </span>
                    <i className="pi pi-user" style={{ 'fontSize': '18px', 'right': '1rem' }}></i>
                </div>

                {/* Input password */}
                <div className='flex items-center relative w-80 mt-10'>
                    <span className='p-float-label w-full'>
                        <Password className="w-full flex" id="password" name="password" value={valuePassword} onChange={(e) => setValuePassword(e.target.value)} feedback={false} toggleMask required/>
                        <label htmlFor="password">Password</label>
                    </span>
                </div>      

                <button className='bg-color_blue hover:bg-[#1d90f4d0] w-40 rounded-2xl h-10 text-white font-bold mt-10 ml-20'>Log in</button>     

                <p className='text-white ml-12 mt-5'>Don't have an account?
                    <Link to='/user_registration' className='text-[#1D90F4] hover:text-[#1d90f4d0]'> Sign up</Link>
                </p> 
            </form>

            <footer className='text-white text-[10px] mt-20 ml-72'>Made by Evandro & Laura</footer>

            {/* Linhas de css */}
            <div className='absolute top-0 left-[-5px]'>
                <svg width="118" height="362" viewBox="0 0 118 362" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M1.91803 361C1.91803 353.437 0 346.063 0 338.467C0 330.869 0 323.271 0 315.673C0 307.963 3.17113 300.858 6.18033 293.296C8.85007 286.588 9.89535 279.825 12.4672 273.11C18.308 257.862 32.1362 244.226 42.0902 229.609C55.5256 209.879 70.0082 189.842 70.0082 168.764C70.0082 135.967 52.9934 103.811 55.8361 70.9377C58.1475 44.2074 85.0084 20.88 117 0" 
                        stroke="#454754" 
                        className='animate-loop'
                        strokeLinecap="round" 
                        strokeDasharray="8 8"/>
                </svg>
            </div>

            <div className='absolute bottom-0 left-0'>
                <svg width="142" height="291" viewBox="0 0 142 291" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M138.689 291C138.689 284.925 141 279.001 141 272.899C141 266.795 141 260.691 141 254.588C141 248.394 137.178 242.686 133.552 236.612C130.335 231.223 129.075 225.79 125.975 220.396C118.937 208.147 102.272 197.193 90.276 185.45C74.0846 169.601 56.6311 153.504 56.6311 136.572C56.6311 110.226 77.1361 84.394 73.7104 57.986C70.9248 36.5129 38.554 17.7734 -2.27813e-06 1" 
                        stroke="#454754" 
                        className='animate-loop'
                        strokeLinecap="round" 
                        strokeDasharray="8 8"/>
                </svg>
            </div>
        </div>
    )
}

export default Login;
