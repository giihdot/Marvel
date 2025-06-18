import './Header.css';
import marvelLogo from '../assets/MARVEL.png';

function Header() {
  return (
    <header className="header">
      <img src={marvelLogo} alt="Marvel Logo" className="logo" />
    </header>
  );
}

export default Header;