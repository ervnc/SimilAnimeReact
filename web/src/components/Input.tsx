import { InputText } from 'primereact/inputtext';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

function Input(props: InputProps) {
    return(
        <span className="p-float-label w-full">
            <InputText required/>
            <label></label>
        </span>
    )
}

export default Input;