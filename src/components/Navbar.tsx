import { useState, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";

function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, handleLogout } = useContext(SessionContext);

  const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <h1>
        <a href="/">BuckleUp</a>
      </h1>
      <div className="nav-ctn">
        <ul className={isMenuOpen ? "showMenu nav-list" : "nav-list"}>
          <li>
            <a href="/">Home</a>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <a href="/mytrips">My Trips</a>
              </li>
              <li>
                <div
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Log out
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">Log in</a>
              </li>
              <li>
                <a href="/signup">Sign up</a>
              </li>
            </>
          )}
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
