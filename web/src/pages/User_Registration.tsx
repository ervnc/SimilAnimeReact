import '../styles/main.css';
import { Popover } from '@headlessui/react'
import imgLogo from '../assets/logo_similanime.svg';
import Input from '../components/Input';
import { Eye } from 'phosphor-react';
import { FormEvent } from 'react';
import axios from 'axios';

function User_Registration() {

    async function handleCreateUser(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        try {
            await axios.post('http://localhost:1111/user_registration', {
                username: data.username, 
                password: data.password, 
                name: data.name,
                weight: Number(data.weight),
                height: Number(data.height),
                blood_type: data.blood_type,
                gender: data.gender,
                sexuality: data.sexuality,
                birth_date: data.birth_date,
                zodiac_sign: data.zodiac_sign,
                mbti: data.mbti,
                occupation: data.occupation,
            })

            alert('SUCESSO')
        } catch(err) {
            console.log(err);
            alert('ERRO');
        }
    }


    return (
        <div className='mx-auto flex flex-col h-screen bg-background_user_registration bg-cover bg-no-repeat shadow-left'>
            <Popover className="relative bg-[#222020] shadow-menu">
                <div className="mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex justify-start">
                            <a href="#">
                                <img
                                    className="h-16 w-auto mt-2"
                                    src={imgLogo}
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </Popover>

            <h1 className='text-4xl text-white font-bold mt-12 ml-40'>
                <span className='text-[#17E9AA]'>User </span>
                 Registration
            </h1>

            <hr className='w-32 ml-40 mt-7 border-[#17E9AA]' />

            <h5 className='max-w-[260px] text-white text-2xl mt-7 ml-40'>
                The system that shows you
                <span className='text-[#17E9AA]'> who you </span>
                look like.
            </h5>

            <form className='ml-48' onSubmit={handleCreateUser}>
                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="username" name="username" placeholder="Username" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="weight" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="height" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="blood_type" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="gender" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="sexuality" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="birth_date" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="zodiac_sign" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="mbti" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input name="occupation" placeholder="Username" autoComplete='off' type='text' />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="name" name="name" placeholder="Name" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="password" name="password" placeholder="Password" type="password" required />
                    <Eye size={24} className='text-white absolute right-4'/>   
                </div>      

                <button className='bg-[#17E9AA] w-36 rounded-2xl h-10 text-white font-bold mt-10 ml-[90px] justify-center'>Next</button>     
            </form>

        </div>
  )
}

export default User_Registration;
