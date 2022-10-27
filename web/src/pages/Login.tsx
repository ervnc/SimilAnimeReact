import { User, Eye, Warning, WindowsLogo } from 'phosphor-react';
import '../styles/main.css';

import { Link, Routes, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { FormEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import 'primeicons/primeicons.css';
import { classNames } from 'primereact';

function Login() {

    const toast = useRef(null as any);

    const showError = () => {
        toast.current.show({ 
            detail:'Username or password is invalid', 
            life: 3000,
            closable: false,
            className: 'w-72 h-10 top-10 right-5 bg-[#e74c3c] text-white rounded p-3 fixed font-bold',
            contentClassName: 'flex items-center h-full w-full'
        });
    }

    const navigate = useNavigate();

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        //console.log(data)

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

            <Toast ref={toast} />

            <h1 className='text-7xl text-white font-bold mt-16 ml-40 font-comfortaa'>
                Simil
                <span className='text-[#1D90F4]'>Anime</span>
            </h1>

            <h5 className='max-w-[260px] text-white text-2xl mt-12 ml-40'>
                The system that shows you
                <span className='text-[#1D90F4]'> who you </span>
                look like.
            </h5>

            <hr className='w-32 ml-40 mt-7 border-[#1D90F4]' />

            <form className='ml-48' onSubmit={handleLogin}>
                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="username" name="username" placeholder="Username" autoComplete='off' type='text' required onChange={undefined}/>
                    <User size={24} className='text-white absolute right-4'/>      
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="password" name="password" placeholder="Password" type='password' autoComplete='off' required onChange={undefined}/>
                    <Eye size={24} className='text-white absolute right-4'/>   
                </div>      

                <button className='bg-color_blue w-40 rounded-2xl h-10 text-white font-bold mt-10 ml-20'>Log in</button>     

                <p className='text-white ml-12 mt-5'>Don't have an account?
                    <Link to='/user_registration' className='text-[#1D90F4]'> Sign up</Link>
                </p> 
            </form>

            <footer className='text-white text-[10px] absolute bottom-5 ml-72'>Made by Evandro & Laura</footer>
        </div>
    )
}

export default Login;
