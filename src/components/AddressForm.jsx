import React, { useState, useEffect } from 'react';

const initialFormState = { firstName: '', lastName: '', phone: '' };

function AddressForm({ onSave, initialData }) {
  const [formData, setFormData] = useState(initialData || initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData || initialFormState);
  }, [initialData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const validate = () => {
  const newErrors = {};
  if (!formData.firstName.trim()) newErrors.firstName = 'The first name is required';
  if (!formData.lastName.trim()) newErrors.lastName = 'The last name is required';
  if (!formData.phone.trim()) newErrors.phone = 'The phone is required';
  return newErrors;
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSave(formData); 
      setErrors({});
      setFormData(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Contact' : 'Add Contact'}</h3>
      {}
       <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>
      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <button type="submit">Save Contact</button>
    </form>
  );
}

export default React.memo(AddressForm);