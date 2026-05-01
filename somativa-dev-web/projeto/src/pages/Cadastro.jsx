import { useState } from "react";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    nascimento: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const cadastrar = async () => {
    setErro("");
    setMensagem("");

    // 🔍 Validação básica
    if (!form.email || !form.senha) {
      setErro("Email e senha são obrigatórios.");
      return;
    }

    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      console.log("Criando usuário...");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.senha
      );

      console.log("Usuário criado:", userCredential);

      const uid = userCredential.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nome: form.nome,
        sobrenome: form.sobrenome,
        nascimento: form.nascimento,
        uid: uid
      });

      setMensagem("Cadastro realizado com sucesso! Redirecionando...");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Erro Firebase:", error);

      // 🔥 Tratamento mais amigável
      switch (error.code) {
        case "auth/email-already-in-use":
          setErro("Este email já está em uso.");
          break;
        case "auth/invalid-email":
          setErro("Email inválido.");
          break;
        case "auth/weak-password":
          setErro("Senha muito fraca (mínimo 6 caracteres).");
          break;
        default:
          setErro("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Cadastro</h1>

        <input
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
        />

        <input
          name="sobrenome"
          placeholder="Sobrenome"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
        />

        <input
          type="date"
          name="nascimento"
          onChange={handleChange}
        />

        <button onClick={cadastrar} disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <button
          className="btn-secondary"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Voltar
        </button>

        {mensagem && <p className="success">{mensagem}</p>}
        {erro && <p className="error">{erro}</p>}
      </div>
    </div>
  );
}