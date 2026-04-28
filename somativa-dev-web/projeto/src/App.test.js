import { render, screen } from '@testing-library/react';
import App from './App';

test('renderiza o título Login', () => {
  render(<App />);
  const titulo = screen.getByText(/login/i);
  expect(titulo).toBeInTheDocument();
});

test('botão acessar aparece na tela', () => {
  render(<App />);
  const botao = screen.getByText(/acessar/i);
  expect(botao).toBeInTheDocument();
});