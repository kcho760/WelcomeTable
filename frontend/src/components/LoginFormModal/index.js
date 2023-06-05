import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (currentUser) {
      setShowModal(false);
    }
  }, [currentUser]);
  return (
    <div className="login-button-container">
      <button className='Log_In_Button' onClick={() => setShowModal(true)}>Sign In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </div>
  );
}


export default LoginFormModal;