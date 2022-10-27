import { Popover } from "@headlessui/react";
import { AutoComplete } from "primereact/autocomplete";
import { useEffect, useState } from "react";
import imgLogo from '../assets/logo_similanime.svg';
import Input from "../components/Input";


function Character_registration() {

    const [nameCharacter, setNameCharacter] = useState('');
    const [teste, setTeste] = useState<any>(['']);

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

    //Get matches to current text input
    
    // setTimeout(() => {
    //     getCharacters().then(res => 
    //         res.data.Page.characters.filter((result: any) => {
    //             console.log(result.name.userPreferred)
    //             setTeste((arr: any) => [...arr, result.name.userPreferred]);
    //         })
    //     )
    // }, 5000);



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

            <form className='ml-48'>
                <div className='flex items-center relative w-80 mt-10'>
                    {/* <AutoComplete value={nameCharacter} suggestions={teste} completeMethod={matches} field="name" onChange={(e) => setNameCharacter(e.value)} /> */}
                    <Input id="username" name="username" placeholder="Username" autoComplete='off' type='text' required onChange={(e) => setNameCharacter(e.target.value)} />   
                    <div>{teste.map( (e: any) => {
                        <div>{ e }</div>
                    })}</div>
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="weight" name="weight" placeholder="Weight" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="height" name="height" placeholder="Height" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="blood_type" name="blood_type" placeholder="Blood type" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="gender" name="gender" placeholder="Gender" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="sexuality" name="sexuality" placeholder="Sexuality" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="birth_date" name="birth_date" placeholder="Birth date" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="zodiac_sign" name="zodiac_sign" placeholder="Zodiac sign" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="mbti" name="mbti" placeholder="MBTI" autoComplete='off' type='text' required />   
                </div>

                <div className='flex items-center relative w-80 mt-10'>
                    <Input id="occupation" name="occupation" placeholder="Occupation" autoComplete='off' type='text' required />   
                </div>

                <button className='bg-[#17E9AA] w-36 rounded-2xl h-10 text-white font-bold mt-10 ml-[90px] justify-center'>Next</button>     
            </form>

        </div>
    );
}

export default Character_registration;