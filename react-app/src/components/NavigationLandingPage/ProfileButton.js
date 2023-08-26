import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './navigationlandingpage.css';

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div id="innerdivprofiledropdown">
              <div>{user.username}</div>
              <hr />
              <div>{user.email}</div>
              <hr />
              <div id="wishlistuserprofileicon"
              onClick={() => {
                history.push('/wishlist')
              }}
              >Wish List</div>
              <hr />
              <div id="innerdivlogoutprofiledropdown">
                <div id="logoutbuttonprofiledropdown" onClick={handleLogout}>Log Out</div>
              </div>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
