// components/__tests__/QuestionnaireForm.test.js
import { render, screen } from "@testing-library/react";
import QuestionnaireForm from "../QuestionnaireForm";

test("renders the questionnaire form", () => {
  render(<QuestionnaireForm questions={[]} />);
  expect(screen.getByText("Enviar")).toBeInTheDocument();
});