import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value.trim();
    const senha = event.target.senha.value.trim();

    if (!email || !senha) {
      alert("Preencha e-mail e senha");
      return;
    }
    try {
      const response = await fetch(
        "https://apibase2-0bttgosp.b4a.run/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      if (response.status != 200) {
        throw new Error();
      }

      const jsonWebToken = await response.text();
      console.log("Login funcionou", jsonWebToken);

      login(jsonWebToken);

      navigate("/home");
    } catch (error) {
      alert("Usuario ou senha inválido");
    }
  };

  return (
    <main className="d-flex flex-column align-items-center">
      <img
        src="https://1000logos.net/wp-content/uploads/2020/11/Club-Penguin-Logo.png"
        alt=""
        width="200"
        className="my-4"
      />
      <form onSubmit={handleSubmitLogin}>
        <div class="mb-3">
          <label for="" className="form-label letras">
            Email:
          </label>
          <input type="email" className="form-control" name="email" required />
        </div>

        <div class="mb-3">
          <label for="" className="form-label letras">
            Senha:
          </label>
          <input
            type="password"
            className="form-control"
            name="senha"
            minLength={4}
            maxLength={15}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-4 btn-color">
          Login
        </button>
      </form>

      <Link to="/register" class="link">
        Criar um Pinguim
      </Link>
    </main>
  );
}
