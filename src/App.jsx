import { useState } from 'react';
import AddressTable from './components/AddressTable';
import AddressForm from './components/AddressForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '098-765-4321' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
  );

  return (
    <div className="container">
      <h1>Address Book</h1>
      <AddressForm
        onSave={handleSaveContact}
        initialData={editingContact}
        key={editingContact ? editingContact.id : 'new-contact-form'}
      />
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <AddressTable
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
}

export default App;