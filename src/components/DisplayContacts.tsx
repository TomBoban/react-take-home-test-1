import { Button, Form, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { apiDeleteContact, apiUpdateContact } from "../data/contacts";

interface Props {
  data: {
    name: string;
    phone: string;
    email: string;
    id: string;
    age: number;
  }[];
  onAddContact: () => void;
}

export default function DisplayContacts({ data, onAddContact }: Props) {
  const [contacts, setContacts] = useState(data);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    name: string;
    phone: string;
    email: string;
    id: string;
    age: number;
  }>({ name: "", phone: "", email: "", id: "", age: 0 });

  useEffect(() => {
    setContacts(data);
  }, [data]);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (contact: {
    name: string;
    phone: string;
    email: string;
    id: string;
    age: number;
  }) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleEditContact = () => {
    if (selectedContact) {
      apiUpdateContact(selectedContact)
        .then(() => {
          const updatedContacts = [...contacts];
          const index = updatedContacts.findIndex(
            (contact) => contact.id === selectedContact.id
          );
          if (index !== -1) {
            updatedContacts[index] = selectedContact;
            setContacts(updatedContacts);
            onAddContact();
            setSelectedContact({
              name: "",
              phone: "",
              email: "",
              id: "",
              age: 0,
            });
            setShowEditModal(false);
          }
        })
        .catch((error) => {
          console.error("Error updating contact: ", error.message);
        });
    }
  };

  const handleDeleteContact = (id: string) => {
    apiDeleteContact(id)
      .then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
        onAddContact();
      })
      .catch((error) => {
        console.error("Error deleting contact: ", error.message);
      });
  };
  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((item) => {
            const { id } = item;
            let temp = id.split("-")[0];
            return (
              <tr key={item.id}>
                <td>{temp}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.age}</td>
                <td className="btn_action">
                  <Button onClick={() => handleShowEditModal(item)}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteContact(id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={selectedContact?.name}
                onChange={(e: any) =>
                  setSelectedContact({
                    ...selectedContact!,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={selectedContact?.phone}
                onChange={(e: any) =>
                  setSelectedContact({
                    ...selectedContact!,
                    phone: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={selectedContact?.email}
                onChange={(e: any) =>
                  setSelectedContact({
                    ...selectedContact!,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={selectedContact?.age}
                onChange={(e: any) =>
                  setSelectedContact({
                    ...selectedContact!,
                    age: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditContact}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
