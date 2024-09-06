import { cloneElement, createContext, useContext, useState } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
    const [openName, setOpenName] = useState("");

    const close = () => setOpenName("");
    const open = setOpenName;

    return (
        <ModalContext.Provider value={{ open, close, openName }}>
            {children}
        </ModalContext.Provider>
    );

    // return (
    //     <div className={styles.overlay}>
    //         <div className={styles.modal}>{children}</div>
    //     </div>
    // );
}

function Open({ children, name }) {
    const { open } = useContext(ModalContext);

    // return cloneElement(children });
    return cloneElement(children, {
        onClick: () => {
            open(name);
            console.log("click");
        },
    });
}

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);

    if (name !== openName) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {cloneElement(children, { onClose: close })}
            </div>
        </div>
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
