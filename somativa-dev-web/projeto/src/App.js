import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const validarLogin = () => {
    if (email === 'nicolly.antunes@pucpr.edu.br' && senha === '123456') {
      setMensagem('Acessado com sucesso!');
    } else {
      setMensagem('Usuário ou senha incorretos!');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={validarLogin}>Acessar</button>

      <p>{mensagem}</p>
    </div>
  );
}

export default App;