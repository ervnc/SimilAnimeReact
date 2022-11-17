import axios from "axios";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Character_registration() {

    // const [nameCharacter, setNameCharacter] = useState('');
    const [valueName, setValueName] = useState('');
    const [valueOccupation, setValueOccupation] = useState('');
    const [weightVerify, setWeightVerify] = useState(null);
    const [heightVerify, setHeightVerify] = useState(null);
    const [dateVerify, setDateVerify] = useState("");

    const navigate = useNavigate();

    

        // (async () => {
    
        //     let query = `
        //         query {
        //             Page (page: 1, perPage: 25) {
        //             pageInfo {
        //                 total
        //                 perPage
        //                 currentPage
        //                 hasNextPage
        //             }
        //             characters (search: "${valueName}") {
        //                 id
        //                 name {
        //                     userPreferred
        //                 }
        //                 image {
        //                     large
        //                 }
        //             }
        //         }
        //     }`
    
        //     var options = {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             query: query
        //         })
        //     }
    
        //     const resultado = await fetch(`https://graphql.anilist.co`, options);
        //     const respostaJSON = await resultado.json();
    
        //     await respostaJSON.data.Page.characters.filter((result: any) => {
        //         console.log(result.name.userPreferred);
        //         return (
        //             <>
        //                 <div className="w-10 h-10 z-30">{result.name.userPreferred}</div>
        //             </>
        //         )
        //         //setTeste()
        //     });
        //     return respostaJSON;
        //     // console.log(respostaJSON.data.Page.characters);
        // })();

    let tokenUsuario = localStorage.getItem("tokenUsuario");
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [blood, setBlood] = useState('');
    const [gender, setGender] = useState('');
    const [sexuality, setSexuality] = useState('');
    const [birthday, setBirthday] = useState('');
    const [zodiac, setZodiac] = useState('');
    const [MBTI, setMBTI] = useState('');
    const [occupation, setOccupation] = useState('');


    useEffect(() => {
        axios.get("http://localhost:1111/user", {
            method: "GET",
            headers: {"authorization": `${tokenUsuario}`}
        }).then((response) => {
            console.log(response);
            setWeight(response.data.user[0].weight);
            setHeight(response.data.user[0].height);
            setBlood(response.data.user[0].blood_type);
            setGender(response.data.user[0].gender);
            setSexuality(response.data.user[0].sexuality);
            setBirthday(response.data.user[0].birth_date);
            setZodiac(response.data.user[0].zodiac_sign);
            setMBTI(response.data.user[0].mbti);
            setOccupation(response.data.user[0].occupation);
        })
    }, [])

    async function handleCreateCharacter(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        let username = localStorage.getItem('username');

        let count = 0;
        if (weight != ""){
            if (weight == data.weight) {
                count += 10;
            }
        }
        if (height != "") {
            if (height == data.height) {
                count += 10;
            }
        }
        if (blood != "") {
            if (blood == data.blood_type) {
                count += 10;
            }
        }
        if (gender != "") {
            if (gender == data.gender) {
                count += 10;
            }
        }
        if (sexuality != "") {
            if (sexuality == data.sexuality) {
                count += 10;
            }
        }
        if (birthday != "") {
            if (birthday == data.birthday) {
                count += 10;
            }
        }
        if (zodiac != "") {
            if (zodiac == data.zodiac_sign) {
                count += 10;
            }
        }
        if (MBTI != "") {
            if (MBTI == data.mbti) {
                count += 20;
            }
        }
        if (occupation != "") {
            if (occupation == data.occupation) {
                count += 10;
            }
        }

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
                similarity: String(count),
            })
            navigate("/main_page");
        } catch(err) {
            console.log(err);
            alert('ERRO');
        }
    }

    return (
        <div className='mx-auto flex flex-col h-screen bg-background_character_registration bg-cover bg-no-repeat shadow-right font-quicksand font-normal overflow-x-hidden'>
            <div className="container mx-auto grid lg:grid-cols-2 lg:px-0 md:grid-cols-1 md:px-32 sm:grid-cols-1 sm:px-32">
                <div></div>
                <div className="flex flex-col items-center">
                    <h1 className='text-4xl text-white font-bold mt-12 font-comfortaa'>
                        <span className='text-[#FFA800]'>Character </span>
                            Registration
                    </h1>
                    <hr className='w-32 mt-7 border-[#FFA800]' />

                    <h5 className='max-w-[350px] text-white text-xl mt-7'>
                        Enter the character's name below. If we already know them, we'll put some information about them for you.
                        <span className='text-[#17E9AA]'> </span>
                    </h5>

                    <form onSubmit={handleCreateCharacter} autoComplete="off">
                        {/* Input name */}
                        <div className='flex items-center relative w-80 mt-10'>
                            <span className="p-float-label w-full">
                                <InputText id="name" name="name" value={valueName} onChange={(e) => setValueName(e.target.value)} required/>
                                <label htmlFor="name">Name</label>
                            </span>
                        </div>
            
                        {/* Input weight */}
                        <div className='flex items-center relative w-80 mt-10'> 
                            <span className='p-float-label w-full'>
                                <InputNumber 
                                    id="weight" 
                                    name="weight"
                                    inputId="currency-us" 
                                    value={weightVerify} 
                                    onValueChange={(e) => setWeightVerify(e.value)} 
                                    mode="decimal" 
                                    locale="en-US" 
                                    minFractionDigits={1} 
                                    className='w-full inputNumberCharacter'
                                    showButtons={true}
                                    inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                                    />
                                <label htmlFor="weight">Weight</label>
                            </span>
                        </div>

                        {/* Input height */}
                        <div className='flex items-center relative w-80 mt-10'>
                            <span className='p-float-label w-full'>
                                <InputNumber 
                                    id="height" 
                                    name="height" 
                                    inputId="currency-us" 
                                    value={heightVerify} 
                                    onValueChange={(e) => setHeightVerify(e.value)} 
                                    mode="decimal" 
                                    locale="en-US" 
                                    minFractionDigits={1}  
                                    className='w-full inputNumberCharacter'
                                    showButtons={true}
                                    inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                                    />
                                <label htmlFor="height">Height</label>
                            </span>
                        </div>

                        {/* Input blood type */}
                        <div className='flex items-center relative w-80 mt-10'>
                            <select name="blood_type" id="blood_type" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                                <option value="" selected>Select a blood type</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select>
                        </div>

                        {/* Input gender */}
                        <div className='flex items-center relative w-80 mt-10'>
                            <select name="gender" id="gender" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                                <option value="">Select a gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                            </select>   
                        </div>

                        {/* Input sexuality */}
                        <div className='flex items-center relative w-80 mt-10'> 
                            <select name="sexuality" id="sexuality" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                                <option value="" selected>Select a sexuality</option>
                                <option value="Straight">Straight</option>
                                <option value="Gay">Gay</option>
                                <option value="Bi/pan">Bi/pan</option>
                                <option value="Asexual">Asexual</option>
                            </select>
                        </div>

                        {/* Input birth date */}
                        <div className='flex items-center relative w-80 mt-10'> 
                            <span className='p-float-label w-full'>
                                <InputMask 
                                    mask="99/99" 
                                    slotChar="mm/dd" 
                                    id="birthday" 
                                    name="birthday" 
                                    value={dateVerify} 
                                    onChange={(e) => setDateVerify(e.value)}
                                    className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl"
                                >
                                </InputMask>
                                <label htmlFor="birth_date">Birth date</label>
                            </span>
                        </div>

                        {/* Input zodiac sign */}
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

                        {/* Input MBTI */}
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

                        {/* Input occupation */}
                        <div className='flex items-center relative w-80 mt-10'>
                            <span className="p-float-label w-full">
                                <InputText id="occupation" name="occupation" value={valueOccupation} onChange={(e) => setValueOccupation(e.target.value)}/>
                                <label htmlFor="occupation">Occupation</label>
                            </span>  
                        </div>

                        <button className='bg-[#FFA800] hover:bg-[#ffaa00c4] w-36 rounded-2xl h-10 text-white font-bold mt-10 ml-[90px] justify-center mb-10'>Register</button>     
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Character_registration;