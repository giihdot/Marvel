import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#202020',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'sans-serif',
      boxShadow: '0 0 10px red'
    }}>
      <h1 style={{ color: '#e62429', margin: 0 }}>🛡️ MarvelVerse</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={linkStyle}>🏠 Home</Link>
        <Link to="/buscar" style={linkStyle}>🔍 Buscar</Link>
        <Link to="/lista" style={linkStyle}>📜 Lista</Link>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold'
};
