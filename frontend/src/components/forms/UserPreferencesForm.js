import React, { useState, useRef, useEffect } from 'react';

import Form from './Form';
import Input from './Input';
import { useFunction } from '../../utils/functionHooks';

const initialInputValues = {
  'new-password': '',
  'repeat-password': '',
};

/*
 * Form for displaying and handling user preferences
 * (specialized Form-component)
 *
 * Internally, it uses some experimentation for optimizing performance with sending parameters to handlers
 * (without causing rerender) - a hotly debated topic.
 */
const UserPreferencesForm = ({
  onSubmit,
  username,
  email,
  isSubmitting,
  submitSuccessful,
}) => {
  const [formInputs, setFormInputs] = useState(initialInputValues);
  const inputRef = useRef(formInputs.values); // ref needed for submit handler below

  // reset input fields if submit successful
  useEffect(() => {
    if (submitSuccessful) {
      setFormInputs(initialInputValues);
      inputRef.current = Object.values(initialInputValues);
    }
  }, [submitSuccessful]);

  const passwordsMatch =
    !!formInputs['new-password'] &&
    formInputs['new-password'] === formInputs['repeat-password'];

  // this doesn't get redefined on each render, thus the component below shouldn't rerender it's children unnecessarily
  const handleSubmit = useFunction(e => {
    e.preventDefault();
    onSubmit(inputRef.current); // ref needed since the lexical scope is set to the intial render
  });

  const handleChange = useFunction(e => {
    const { name, value } = e.target;
    // shouldn't do side-effects in here, but hey. It's an experiment! :D
    setFormInputs(prevInputs => {
      const newInputValues = {
        ...prevInputs,
        [name]: value,
      };
      // update ref on change (so submit has latest input values). Only values are needed (order not important)
      inputRef.current = Object.values(newInputValues);
      return newInputValues;
    });
  });

  return (
    <Form
      onSubmit={handleSubmit}
      submitText="Update"
      submitIsReady={passwordsMatch}
      isSubmitting={isSubmitting}
      submitSuccessful={submitSuccessful}
    >
      <Input name="username" label="Username" value={username} disabled />
      <Input name="email" label="Email" value={email} disabled />
      <Input
        name="new-password"
        type="password"
        label="New Password"
        onChange={handleChange}
        value={formInputs['new-password']}
      />
      <Input
        name="repeat-password"
        type="password"
        label="Repeat Password"
        onChange={handleChange}
        value={formInputs['repeat-password']}
      />
    </Form>
  );
};

export default UserPreferencesForm;
