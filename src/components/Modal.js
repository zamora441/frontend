import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    const modal = useRef(null);
    if (!modal.current) {
        modal.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal");
        modalRoot.appendChild(modal.current);
        return function removeModal() {
            modalRoot.removeChild(modal.current);
        };
    }, []);

    return createPortal(<div>{children}</div>, modal.current);
};

export default Modal;
