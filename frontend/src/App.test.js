import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders application header", () => {
  render(<App />);
  const title = screen.getByText(/Tasks/i);
  expect(title).toBeInTheDocument();
});
