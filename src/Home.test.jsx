/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Home from "./pages/Home.jsx";

vi.mock("react-router-dom", () => ({
  Link: ({ children }) => children,
}));

describe("Home Component", () => {
  test("renders welcome heading", () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Jazmin's FakeStore App/i)).toBeTruthy();
  });
});
