import React, { useEffect, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { ModalContext } from '../../context/Modal';

function LoginFormModal() {
  const currentUser = useSelector((state) => state.session.user);
  const closeModal = useContext(ModalContext);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (currentUser && showModal) {
      setShowModal(false); // Close the modal by setting showModal to false
    }
  }, [currentUser, showModal]);

  return (
    <div>
      {showModal && (
        <Modal onClose={closeModal}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}

export default LoginFormModal;
