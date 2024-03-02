import Modal from 'react-modal';
import { IoCloseCircleOutline } from "react-icons/io5";

export const ImageModal = ({ isOpen, onRequestClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
    >
      <button onClick={onRequestClose}><IoCloseCircleOutline size={25}/></button>
      <img src={imageUrl} alt="Full-size Image" />
    </Modal>
  );
};