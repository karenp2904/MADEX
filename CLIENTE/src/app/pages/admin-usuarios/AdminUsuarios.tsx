import { RenderHeader } from "./components/RenderHeader"

export const AdminUsuarios = () => {

    const users = [
        {
            "id": "1",
            "name": "Alice",
            "role": "ADMIN",
            "email": "alice@example.com"
        },
        {
            "id": "2",
            "name": "Bob",
            "role": "ALIANZA",
            "email": "bob@alianza.com"
        },
        {
            "id": "3",
            "name": "Charlie",
            "role": "CLIENTE",
            "email": "charlie@example.com"
        }

    ]

    const Opcion = ({
        nombre, className
    }: { nombre: string, className?: string }) => {
        return (
            <div
                className={`${className} hover:text-gray-400 hover:cursor-pointer indent-10 bg-[length:1.5rem] bg-[10px] bg-no-repeat`}
            >
                <strong>{nombre}</strong>
            </div>
        )
    }

    return (
        <div className="container flex pt-4">
            <div className="m-5 bg-gray-800 shadow-xl rounded-large w-60 h-screen ">
                <div className='grid-cols-1 m-5 grid gap-y-8 text-white my-10'>
                    <Opcion nombre="Inventario" className="bg-aplicaciones" />
                    <Opcion nombre="Auditlog" className="bg-auditlog" />
                    <Opcion nombre="Usuarios" className="bg-m-users" />
                    <Opcion nombre="Facturas" className="bg-facturas" />
                </div>
            </div>
            <div className="bg-white shadow-xl aspect-auto w-screen  rounded-xl m-5">
                <div className='m-3 p-4'>
                    <div className="card p-fluid">
                        <div className="p-3">
                            <RenderHeader />
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <li key={user.email} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4">
                                        <img src="user/user.svg" alt="user" className="h-10 w-10 flex-none" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">{user.role}</p>
                                        {user.id ? (
                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                ID:{user.id}
                                            </p>
                                        ) : (
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}