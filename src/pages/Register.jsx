import { Link, useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();

  const handleFormCadastroSubmit = async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value.trim();
    const email = event.target.email.value.trim();
    const senha = event.target.senha.value.trim();
    const endereco = event.target.endereco.value.trim();
    const cpf = event.target.cpf.value.trim();

    try {
      const response = await fetch(
        "https://apibase2-0bttgosp.b4a.run/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            email,
            endereco,
            cpf,
            senha,
          }),
        }
      );

      if (response.status != 201) {
        throw new Error();
      }

      alert("Cadastro efetuado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Usuario ou senha inválido");
    }
  };
  return (
    <main className="d-flex flex-column align-items-center pb-5">
      <img
        src="https://1000logos.net/wp-content/uploads/2020/11/Club-Penguin-Logo-500x313.png"
        alt=""
        width="200"
        className="my-4"
      />

      <form onSubmit={handleFormCadastroSubmit}>
        <div class="mb-3">
          <label for="" className="form-label letras">
            Nome:
          </label>
          <input name="nome" type="text" className="form-control" required />
        </div>

        <div class="mb-3">
          <label for="" className="form-label letras">
            E-mail:
          </label>
          <input name="email" type="email" className="form-control" required />
        </div>

        <div class="mb-3">
          <label for="" className="form-label letras">
            Senha:
          </label>
          <input
            name="senha"
            type="password"
            className="form-control"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
            }}
            required
          />
        </div>

        <div class="mb-3">
          <label for="" className="form-label letras">
            Endereço:
          </label>
          <input
            name="endereco"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label for="" className="form-label letras">
            CPF:
          </label>
          <input
            minLength={11}
            maxLength={11}
            name="cpf"
            type="text"
            className="form-control"
            required
          />
          <p class="letras-menores">O CPF deve somente números</p>
        </div>

        <button type="submit" class="btn btn-primary mb-4 btn-color">
          Criar Pinguim
        </button>
      </form>

      <Link to="/" class="link">
        Fazer Login
      </Link>
    </main>
  );
}
