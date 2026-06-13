/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

import { describe, test, expect, vi } from "vitest";
import Cart from "../Cart.jsx";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("../firebase", () => ({
  auth: {
    currentUser: null,
  },
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  getDocs: vi.fn(() =>
    Promise.resolve({
      docs: [],
    }),
  ),
  addDoc: vi.fn(),
}));

describe("Cart Component", () => {
  test("renders Cart heading", () => {
    render(<Cart />);

    expect(screen.getByText("Cart")).toBeTruthy();
  });
});
