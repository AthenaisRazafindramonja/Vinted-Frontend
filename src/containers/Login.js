import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://vinted-backend-athenais.herokuapp.com/user/login",
        {
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
    <div className="login">
      <h2>Se connecter</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-email-pwd"
          type="email"
          placeholder="Adresse email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="login-email-pwd"
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => setPassword(event.target.value)}
        />
        <input className="login-submit" type="submit" value="Se connecter" />
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </form>
    </div>
  );
};
export default Login;
