import Logo from "../img/Vinted_logo.png";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ userToken, setUser }) => {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="logo" />

      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Recherche des articles"
        />
        <FontAwesomeIcon className="icon" icon="search" />
      </div>
      <div className="buttons">
        {userToken ? (
          <button className="header-buttons" onClick={() => setUser(null)}>
            Se déconnecter
          </button>
        ) : (
          <>
            <Link className="header-buttons" to="/signup">
              S'inscrire
            </Link>
            <Link className="header-buttons" to="/login">
              Se connecter
            </Link>
          </>
        )}
      </div>
      <Link className="button-sold header-buttons" to="/publish">
        Vends tes articles
      </Link>
    </div>
  );
};

export default Header;
