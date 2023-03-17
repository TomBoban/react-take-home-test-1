import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { apiAddContact } from "../data/contacts";

interface FormValues {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
}
interface AddContactsProps {
  onAddContact: () => void;
}

export default function AddContacts({ onAddContact }: AddContactsProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    id: "",
    name: "",
    phone: "",
    email: "",
    age: 0,
  });

  // const [currentId, setCurrentId] = useState<string>("1");

  const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  };

  const handleInputChange = (e: any) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newContact = {
      ...formValues,
      id: generateUUID(),
    };

    apiAddContact(newContact);
    setFormValues({
      id: "",
      name: "",
      phone: "",
      email: "",
      age: 0,
    });
    onAddContact();
  };

  return (
    <Form onSubmit={handleSubmit} className="form_body">
      <h1 className="addContact">Add Contact</h1>
      <Form.Group controlId="formBasicName" className="form_input">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formValues.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPhone" className="form_input">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formValues.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail" className="form_input">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicAge" className="form_input">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          name="age"
          placeholder="Enter age"
          value={formValues.age}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="form_btn">
        Submit
      </Button>
    </Form>
  );
}
