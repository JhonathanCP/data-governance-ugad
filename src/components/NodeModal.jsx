import React from "react";

export function NodeModal({ isOpen, onClose, children }) {
    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal-background transparent-background"></div>
        <div className="modal-card modal-card-custom">
            <div>{children}</div>
        </div>
        </div>
    );
}
