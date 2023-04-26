import { useState } from "react";

function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };
  console.log(isMenuOpen);

  return (
    <nav className="navbar">
      <h1>BuckleUp</h1>
      <div className="nav-ctn">
        <ul className={isMenuOpen ? "showMenu nav-list" : "nav-list"}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/login">Log in</a>
          </li>
          <li>
            <a href="/signup">Sign up</a>
          </li>
        </ul>

        <button className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? (
            <i className="menuIcon material-icons">close</i>
          ) : (
            <i className="menuIcon material-icons">menu</i>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
