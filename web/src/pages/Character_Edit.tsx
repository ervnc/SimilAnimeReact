import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { ProgressBar } from "primereact/progressbar";
import { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import '../components/css/progress_bar.css';

function Character_Edit() {

    // ==============================
    //  Calcular cor da similaridade
    // ==============================
    const calcColor = (percent: any, start: any, end: any) => {
        let a = percent / 100
        let b = (end - start) * a
        let c = b + start;

        return "hsl(" + c + ", 100%, 50%)";
    }

    const [editCharacter, setEditCharacter] = useState<any>("");
    const [progressSimilarity, setProgressSimilarity] = useState(false);
    const [value1, setValue1] = useState(0);
    const [valueImage, setValueImage] = useState("");
    const progressSimilarityDialog = () => {
        setProgressSimilarity(true);
    }
    const hideProgressSimilarityDialog = () => {
        setProgressSimilarity(false);
    }

    const navigate = useNavigate();

    const {nameCharacter} = useParams();
    let username = localStorage.getItem('username');
    useEffect(() => {
        axios.get(`http://localhost:1111/users/${username}/characters/${nameCharacter}/edit`)
            .then(res => {
                setEditCharacter(res.data.character);
            })
            .catch(err => console.log(err));
    }, [])

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

    async function edit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

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

        let val = value1;
        val = count;

        try {
            await axios.post(`http://localhost:1111/users/${username}/characters/${nameCharacter}/edit`, {
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
                image: String(valueImage),
            })                        
            setValue1(val);
            setTimeout(() => {
                hideProgressSimilarityDialog();
                navigate('/main_page');
            }, 5000);
        } catch(err) {
            console.log(err);
            alert("ERRO");
        }
    }

    return (
        <div className="mx-auto flex flex-col h-screen bg-[#272323] font-quicksand font-normal overflow-x-hidden">     
            
            <div className="flex flex-col items-center">
                <div className='flex items-center relative w-80 mt-12'>
                    <h3 className="text-4xl w-full text-center font-bold font-comfortaa">Edit <span className="text-[#FFA800]">character</span></h3>
                </div>
                <h1 className='text-lg text-white mt-7'>
                    Typed something wrong? Here you can edit your character information!
                </h1>
                <hr className='w-32 mt-7 border-[#FFA800]' />
            </div>
            
            <form onSubmit={edit} autoComplete="off" className="container mx-auto grid lg:grid-cols-3 lg:px-0 md:grid-cols-1 md:px-32 sm:grid-cols-1 sm:px-32 z-10">
                {/* Input image */}
                <div className="flex flex-col items-center">
                    <div className='flex items-center relative w-80 mt-12 mb-10'>
                        <span className="p-float-label w-full">
                            <img src={valueImage || editCharacter.image} className="rounded-lg mb-10 ml-[50%] translate-x-[-50%]"/>
                            <InputText id="image" name="image" defaultValue={editCharacter.image} onChange={(e) => setValueImage(e.target.value)}/>
                        </span>
                    </div>
                </div> 

                <div className="flex flex-col items-center">
                    {/* Input name */}
                    <div className='flex items-center relative w-80 mt-12'>
                        <span className="p-float-label w-full">
                            <InputText id="name" name="name" defaultValue={editCharacter.name}/>
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
                                value={editCharacter.weight} 
                                mode="decimal" 
                                locale="en-US"
                                min={0}
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
                                value={editCharacter.height} 
                                mode="decimal" 
                                locale="en-US"
                                min={0} 
                                minFractionDigits={1}  
                                className='w-full inputNumberCharacter'
                                showButtons={true}
                                inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                                />
                            <label htmlFor="height">Height</label>
                        </span>
                    </div>

                    {/* Select blood type */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <select name="blood_type" id="blood_type" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option defaultValue="" selected={editCharacter.blood_type === ''}>-</option>
                            <option defaultValue="A" selected={editCharacter.blood_type === 'A'}>A</option>
                            <option defaultValue="B" selected={editCharacter.blood_type === 'B'}>B</option>
                            <option defaultValue="AB" selected={editCharacter.blood_type === 'AB'}>AB</option>
                            <option defaultValue="O" selected={editCharacter.blood_type === 'O'}>O</option>
                        </select>
                    </div>

                    {/* Select gender */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <select name="gender" id="gender" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option defaultValue="" selected={editCharacter.gender === ''}>-</option>
                            <option defaultValue="Male" selected={editCharacter.gender === 'Male'}>Male</option>
                            <option defaultValue="Female" selected={editCharacter.gender === 'Female'}>Female</option>
                            <option defaultValue="Non-binary" selected={editCharacter.gender === 'Non-binary'}>Non-binary</option>
                        </select>   
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    {/* Select sexuality */}
                    <div className='flex items-center relative w-80 mt-12'> 
                        <select name="sexuality" id="sexuality" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                            <option defaultValue="" selected={editCharacter.sexuality === ''}>-</option>
                            <option defaultValue="Straight" selected={editCharacter.sexuality === 'Straight'}>Straight</option>
                            <option defaultValue="Gay" selected={editCharacter.sexuality === 'Gay'}>Gay</option>
                            <option defaultValue="Bi/pan" selected={editCharacter.sexuality === 'Bi/pan'}>Bi/pan</option>
                            <option defaultValue="Asexual" selected={editCharacter.sexuality === 'Asexual'}>Asexual</option>
                        </select>
                    </div>

                    {/* Input birthday */}
                    <div className='flex items-center relative w-80 mt-10'> 
                        <span className='p-float-label w-full'>
                            <InputMask 
                                mask="99/99" 
                                slotChar="mm/dd" 
                                id="birthday" 
                                name="birthday" 
                                value={editCharacter.birthday} 
                                className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl"
                            >
                            </InputMask>
                            <label htmlFor="birthday">Birth date</label>
                        </span>
                    </div>

                    {/* Select zodiac sign */}
                    <div className='flex items-center relative w-80 mt-10'> 
                        <select name="zodiac_sign" id="zodiac_sign" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                            <option defaultValue="" selected={editCharacter.zodiac_sign === ''}>-</option>
                            <option defaultValue="Aries" selected={editCharacter.zodiac_sign === 'Aries'}>Aries</option>
                            <option defaultValue="Taurus" selected={editCharacter.zodiac_sign === 'Taurus'}>Taurus</option>
                            <option defaultValue="Gemini" selected={editCharacter.zodiac_sign === 'Gemini'}>Gemini</option>
                            <option defaultValue="Cancer" selected={editCharacter.zodiac_sign === 'Cancer'}>Cancer</option>
                            <option defaultValue="Leo" selected={editCharacter.zodiac_sign === 'Leo'}>Leo</option>
                            <option defaultValue="Virgo" selected={editCharacter.zodiac_sign === 'Virgo'}>Virgo</option>
                            <option defaultValue="Libra" selected={editCharacter.zodiac_sign === 'Libra'}>Libra</option>
                            <option defaultValue="Scorpio" selected={editCharacter.zodiac_sign === 'Scorpio'}>Scorpio</option>
                            <option defaultValue="Sagittarius" selected={editCharacter.zodiac_sign === 'Sagittarius'}>Sagittarius</option>
                            <option defaultValue="Capricorn" selected={editCharacter.zodiac_sign === 'Capricorn'}>Capricorn</option>
                            <option defaultValue="Aquarius" selected={editCharacter.zodiac_sign === 'Aquarius'}>Aquarius</option>
                            <option defaultValue="Pisces" selected={editCharacter.zodiac_sign === 'Pisces'}>Pisces</option>
                        </select>
                    </div>

                    {/* Select MBTI */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <select name="mbti" id="mbti" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option defaultValue="" selected={editCharacter.mbti === ''}>-</option>
                            <option defaultValue="INTP" selected={editCharacter.mbti === 'INTP'}>INTP</option>
                            <option defaultValue="INTJ" selected={editCharacter.mbti === 'INTJ'}>INTJ</option>
                            <option defaultValue="ENTJ" selected={editCharacter.mbti === 'ENTJ'}>ENTJ</option>
                            <option defaultValue="INFJ" selected={editCharacter.mbti === 'INFJ'}>INFJ</option>
                            <option defaultValue="INFP" selected={editCharacter.mbti === 'INFP'}>INFP</option>
                            <option defaultValue="ENFJ" selected={editCharacter.mbti === 'ENFJ'}>ENFJ</option>
                            <option defaultValue="ENFP" selected={editCharacter.mbti === 'ENFP'}>ENFP</option>
                            <option defaultValue="ISTJ" selected={editCharacter.mbti === 'ISTJ'}>ISTJ</option>
                            <option defaultValue="ISFJ" selected={editCharacter.mbti === 'ISFJ'}>ISFJ</option>
                            <option defaultValue="ESTJ" selected={editCharacter.mbti === 'ESTJ'}>ESTJ</option>
                            <option defaultValue="ESFJ" selected={editCharacter.mbti === 'ESFJ'}>ESFJ</option>
                            <option defaultValue="ISTP" selected={editCharacter.mbti === 'ISTP'}>ISTP</option>
                            <option defaultValue="ISFP" selected={editCharacter.mbti === 'ISFP'}>ISFP</option>
                            <option defaultValue="ESTP" selected={editCharacter.mbti === 'ESTP'}>ESTP</option>
                            <option defaultValue="ESFP" selected={editCharacter.mbti === 'ESFP'}>ESFP</option>
                        </select>
                    </div>

                    {/* Input occupation */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <span className="p-float-label w-full">
                            <InputText id="occupation" name="occupation" defaultValue={editCharacter.occupation}/>
                            <label htmlFor="occupation">Occupation</label>
                        </span>  
                    </div>
                    
                    <button className='bg-[#FFA800] hover:bg-[#ffaa00c4] w-36 rounded-2xl h-10 text-white font-bold mt-10 justify-center mb-10' onClick={() => progressSimilarityDialog()}>Edit</button>     
                </div>
            </form>

            {/* Linhas de css */}
            <div className="absolute top-0 right-0">
                <svg width="335" height="477" viewBox="0 0 335 477" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H335V477L199.716 437.426C152.907 423.733 119.042 383.073 114.04 334.56L99.1895 190.531C98.146 180.41 95.0543 170.608 90.1024 161.72L0 0Z" fill="#FFA800" fill-opacity="0.6"/>
                </svg>
            </div>

            <div className="absolute top-0 right-0">
                <svg width="313" height="459" viewBox="0 0 313 459" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H313V459L191.076 422.267C144.592 408.263 111.125 367.629 106.289 319.322L92.6972 183.557C91.7075 173.671 88.7635 164.08 84.0362 155.342L0 0Z" fill="#FFA800" fill-opacity="0.7"/>
                </svg>
            </div>

            <div className="absolute top-0 right-0">
                <svg width="278" height="437" viewBox="0 0 278 437" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H278V437L176.749 404.301C131.094 389.557 98.6082 349.036 94.1468 301.267L82.3205 174.639C81.4479 165.296 78.8297 156.2 74.6019 147.822L0 0Z" fill="#FFA800"/>
                </svg>
            </div>

            {/* Dialog similaridade */}
            <Dialog visible={progressSimilarity} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} closable={false} header="Calculating similarity" modal footer={""} onHide={hideProgressSimilarityDialog}>
                <ProgressBar value={value1} color={calcColor(value1, 0, 120)} showValue={true}></ProgressBar>
            </Dialog>
        </div>
    );
}

export default Character_Edit;