import { useState } from 'react';

const initialContacts = [
  { id: 1, firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '098-765-4321' },
];

export const useContacts = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [editingContact, setEditingContact] = useState(null);

  const handleSaveContact = (contactData) => {
    if (editingContact) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editingContact.id
            ? { ...editingContact, ...contactData }
            : contact
        )
      );
    } else {
      const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) : 0;
      const newContact = {
        id: maxId + 1,
        ...contactData,
      };
      setContacts([...contacts, newContact]);
    }
    setEditingContact(null);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return {
    contacts,
    editingContact,
    handleSaveContact,
    handleEditContact,
    handleDeleteContact,
  };
};