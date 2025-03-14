import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import notificationIcon from "../assets/campana.png"; 
import userIcon from "../assets/usuario.png";

const NavBar = styled.nav`
  background-color: #B4864D;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  box-sizing: border-box;
`;

const LogoImg = styled.img`
  width: 50px;
  cursor: pointer;
`;

const NavContent = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const MenuItem = styled.li`
  font-weight: bold;
  cursor: pointer;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
`;

const IconButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const LoginButton = styled.button`
  padding: 10px 15px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  overflow: hidden;
  z-index: 100;
`;

const DropdownMenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = ({ setHeaderHeight = () => {} }) => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [setHeaderHeight]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <NavBar ref={headerRef}>
      <LogoImg src={logo} alt="Logo" onClick={() => navigate("/")} />

      <NavContent>
        <Menu>
          <MenuItem onClick={() => navigate("/")}>Inicio</MenuItem>
          <MenuItem onClick={() => navigate("/dashboard")}>Centro de monitoreo y control</MenuItem>
          <MenuItem onClick={() => navigate("/historial")}>Historial de datos</MenuItem>
        </Menu>
      </NavContent>

      <RightSection>
        {isAuthenticated ? (
          <>
            <IconButton src={notificationIcon} alt="Notificaciones" />
            <IconButton src={userIcon} alt="Usuario" onClick={() => setMenuVisible(!menuVisible)} />
            {menuVisible && (
              <DropdownMenu>
                <DropdownMenuItem onClick={() => navigate("/editar-datos")}>Editar datos</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenu>
            )}
          </>
        ) : (
          <LoginButton onClick={() => navigate("/login")}>Iniciar sesión</LoginButton>
        )}
      </RightSection>
    </NavBar>
  );
};

export default Header;