// App.js

import { useState, useMemo } from 'react'; // Додай useMemo
import { useContacts } from './hooks/useContacts'; // Імпортуй хук
import AddressTable from './components/AddressTable';
import AddressForm from './components/AddressForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  // Вся логіка контактів тепер тут
  const {
    contacts,
    editingContact,
    handleSaveContact,
    handleEditContact,
    handleDeleteContact,
  } = useContacts();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Використовуємо useMemo, щоб не фільтрувати масив на кожному ре-рендері
  const filteredContacts = useMemo(() => 
    contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
    ), [contacts, searchTerm]); // Перерахунок буде тільки якщо зміниться contacts або searchTerm

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