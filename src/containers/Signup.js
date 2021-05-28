import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-backend-athenais.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="signup">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          className="signup-user-email-pwd"
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="signup-user-email-pwd"
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="signup-user-email-pwd"
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input className="signup-submit" type="submit" value="S'inscrire" />
        <div className="checkbox-block">
          <input type="checkbox" />
          <span>S'inscrire à notre newsletter</span>
          <p>
            En m'inscrivant, je confirme que j'ai accepté les Termes &
            Conditions de Vinted, avoir lu la Politique de Confidentialité, et
            que j'ai plus de 18 ans.
          </p>
        </div>

        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </div>
  );
};
export default Signup;
