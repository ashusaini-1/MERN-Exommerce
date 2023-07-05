import React from "react";
import "./CustomModal.css";

const CustomModal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    display: isOpen ? "block" : "none",
  };

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomModal;