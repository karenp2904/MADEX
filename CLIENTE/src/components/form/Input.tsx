import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

interface InputProp {
    name: string;
    label?: string;
    isPasswordInput?: boolean;
    hasError?: boolean;
    formData: {[key: string]: string};
    setFormData: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
}

export const Input = ({
    name,
    label,
    isPasswordInput = false,
    formData,
    setFormData
}: InputProp) => { 
           
    const [inputType, setInputType] = useState(isPasswordInput ? 'password' : 'text');

    const togglePasswordVisibility = () => {
        setInputType((prevInputType) => (prevInputType === 'password' ? 'text' : 'password'));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-semibold text-primary-color">
                {label}
            </label>
            <div className="relative">
                <input
                    name={name}
                    type={isPasswordInput ? inputType : 'text'}
                    value={formData[name]} // Verificar si name está definido antes de acceder a formData[name]
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-1 rounded-xl placeholder-text-primary-color border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                />

                {isPasswordInput && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400"
                        onClick={togglePasswordVisibility}
                    >
                        {
                            inputType === 'password'
                            ? <EyeIcon className="w-5 h-5" />
                            : <EyeSlashIcon className="w-5 h-5" />
                        }
                    </button>
                )}
            </div>
        </div>
    );
};