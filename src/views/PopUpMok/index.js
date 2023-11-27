import React from 'react';
import Modal from 'react-modal';

export default function PopUpMok ({ isOpen, onClose, content }) {

  const popupStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      width: '450px',
      height: '344px',
      backgroundColor: '#F6E486',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={popupStyle}
    >
      {content}
    </Modal>
  );
};
