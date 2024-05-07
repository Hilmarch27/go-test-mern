import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/react.svg";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

function Header() {
  return (
    <header>
      <NavLink to="/" className="logo" exact="true">
        <img src={logo} alt="ReactJs" /> ReactJs
      </NavLink>

      <nav>
        <Flowbite>
          <DarkThemeToggle />
        </Flowbite>
        <NavLink to="/" exact="true" activeclassname="activeclassname">
          Produk
        </NavLink>
        <NavLink to="/pegawai" activeclassname="activeclassname">
          Pegawai
        </NavLink>
        <NavLink to="/about" activeclassname="activeclassname">
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
