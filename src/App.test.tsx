import { render, screen } from "@testing-library/react";
import Home from "./pages/Home";

test("renders learn react link", () => {
  render(<Home />);
  const searchbar = screen.getByPlaceholderText(/search by id/i);
  expect(searchbar).toBeInTheDocument();
});
