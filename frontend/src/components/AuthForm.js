import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AuthForm = ({ handleSubmit, isLoginPath }) => {
  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const focusInput = component => {
    if (component) {
      switch (component.name) {
        case 'email':
          if (isLoginPath) component.focus();
          break;

        case 'username':
          if (!isLoginPath) component.focus();
          break;

        default:
          break;
      }
    }
  };

  const onSubmit = evt => {
    evt.preventDefault();
    handleSubmit(inputValues);
  };

  const handleInputChange = evt => {
    const { name, value } = evt.target;

    setInputValues(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  return (
    <form className="container form self-start" onSubmit={onSubmit}>
      {!isLoginPath && (
        // Show username form if on signup page
        <>
          <label htmlFor="username" className="input-label">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            autoFocus
            className="text-input"
            onChange={handleInputChange}
            value={inputValues.username}
          />
        </>
      )}
      <label htmlFor="email" className="input-label">
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoFocus={isLoginPath}
        ref={focusInput}
        className="text-input"
        onChange={handleInputChange}
        value={inputValues.email}
      />
      <label htmlFor="password" className="input-label">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="text-input tracking-widest"
        onChange={handleInputChange}
        value={inputValues.password}
      />
      <div>
        <button
          type="submit"
          className={
            'btn mt-5 mb-2 py-1 px-3' + (!isLoginPath ? ' mode--positive' : '')
          }
        >
          {isLoginPath ? 'Login' : 'Signup'}
        </button>

        <p className="text-xs mt-5">
          {isLoginPath ? (
            <>
              New user?
              <NavLink to="/signup">&nbsp;Signup</NavLink>
              &nbsp;instead!
            </>
          ) : (
            <>
              Existing user?
              <NavLink to="/login">&nbsp;Login</NavLink>
              &nbsp;instead!
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
