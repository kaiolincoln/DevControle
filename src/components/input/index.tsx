"use client"

import { RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    error?: string;
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
}

export function Input({ type, placeholder, name, error, register, rules }: InputProps){
    return(
        <>
          <input 
            className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            type={type}
            placeholder={placeholder}
            {...register(name, rules)}
            id={name} 
          />       
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
    )
}