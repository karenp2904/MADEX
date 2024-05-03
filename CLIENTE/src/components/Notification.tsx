import { useState, useEffect } from 'react';

const Notification = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsVisible(false);
        }, 3000); // Ocultar la notificación después de 3 segundos

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        {isVisible && (
            <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
            <div className="bg-green-600 text-white rounded-md p-4 shadow-md flex justify-between items-center">
                <div>
                <span>{message}</span>
                </div>
            </div>
            </div>
        )}
        </>
    );
    };

export default Notification;
