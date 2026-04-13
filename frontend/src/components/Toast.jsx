    import { useEffect } from 'react';

    export default function Toast({ message, type = "success", setInformation }) {

        useEffect(() => {
            const timer = setTimeout(() => {
                setInformation("");
            }, 5000);
            return () => clearTimeout(timer);
        }, [message, setInformation]);

        if (!message) return null;

        const isSuccess = type === "success";

        return (
            <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
                <div className={`flex items-center p-5 rounded-[24px] shadow-2xl border backdrop-blur-md transition-all ${
                    isSuccess
                        ? "bg-white/90 border-green-100 text-green-800 shadow-green-100/50"
                        : "bg-white/90 border-red-100 text-red-800 shadow-red-100/50"
                }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        isSuccess ? "bg-green-50" : "bg-red-50"
                    }`}>
                        <span className="text-sm">
                            {isSuccess ? "₡" : "!"}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-0.5">
                            {isSuccess ? "Éxito" : "Atención"}
                        </p>
                        <p className="font-bold text-xs tracking-tight">
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={() => setInformation("")}
                        className="ml-8 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-[10px] text-gray-400"
                    >
                        ✕
                    </button>
                </div>
            </div>
        );
    }