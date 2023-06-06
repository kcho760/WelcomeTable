import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalNode, setModalNode] = useState(null);

  useEffect(() => {
    setModalNode(modalRef.current);
  }, []);

  const closeModal = () => {
    setModalNode(null);
  };

  return (
    <ModalContext.Provider value={closeModal}>
      {children}
      <div ref={modalRef} />
    </ModalContext.Provider>
  );
}

export function Modal({ onClose, children }) {
  const closeModal = useContext(ModalContext);

  if (!closeModal) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose} />
      <div id="modal-content">{children}</div>
    </div>,
    document.body
  );
}
