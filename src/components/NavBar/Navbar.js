import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const [burgerbar, setburgerbar] = useState(false);

  // const showbar = () => setburgerbar(!burgerbar);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className={sidebar ? "menu-btn open" : "menu-btn"}
          onClick={showSidebar}
        >
          <div class="menu-span" onClick={showSidebar}></div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;