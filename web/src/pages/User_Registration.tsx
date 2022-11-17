import '../styles/main.css';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { InputMask } from 'primereact/inputmask';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import '../components/css/input_number.css';

function User_Registration() {

    const [valueUsername, setValueUsername] = useState('');
    const [valueName, setValueName] = useState('');
    const [valueOccupation, setValueOccupation] = useState('');
    const [valuePassword, setValuePassword] = useState('');
    const [weightVerify, setWeightVerify] = useState(null);
    const [heightVerify, setHeightVerify] = useState(null);
    const [dateVerify, setDateVerify] = useState("");
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
            
            <h1 className='text-4xl text-white font-bold mt-12 ml-40 font-comfortaa z-10'>
                <span className='text-[#17E9AA]'>User </span>
                 Registration
            </h1>


            <h5 className='max-w-[260px] text-white text-2xl mt-7 ml-40 z-10'>
                The system that shows you
                <span className='text-[#17E9AA]'> who you </span>
                look like.
            </h5>

            <hr className='w-32 ml-40 mt-7 border-[#17E9AA]' />

            <form className='ml-48 z-10' onSubmit={handleCreateUser} autoComplete='off'>

                {/* Input username */}
                <div className='flex items-center relative w-80 mt-10'>
                    <span className="p-float-label w-full">
                        <InputText id="username" name="username" value={valueUsername} onChange={(e) => setValueUsername(e.target.value)} required/>
                        <label htmlFor="username">Username</label>
                    </span>
                </div>

                {/* Input name */}
                <div className='flex items-center relative w-80 mt-10'>
                    <span className="p-float-label w-full">
                        <InputText id="name" name="name" value={valueName} onChange={(e) => setValueName(e.target.value)} required/>
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
                            value={weightVerify} 
                            onValueChange={(e) => setWeightVerify(e.value)} 
                            mode="decimal" 
                            locale="en-US" 
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
                            value={heightVerify} 
                            onValueChange={(e) => setHeightVerify(e.value)} 
                            mode="decimal" 
                            locale="en-US" 
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
                            id="birth_date" 
                            name="birth_date" 
                            value={dateVerify} 
                            onChange={(e) => setDateVerify(e.value)}
                            className="bg-color_input px-5 py-4 pr-12 h-full w-full text-white placeholder:text-[#E5E5E5] rounded-xl"
                        >
                        </InputMask>
                        <label htmlFor="birth_date">Birth date</label>
                    </span>
                    {/* <span className="p-float-label w-full">
                        <Controller name="date" control={control} render={({ field }) => (
                            <Calendar className="inputDate" id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm" mask="99/99" showIcon />
                        )} />
                        <label htmlFor="date">Birthday</label>
                    </span>            */}
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
                
                <button className='bg-[#17E9AA] hover:bg-[#17e9aacb] w-36 rounded-2xl h-10 text-white font-bold mt-10 mb-10 ml-[90px] justify-center'>Register</button>     
            </form>

            
            <div className='absolute top-[-100px] left-[-5px]'>
                <svg width="118" height="363" viewBox="0 0 118 363" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M1.91803 362C1.91803 354.437 0 347.063 0 339.467C0 331.869 0 324.271 0 316.673C0 308.963 3.17113 301.858 6.18033 294.296C8.85007 287.588 9.89535 280.825 12.4672 274.11C18.308 258.862 32.1362 245.226 42.0902 230.609C55.5256 210.879 70.0082 190.842 70.0082 169.764C70.0082 136.967 52.9934 104.811 55.8361 71.9377C58.1475 45.2074 85.0084 21.88 117 1" 
                        stroke="#454754" 
                        stroke-linecap="round" 
                        className='animate-loop'
                        stroke-dasharray="8 8"/>
                </svg>  
            </div>

            <div className='absolute bottom-0 left-[-5px]'>
                <svg width="249" height="439" viewBox="0 0 249 439" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        d="M243.934 439C243.934 429.824 248 420.877 248 411.661C248 402.442 248 393.223 248 384.005C248 374.65 241.278 366.029 234.9 356.855C229.241 348.716 227.025 340.51 221.574 332.364C209.193 313.863 179.882 297.319 158.783 279.583C130.305 255.645 99.6066 231.334 99.6066 205.761C99.6066 165.968 135.672 126.954 129.647 87.0685C124.747 54.6367 67.8113 26.3336 1.82635e-06 1" 
                        stroke="#454754" 
                        stroke-linecap="round" 
                        className='animate-loop z-0'
                        stroke-dasharray="8 8"/>
                </svg>
            </div>
        </div>
  )
}

export default User_Registration;
