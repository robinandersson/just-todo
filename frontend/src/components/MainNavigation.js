import React, { useRef } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { useAuthContext } from '../contexts/auth-context';
import Icon from '../components/Icon';
import SiteLogo from '../components/SiteLogo';
import { concatClassNames } from '../utils/classNames';

const MainNavigation = ({ history }) => {
  const authContext = useAuthContext();

  const { token, username, logout } = authContext;
  const isLoggedIn = !!token;

  // store ref to logout function with needed needed parameters (instead of currying) to avoid unnecessary rerender
  const logoutRef = useRef(() => logout(history));

  return (
    <header className="relative mt-4 mb-24 sm:mb-32">
      <div
        className={concatClassNames(
          'flex flex-col',
          !isLoggedIn && 'items-center mt-16 sm:mt-24 mb-0'
        )}
      >
        <NavLink
          className={concatClassNames(
            'font-bold focus:outline-none focus:shadow-none scale-75 sm:scale-100',
            isLoggedIn && ' transform-l'
          )}
          to="/"
        >
          <h1 className="title text-4xl font-bold">
            <SiteLogo
              className={isLoggedIn ? 'h-16 ml-8 inline-block' : 'h-32'}
            />
          </h1>
          {!isLoggedIn && (
            <h3 className="text-logoBlue font-normal leading-tight tracking-widest ml-32 -mt-4">
              You know what todo,
              <br />
              just start todo it!
            </h3>
          )}
        </NavLink>
      </div>
      <div className="absolute top-0 right-0 mt-2 mr-8 pt-2 pr-4 group">
        {isLoggedIn && (
          <React.Fragment>
            <NavLink className="relative font-bold z-30" to="/preferences">
              {username}&nbsp;
              <Icon symbol="userCircle" />
            </NavLink>
            <div className="absolute top-0 right-0 pt-6 pb-2 w-48 border border-blue-200 shadow flex flex-col items-center bg-white z-20 invisible group-hover:visible">
              <hr className="border border-gray-200 w-11/12" />
              <button
                onClick={logoutRef.current}
                className="btn mode--danger mt-4 mb-2"
              >
                Logout
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </header>
  );
};

export default withRouter(MainNavigation);
