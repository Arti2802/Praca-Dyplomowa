import React from 'react'
import { Modal, Button } from "react-bootstrap";
 
export const ConfirmationWindow = ({ showModal, hideModal, confirmModal, id, message, title, button}) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title ? title : "Potwierdzenie usunięcia"}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{message}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Anuluj
          </Button>
          <Button variant="danger" onClick={confirmModal}>
            {button ? button : "Usuń"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
}