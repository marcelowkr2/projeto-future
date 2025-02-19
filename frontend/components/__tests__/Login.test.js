// frontend/components/__tests__/Login.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Login";

test("renders the login form", () => {
  render(<Login />);
  expect(screen.getByLabelText("Usuário")).toBeInTheDocument();
  expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  expect(screen.getByText("Entrar")).toBeInTheDocument();
});

test("submits the form with username and password", () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText("Usuário"), { target: { value: "admin" } });
  fireEvent.change(screen.getByLabelText("Senha"), { target: { value: "password" } });
  fireEvent.click(screen.getByText("Entrar"));

  // Adicione verificações adicionais, como chamadas à API
  
});