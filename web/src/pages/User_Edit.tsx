import axios from "axios";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function User_Edit() {

    const [valuePassword, setValuePassword] = useState('');
    const [userData, setUserData] = useState<any>("");
    const navigate = useNavigate();
    const toast = useRef(null as any);

    // =======================
    // Abrir Toast de sucesso
    // =======================
    const showSuccess = () => {
        toast.current.show({ 
            content:'Successfully edited user!', 
            life: 2000,
            closable: false,
            className: 'bg-[#17e9aacb] border-l-4 border-[#fff]',
            contentClassName: 'justify-center flex text-base items-center font-bold font-quicksand'
        });
    }

    let tokenUsuario = localStorage.getItem("tokenUsuario");
    useEffect(() => {
        axios.get("http://localhost:1111/user", {
            method: "GET",
            headers: {"authorization": `${tokenUsuario}`}
        }).then((response) => {
            console.log(response);
            setUserData(response.data.user[0]);
        })
    }, [])

    async function edit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        let username = localStorage.getItem('username');

        try {
            await axios.post(`http://localhost:1111/users/${username}/edit`, {
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
                image: String(valueImage1),
                //similarity: String(count),
            })
            showSuccess();
            setTimeout(() => {
                navigate('/main_page');
            }, 2000);
        } catch(err) {
            console.log(err);
        }
    }

    const [valueImage1, setValueImage1] = useState('');
    
    return (
        <div className="mx-auto flex flex-col h-screen bg-[#272323] font-quicksand font-normal overflow-x-hidden">
            <Toast ref={toast} className="fixed w-80 right-10 top-10 rounded-md" />

            <div className="flex flex-col items-center">
                <div className='flex items-center relative w-80 mt-12'>
                    <h3 className="text-4xl w-full text-center font-bold font-comfortaa">Edit <span className="text-[#17E9AA]">{userData.username}</span></h3>
                </div>
                <h1 className='text-lg text-white mt-7'>
                    Typed something wrong? Here you can edit your information!
                </h1>
                <hr className='w-32 mt-7 border-[#17E9AA]' />
            </div>

            <form onSubmit={edit} autoComplete='off' className="container mx-auto grid lg:grid-cols-3 lg:px-0 md:grid-cols-1 md:px-32 sm:grid-cols-1 sm:px-32 z-10">
                <div className="flex flex-col items-center">
                    {/* Input image */}
                    <div className='flex items-center relative w-80 mt-12'>
                        <span className="p-float-label w-full">
                            <img src={valueImage1 || userData.image} className="rounded-lg mb-10 ml-[50%] translate-x-[-50%]"/>
                            <InputText id="image" name="image" defaultValue={userData.image} onChange={(e) => setValueImage1(e.target.value)}/>
                        </span>
                    </div>
                </div> 

                <div className="flex flex-col items-center">
                    {/* Input name */}
                    <div className='flex items-center relative w-80 mt-12'>
                        <span className="p-float-label w-full">
                            <InputText id="name" name="name" defaultValue={userData.name} required/>
                            <label htmlFor="name">Name</label>
                        </span>
                    </div>

                    {/* Input password */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <span className='p-float-label w-full'>
                            <Password className="w-full flex" id="password" name="password" value={valuePassword} onChange={(e) => setValuePassword(e.target.value)} toggleMask required/>
                            <label htmlFor="password">Password</label>
                        </span>
                    </div>

                    {/* Input weight */}
                    <div className='flex items-center relative w-80 mt-10'> 
                        <span className='p-float-label w-full'>
                            <InputNumber 
                                id="weight" 
                                name="weight"
                                inputId="currency-us" 
                                value={userData.weight} 
                                mode="decimal" 
                                locale="en-US" 
                                min={0}
                                minFractionDigits={1} 
                                className='w-full inputNumber'
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
                                value={userData.height} 
                                mode="decimal" 
                                locale="en-US" 
                                min={0}
                                minFractionDigits={1}  
                                className='w-full inputNumber'
                                showButtons={true}
                                inputClassName='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'
                                />
                            <label htmlFor="height">Height</label>
                        </span>
                    </div>

                    {/* Input blood type */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <select name="blood_type" id="blood_type" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option defaultValue="" selected={userData.blood_type === ''}>-</option>
                            <option defaultValue="A" selected={userData.blood_type === 'A'}>A</option>
                            <option defaultValue="B" selected={userData.blood_type === 'B'}>B</option>
                            <option defaultValue="AB" selected={userData.blood_type === 'AB'}>AB</option>
                            <option defaultValue="O" selected={userData.blood_type === 'O'}>O</option>
                        </select>
                    </div>     
                </div>

                <div className="flex flex-col items-center">
                    {/* Input gender */}
                    <div className='flex items-center relative w-80 mt-12'>
                        <select name="gender" id="gender" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option defaultValue="" selected={userData.gender === ''}>-</option>
                            <option defaultValue="Male" selected={userData.gender === 'Male'}>Male</option>
                            <option defaultValue="Female" selected={userData.gender === 'Female'}>Female</option>
                            <option defaultValue="Non-binary" selected={userData.gender === 'Non-binary'}>Non-binary</option>
                        </select>   
                    </div>

                    {/* Input sexuality */}
                    <div className='flex items-center relative w-80 mt-10'> 
                        <select name="sexuality" id="sexuality" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                            <option defaultValue="" selected={userData.sexuality === ''}>-</option>
                            <option defaultValue="Straight" selected={userData.sexuality === 'Straight'}>Straight</option>
                            <option defaultValue="Gay" selected={userData.sexuality === 'Gay'}>Gay</option>
                            <option defaultValue="Bi/pan" selected={userData.sexuality === 'Bi/pan'}>Bi/pan</option>
                            <option defaultValue="Asexual" selected={userData.sexuality === 'Asexual'}>Asexual</option>
                        </select>
                    </div>

                    {/* Input birth date */}
                    <div className='flex items-center relative w-80 mt-10'> 
                        <span className='p-float-label w-full'>
                            <InputMask 
                                mask="99/99" 
                                slotChar="mm/dd" 
                                id="birth_date" 
                                name="birth_date" 
                                value={userData.birth_date} 
                                className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl"
                            >
                            </InputMask>
                            <label htmlFor="birth_date">Birth date</label>
                        </span>
                    </div>

                    {/* Input zodiac sign */}
                    <div className='flex items-center relative w-80 mt-10'> 
                        <select name="zodiac_sign" id="zodiac_sign" className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl">
                            <option defaultValue="" selected={userData.zodiac_sign === ''}>-</option>
                            <option defaultValue="Aries" selected={userData.zodiac_sign === 'Aries'}>Aries</option>
                            <option defaultValue="Taurus" selected={userData.zodiac_sign === 'Taurus'}>Taurus</option>
                            <option defaultValue="Gemini" selected={userData.zodiac_sign === 'Gemini'}>Gemini</option>
                            <option defaultValue="Cancer" selected={userData.zodiac_sign === 'Cancer'}>Cancer</option>
                            <option defaultValue="Leo" selected={userData.zodiac_sign === 'Leo'}>Leo</option>
                            <option defaultValue="Virgo" selected={userData.zodiac_sign === 'Virgo'}>Virgo</option>
                            <option defaultValue="Libra" selected={userData.zodiac_sign === 'Libra'}>Libra</option>
                            <option defaultValue="Scorpio" selected={userData.zodiac_sign === 'Scorpio'}>Scorpio</option>
                            <option defaultValue="Sagittarius" selected={userData.zodiac_sign === 'Sagittarius'}>Sagittarius</option>
                            <option defaultValue="Capricorn" selected={userData.zodiac_sign === 'Capricorn'}>Capricorn</option>
                            <option defaultValue="Aquarius" selected={userData.zodiac_sign === 'Aquarius'}>Aquarius</option>
                            <option defaultValue="Pisces" selected={userData.zodiac_sign === 'Pisces'}>Pisces</option>
                        </select>
                    </div>

                    {/* Input MBTI */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <select name="mbti" id="mbti" className='bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl'>
                            <option defaultValue="" selected={userData.mbti === ''}>-</option>
                            <option defaultValue="INTP" selected={userData.mbti === 'INTP'}>INTP</option>
                            <option defaultValue="INTJ" selected={userData.mbti === 'INTJ'}>INTJ</option>
                            <option defaultValue="ENTJ" selected={userData.mbti === 'ENTJ'}>ENTJ</option>
                            <option defaultValue="INFJ" selected={userData.mbti === 'INFJ'}>INFJ</option>
                            <option defaultValue="INFP" selected={userData.mbti === 'INFP'}>INFP</option>
                            <option defaultValue="ENFJ" selected={userData.mbti === 'ENFJ'}>ENFJ</option>
                            <option defaultValue="ENFP" selected={userData.mbti === 'ENFP'}>ENFP</option>
                            <option defaultValue="ISTJ" selected={userData.mbti === 'ISTJ'}>ISTJ</option>
                            <option defaultValue="ISFJ" selected={userData.mbti === 'ISFJ'}>ISFJ</option>
                            <option defaultValue="ESTJ" selected={userData.mbti === 'ESTJ'}>ESTJ</option>
                            <option defaultValue="ESFJ" selected={userData.mbti === 'ESFJ'}>ESFJ</option>
                            <option defaultValue="ISTP" selected={userData.mbti === 'ISTP'}>ISTP</option>
                            <option defaultValue="ISFP" selected={userData.mbti === 'ISFP'}>ISFP</option>
                            <option defaultValue="ESTP" selected={userData.mbti === 'ESTP'}>ESTP</option>
                            <option defaultValue="ESFP" selected={userData.mbti === 'ESFP'}>ESFP</option>
                        </select>
                    </div>

                    {/* Input occupation */}
                    <div className='flex items-center relative w-80 mt-10'>
                        <span className="p-float-label w-full">
                            <InputText id="occupation" name="occupation" defaultValue={userData.occupation}/>
                            <label htmlFor="occupation">Occupation</label>
                        </span>  
                    </div>
                    <button className='bg-[#17E9AA] hover:bg-[#17e9aacb] w-36 rounded-2xl h-10 text-white font-bold mt-10 mb-10 justify-center'>Edit</button>
                </div>
            </form>
            
            {/* Linhas de CSS */}
            <div className='absolute top-0 left-[-10px]'>
                <svg width="206" height="357" viewBox="0 0 206 357" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H206L172.141 43.2875C143.09 80.4295 128.887 127.047 132.296 174.078L134.383 202.88C137.521 246.185 116.001 287.566 78.7463 309.865L0 357V0Z" fill="#17E9AA"/>
                </svg>
            </div>

            <div className="absolute top-0 left-[-10px]">
                <svg width="227" height="378" viewBox="0 0 227 378" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H227L187.752 48.2145C157.056 85.9233 141.985 133.966 145.641 182.451L148.274 217.363C151.603 261.501 129.304 303.631 90.9347 325.699L0 378V0Z" fill="#17E9AA" fill-opacity="0.7"/>
                </svg>
            </div>

            <div className="absolute top-0 left-[-10px]">
                <svg width="248" height="398" viewBox="0 0 248 398" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M0 0H248L203.251 52.9793C170.987 91.1777 155.081 140.555 158.981 190.403L162.174 231.201C165.687 276.101 142.667 318.92 103.277 340.754L0 398V0Z" fill="#17E9AA" fill-opacity="0.6"/>
                </svg>
            </div>

            <div className="absolute bottom-0 right-0">
                <svg width="362" height="477" viewBox="0 0 362 477" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M362 1C358.149 3.90309 354.726 7.31482 351.116 10.8958C348.062 13.9247 345.117 14.0234 342.045 17.1265C338.512 20.6959 334.889 24.1874 331.161 27.7554C329.712 29.1418 325.26 33.6259 324.61 35.6354C322.926 40.8409 319.142 39.8206 316.85 42.5991C311.545 49.0295 303.006 48.9413 298.306 56.7099C297.161 58.602 293.238 59.5195 293.065 62.0243C292.832 65.4114 290.643 65.6951 289.639 67.3387C286.251 72.8824 283.236 82.1064 279.46 86.3974C272.334 94.4955 268.666 114.267 265.149 126.347C263.307 132.672 262.021 138.271 260.21 144.49C258.45 150.535 255.425 157.25 254.97 164.281C254.863 165.936 251.137 173.43 250.435 175.46C249.692 177.605 249.132 178.378 248.217 180.041C247.392 181.543 248.215 184.077 247.512 185.356C244.548 190.745 240.86 198.184 238.845 205.514C235.855 216.387 227.259 224.243 221.41 228.971C219.926 230.17 216.489 231.448 215.766 233.552C215.028 235.697 211.009 238.5 209.618 238.5C207.153 238.5 205.526 241.571 203.269 241.799C200.619 242.066 198.354 241.659 195.811 243.081C190.653 245.967 184.142 246.205 178.779 246.747C176.209 247.006 169.8 248.263 167.693 251.328C166.213 253.48 161.684 251.508 159.731 251.694C156.596 251.995 153.104 255.211 149.955 256.276C144.278 258.196 135.945 261.186 131.613 268.187C129.016 272.386 123.727 276.683 120.326 278.45C118.191 279.559 117.778 282.232 116.093 283.764C114.744 284.991 113.465 284.161 112.364 285.963C108.684 291.986 104.578 293.932 101.681 301.54C98.2946 310.434 92.659 317.564 89.6879 325.913C86.9703 333.55 82.6417 339.993 80.6175 347.354C80.0013 349.595 77.9551 354.932 76.9894 356.883C75.6146 359.661 74.5582 364.603 73.3612 366.779C70.7311 371.562 67.8473 377.655 66.105 383.639C62.175 397.137 55.6251 408.537 50.8869 421.206C48.0653 428.752 43.02 434.34 40.708 442.281C40.4933 443.018 36.0263 449.498 35.4673 449.611C33.4457 450.02 31.3281 456.678 29.8236 459.14C28.223 461.76 23.0097 466.104 20.9548 466.104C18.3544 466.104 16.4015 469.254 13.6985 469.403C9.86944 469.614 4.99793 474.678 1.00002 476" 
                        stroke="#454754" 
                        stroke-linecap="round" 
                        className="animate-loop"
                        stroke-dasharray="8 8"/>
                </svg>
            </div>
        </div>
  );
}

export default User_Edit;