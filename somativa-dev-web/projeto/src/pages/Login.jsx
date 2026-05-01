import { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/principal");
    } catch {
      alert("Usuário não cadastrado");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={login}>Entrar</button>

        <Link to="/cadastro" className="link">
          Criar conta
        </Link>
      </div>
    </div>
  );
}