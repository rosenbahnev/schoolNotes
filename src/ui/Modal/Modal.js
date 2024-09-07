import { cloneElement, createContext, useContext, useState } from "react";
import styles from "./Modal.module.css";
import useOutsideClick from "../../hooks/useOutsideClick";

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
}

function Open({ children, name }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, {
        onClick: () => {
            open(name);
        },
    });
}

function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if (name !== openName) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={ref}>
                <button className={styles.closingBtn} onClick={close}>
                    X
                </button>
                <div>{cloneElement(children, { onClose: close })}</div>
            </div>
        </div>
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
