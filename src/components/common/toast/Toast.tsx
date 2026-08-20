import { useEffect, useState } from "react";
import { registerToastHandler, type ToastType } from "../../../services/toast.service";
import './Toast.css'


const Toast = () => {
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
    } | null>(null);

    useEffect(() => {
        registerToastHandler((message, type) => {
            setToast({
                message,
                type,
            });

            setTimeout(() => {
                setToast(null);
            }, 3000);
        });
    }, []);

    if (!toast) {
        return null;
    }

    return (
        <div className="toast-container">
            <div className={`toast toast-${toast.type}`}>
                <span className="toast-icon">
                    {toast.type === "success" ? "✓" : "!"}
                </span>

                <span className="toast-message">
                    {toast.message}
                </span>
            </div>
        </div>
    );
};

export default Toast;