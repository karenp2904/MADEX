import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface Option {
    valor: string;
    text: string;
}

interface SelectProps {
    name: string;
    label?: string;
    formData: {[key: string]: string};
    setFormData: React.Dispatch<React.SetStateAction<{[key: string]: string}>>;
    opciones: Option[];
}

export function Select({
    name,
    label,
    setFormData,
    opciones
}: SelectProps) {

    const [selected, setSelected] = useState<Option|null>(null)

    useEffect(() => {
        setFormData((formData) => ({
            ...formData,
            [name]: selected?.valor ?? ""
        }))
    }, [name, selected, setFormData]);

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <div className='mb-4'>
                    <Listbox.Label className="block text-sm font-semibold text-primary-color">{label}</Listbox.Label>
                    <div className="relative">
                        <Listbox.Button className="h-10 bg-white w-full px-4 py-2 mt-1 rounded-xl placeholder-text-primary-color border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">{selected?.text}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {opciones.map((opcion, i) => (
                                    <Listbox.Option
                                        key={i}
                                        className={({ active }) =>
                                            (active
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-900') +
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        }
                                        value={opcion}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={(selected ? 'font-semibold' : 'font-normal')
                                                            + 'ml-3 block truncate'}
                                                    >
                                                        {opcion.text}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={`${active ? 'text-white' : 'text-indigo-600'} absolute inset-y-0 right-0 flex items-center pr-4`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            )}
        </Listbox>
    )
}
