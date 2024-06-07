import { useModal } from '../../context/Modal';

import './Modal.css'

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button style={{textDecoration: 'none', boxShadow: '2px 2px 2px black', color:'white', backgroundColor: 'grey', fontSize: '12px', padding: '3px', cursor:'pointer'}} onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
