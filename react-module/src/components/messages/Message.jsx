import { useEffect, useState } from "react";

function Message({ text, styleClass }) {

    const [msg, setMsg] = useState(text);
    const [showMsg, setShowMsg] = useState(false);

    useEffect(() => {
        if (msg) {
            setShowMsg(true);
            return;
        }
        setShowMsg(false)
    }, [msg])

    return (
        <div className={styleClass}>
            {showMsg && <p>{msg}</p>}
        </div>
    )
}

export default Message;