import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Form from './Form';
import Input from './Input';

const AuthForm = ({ handleSubmit, isLoginPath }) => {
  const [formInputs, setFormInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  const usernameInputRef = useRef();
  const emailInputRef = useRef();

  // refocus when path changes (and after render)
  useEffect(() => {
    if (isLoginPath) emailInputRef.current.focus();
    else usernameInputRef.current.focus();
  }, [isLoginPath]);

  const onSubmit = evt => {
    evt.preventDefault();
    handleSubmit(formInputs);
  };

  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setFormInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const loginSignupSwitch = (
    <p className="text-xs mt-5">
      {isLoginPath ? 'New user?' : 'Existing user?'}
      {isLoginPath ? (
        <NavLink to="/signup">&nbsp;Signup</NavLink>
      ) : (
        <NavLink to="/login">&nbsp;Login</NavLink>
      )}
      &nbsp;instead!
    </p>
  );

  const submitOptions = {
    submitText: isLoginPath ? 'Login' : 'Signup',
    submitClassName: !isLoginPath && 'mode--positive',
  };

  return (
    <Form
      childrenBottom={loginSignupSwitch}
      className="self-start"
      onSubmit={onSubmit}
      submitOptions={submitOptions}
    >
      {!isLoginPath && (
        // Show username form if on signup page
        <Input
          name="username"
          label="Username"
          value={formInputs.username}
          required
          ref={usernameInputRef}
          onChange={handleInputChange}
        />
      )}
      <Input
        name="email"
        label="Email"
        type="email"
        required
        onChange={handleInputChange}
        ref={emailInputRef}
        value={formInputs.email}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        required
        onChange={handleInputChange}
        value={formInputs.password}
      />
    </Form>
  );
};

export default AuthForm;
