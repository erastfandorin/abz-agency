import { Link } from "react-scroll";
import logo from "../assets/img/Logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="/" className="header__logo">
        <img src={logo} alt="Logo TestTask" />
      </a>
      <nav>
        <ul className="header__menu">
          <li className="header__menu-item">
            <Link className="btn" to="users" smooth offset={-88} duration={500}>
              Users
            </Link>
          </li>
          <li className="header__menu-item">
            <Link className="btn" to="sign-up" smooth offset={-140} duration={500}>
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
