import '../styles/main.css';
import { Popover } from '@headlessui/react'
import imgLogo from '../assets/logo_similanime.svg';
import Input from '../components/Input';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';

function User_Registration() {

    const [value3, setValue3] = useState('');
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const navigate = useNavigate();

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
            navigate("/");
        } catch(err) {
            console.log(err);
            alert('ERRO');
        }
    }

    return (
        <div className='mx-auto flex flex-col h-screen bg-background_user_registration bg-cover bg-no-repeat shadow-left font-quicksand font-normal overflow-x-hidden'>

            <Popover className="relative bg-[#222020] shadow-menu">
                <div className="mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex justify-start">
                            <a href="/">
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

            <h1 className='text-4xl text-white font-bold mt-12 ml-40 font-comfortaa'>
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
                    <Input id="name" name="name" placeholder="Name" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    {/* <Input id="password" name="password" placeholder="Password" type="password" required /> */}
                    <Password 
                        value={value3} 
                        inputClassName="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl"
                        className='w-full'
                        placeholder='Password'
                        id="password" 
                        name="password" 
                        onChange={(e) => setValue3(e.target.value)} 
                        panelClassName="w-24 h-14 absolute mt-2 rounded bg-color_input text-white p-4"
                        toggleMask
                        required
                    />  
                </div>      

                <div className='flex items-center relative w-80 mt-10'> 
                    <InputNumber 
                        id="weight" 
                        name="weight"
                        placeholder="Weight" 
                        inputId="currency-us" 
                        value={value1} 
                        onValueChange={(e) => setValue1(e.value1)} 
                        mode="decimal" 
                        locale="en-US" 
                        minFractionDigits={2} 
                        autoComplete='off' 
                        className='w-full'
                        inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                        />
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <InputNumber 
                        id="height" 
                        name="height" 
                        placeholder="Height" 
                        inputId="currency-us" 
                        value={value1} 
                        onValueChange={(e) => setValue1(e.value1)} 
                        mode="decimal" 
                        locale="en-US" 
                        minFractionDigits={2} 
                        autoComplete='off' 
                        className='w-full'
                        inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                        />
                </div>

                {/* <div className='flex items-center relative w-80 mt-10'>
                    <Input id="blood_type" name="blood_type" placeholder="Blood type" autoComplete='off' type='text' required />   
                </div> */}

                <div className='flex items-center relative w-80 mt-10'>
                    <select name="blood_type" id="blood_type" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                        <option value="" selected>Select a blood type</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                    </select>
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <select name="gender" id="gender" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                        <option value="">Select a gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                    </select>   
                </div>

                <div className='flex items-center relative w-80 mt-10'> 
                    <select name="sexuality" id="sexuality" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                        <option value="" selected>Select a sexuality</option>
                        <option value="Straight">Straight</option>
                        <option value="Gay">Gay</option>
                        <option value="Bi/pan">Bi/pan</option>
                        <option value="Asexual">Asexual</option>
                    </select>
                </div>

                <div className='flex items-center relative w-80 mt-10'> 
                    <InputMask 
                        mask="99/99/9999" 
                        slotChar="mm/dd/yyyy" 
                        id="birth_date" 
                        name="birth_date" 
                        placeholder="Birth date" 
                        value={value} 
                        onChange={(e) => setValue(e.value)}
                        className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl"
                        autoComplete='off'>
                    </InputMask>                    
                </div>

                <div className='flex items-center relative w-80 mt-10'> 
                    <select name="zodiac_sign" id="zodiac_sign" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                        <option value="">Select a zodiac sign</option>
                        <option value="Aries">Aries</option>
                        <option value="Taurus">Taurus</option>
                        <option value="Gemini">Gemini</option>
                        <option value="Cancer">Cancer</option>
                        <option value="Leo">Leo</option>
                        <option value="Virgo">Virgo</option>
                        <option value="Libra">Libra</option>
                        <option value="Scorpio">Scorpio</option>
                        <option value="Sagittarius">Sagittarius</option>
                        <option value="Capricorn">Capricorn</option>
                        <option value="Aquarius">Aquarius</option>
                        <option value="Pisces">Pisces</option>
                    </select>
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <select name="mbti" id="mbti" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option value="" selected>Select a MBTI</option>
                            <option value="INTP">INTP</option>
                            <option value="INTJ">INTJ</option>
                            <option value="ENTJ">ENTJ</option>
                            <option value="INFJ">INFJ</option>
                            <option value="INFP">INFP</option>
                            <option value="ENFJ">ENFJ</option>
                            <option value="ENFP">ENFP</option>
                            <option value="ISTJ">ISTJ</option>
                            <option value="ISFJ">ISFJ</option>
                            <option value="ESTJ">ESTJ</option>
                            <option value="ESFJ">ESFJ</option>
                            <option value="ISTP">ISTP</option>
                            <option value="ISFP">ISFP</option>
                            <option value="ESTP">ESTP</option>
                            <option value="ESFP">ESFP</option>
                    </select>
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="occupation" name="occupation" placeholder="Occupation" autoComplete='off' type='text' />   
                </div>
                

                <button className='bg-[#17E9AA] w-36 rounded-2xl h-10 text-white font-bold mt-10 ml-[90px] justify-center'>Next</button>     
            </form>

        </div>
  )
}

export default User_Registration;
