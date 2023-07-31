import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DownloadButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            setDeferredPrompt(event);
        });
    }, []);

    const handleInstallApp = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    toast.success('Usuário aceitou a instalação')
                } else {
                    toast.error('Usuário recusou a instalação');
                }
                setDeferredPrompt(null);
            });
        }
    };
    return (
        <button className="buttonDownload" onClick={handleInstallApp} >Download</button>
    )
}
export default DownloadButton