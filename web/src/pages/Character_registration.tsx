import { Popover } from "@headlessui/react";
import axios from "axios";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imgLogo from '../assets/logo_similanime.svg';
import Input from "../components/Input";


function Character_registration() {

    const [nameCharacter, setNameCharacter] = useState('');
    const [weightVerify, setWeightVerify] = useState(null);
    const [heightVerify, setHeightVerify] = useState(null);
    const [dateVerify, setDateVerify] = useState('');

    const navigate = useNavigate();

    const [teste, setTeste] = useState<any>(['']);

    useEffect(() => {

        (async () => {
    
            let query = `
                query {
                    Page (page: 1, perPage: 25) {
                    pageInfo {
                        total
                        perPage
                        currentPage
                        hasNextPage
                    }
                    characters (search: "${nameCharacter}") {
                        id
                        name {
                            userPreferred
                        }
                        image {
                            large
                        }
                    }
                }
            }`
    
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: query
                })
            }
    
            const resultado = await fetch(`https://graphql.anilist.co`, options);
            const respostaJSON = await resultado.json();
    
            await respostaJSON.data.Page.characters.filter((result: any) => {
                console.log(result.name.userPreferred);
                //setTeste()
            });
            return respostaJSON;
            //console.log(respostaJSON.data.Page.characters);
        })();
    }, [])

    //Get matches to current text input
    
    // setTimeout(() => {
    //     getCharacters().then(res => 
    //         res.data.Page.characters.filter((result: any) => {
    //             console.log(result.name.userPreferred)
    //             setTeste((arr: any) => [...arr, result.name.userPreferred]);
    //         })
    //     )
    // }, 5000);

    async function handleCreateCharacter(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        let username = localStorage.getItem('username');

        try {
            await axios.post(`http://localhost:1111/users/${username}/characters`, {
                usersUsername: username, 
                name: data.name,
                weight: Number(data.weight),
                height: Number(data.height),
                blood_type: data.blood_type,
                gender: data.gender,
                sexuality: data.sexuality,
                birthday: data.birthday,
                zodiac_sign: data.zodiac_sign,
                mbti: data.mbti,
                occupation: data.occupation,
            })
            navigate("/main_page");
        } catch(err) {
            console.log(err);
            alert('ERRO');
        }
    }



    return (
        <div className='mx-auto flex flex-col h-screen bg-background_character_registration bg-cover bg-no-repeat shadow-right font-quicksand font-normal overflow-x-hidden'>

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

            <h1 className='text-4xl text-white font-bold mt-12 ml-[850px] font-comfortaa'>
                <span className='text-[#FFA800]'>Character </span>
                    Registration
            </h1>

            <hr className='w-32 ml-[850px] mt-7 border-[#FFA800]' />

            <h5 className='max-w-[350px] text-white text-xl mt-7 ml-[850px]'>
                Enter the character's name below. If we already know them, we'll put some information about them for you.
                <span className='text-[#17E9AA]'> </span>
            </h5>

            <form className='ml-48' onSubmit={handleCreateCharacter} autoComplete="off">
                <div className='flex items-center relative w-80 mt-10'>
                    {/* <AutoComplete value={nameCharacter} suggestions={teste} completeMethod={matches} field="name" onChange={(e) => setNameCharacter(e.value)} /> */}
                    <Input id="name" name="name" placeholder="Name" type='text' required />   
                    {/* <div>{teste.map( (e: any) => {
                        <div>{ e }</div>
                    })}</div> */}
                </div>

                <div className='flex items-center relative w-80 mt-10'> 
                    <InputNumber 
                        id="weight" 
                        name="weight"
                        placeholder="Weight" 
                        inputId="currency-us" 
                        value={weightVerify} 
                        onValueChange={(e) => setWeightVerify(e.value)} 
                        mode="decimal" 
                        locale="en-US" 
                        minFractionDigits={2} 
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
                        value={heightVerify} 
                        onValueChange={(e) => setHeightVerify(e.value)} 
                        mode="decimal" 
                        locale="en-US" 
                        minFractionDigits={2} 
                        className='w-full'
                        inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                    />
                </div>

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
                        id="birthday" 
                        name="birthday" 
                        placeholder="Birth date" 
                        value={dateVerify} 
                        onChange={(e) => setDateVerify(e.value)}
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
    );
}

export default Character_registration;