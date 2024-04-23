

const UserInfoCard = () => {
    return (
        <div className="flow-root">
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Nombre</dt>
                    <dd className="text-gray-700 sm:col-span-2">María Goméz</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">CC</dt>
                    <dd className="text-gray-700 sm:col-span-2">1007898403</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Correo</dt>
                    <dd className="text-gray-700 sm:col-span-2">mariagomez@example.com</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Teléfono</dt>
                    <dd className="text-gray-700 sm:col-span-2">3122676548</dd>
                </div>
            </dl>
        </div>
    );
};



export default UserInfoCard;