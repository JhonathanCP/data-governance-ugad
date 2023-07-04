import React from "react";

export function NodeModal({ isOpen, onClose, children }) {
    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background" onClick={onClose}></div>
        <div className="modal-card">
            <div>{children}</div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}
