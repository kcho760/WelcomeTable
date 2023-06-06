import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormModal from './index';

function LoginButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="login-button-container">
      <button className='Log_In_Button' onClick={() => setShowModal(true)}>Sign In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormModal />
        </Modal>
      )}
    </div>
  );
}

export default LoginButton;
