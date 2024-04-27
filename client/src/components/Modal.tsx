import React from 'react';

function Modal({
    isOpen,
    onClose,
    children,
}: {
    isOpen: boolean
    onClose: () => void
    children:string
}): React.JSX.Element|null {
    if (!isOpen) {
        return null
    }

    return (
        <dialog className="modal active ">
            {children}
            <nav className="right-align no-space">
                <button
                    type="button"
                    className="transparent link"
                    onClick={onClose}
                >
                    Спасибо, я понял
                </button>
            </nav>
        </dialog>
    )
}

export default Modal;
