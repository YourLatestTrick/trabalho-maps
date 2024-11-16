import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import imagem from "../assets/imagem.png";

export function Header() {
  const { logout } = useContext(UserContext);

  return (
    <header
      className="navbar border-bottom border-body d-flex p-2 custom-header"
      data-bs-theme="custom-header"
    >
      <img src={imagem} alt="" width="90px" className="my-1" />
      <button className="btn btn-primary btn-color" onClick={() => logout()}>
        Sair
      </button>
    </header>
  );
}
