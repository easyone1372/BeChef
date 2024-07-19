import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Modal from "../Modal";
import axios from "axios";

type DropdownMenuProps = {
  setIsLoggedIn: any;
};

const DropdownMenu = ({ setIsLoggedIn }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedInState] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("/api/verify-token", { token })
        .then((response) => {
          if (response.data.valid) {
            setIsLoggedIn(true);
            setIsLoggedInState(true);
          } else {
            setIsLoggedIn(false);
            setIsLoggedInState(false);
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
          setIsLoggedInState(false);
        });
    }
  }, [setIsLoggedIn]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsLoggedInState(false);
    setIsOpen(false);
    console.log("Logged out");
  };

  const handleMyPage = () => {
    setShowModal(true);
    setIsOpen(false);
  };

  const handleDeleteAccount = () => {
    console.log("Account Deleted");
    // 회원 탈퇴 로직
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button onClick={toggleDropdown} text="Menu" />
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg">
          {isLoggedIn ? (
            <>
              <Button
                onClick={handleLogout}
                text="로그아웃"
                className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              />
              <Button
                onClick={handleMyPage}
                text="마이페이지"
                className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              />
            </>
          ) : (
            <Button
              onClick={handleLogin}
              text="로그인"
              className="block text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            />
          )}
        </div>
      )}
      <Modal showModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};

export default DropdownMenu;
