import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css';

const Backdrop =(props)=>{
    return <div className="backdrop" onClick={props.onClose}/>
}
const ModalOverlay =(props)=>{
    return(
        <div className="modal">
            <div className="content">{props.children}</div>
        </div>
    )
}

const Modal = (props) => {
  return (
    <>
    {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>,document.getElementById('overlays'))}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
    </>
  )
}

export default Modal

// //These components are used to create a modal dialog for displaying the shopping cart. 
// The Backdrop component represents a semi-transparent background that can be clicked to close the modal.
//  The ModalOverlay component contains the actual modal content.
//   The Modal component is a wrapper that uses React Portals to render these components outside the normal DOM hierarchy for layering and positioning.