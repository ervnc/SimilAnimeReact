import { User, Eye } from 'phosphor-react';
import '../styles/main.css';

import { Link, Routes } from 'react-router-dom';
import Input from '../components/Input';
import { FormEvent } from 'react';
import axios from 'axios';
import RoutesApp from '../routes';

function Login() {

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        console.log(data)

        try {
            await axios.post('http://localhost:1111/login', {
                username: data.username, 
                password: data.password, 
            }).then(response => {console.log(response.data)})
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <div className='mx-auto flex flex-col h-screen bg-background_login bg-cover bg-no-repeat shadow-left'>

            <h1 className='text-7xl text-white font-bold mt-16 ml-40'>
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
