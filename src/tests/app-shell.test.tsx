import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";
import HomePage from "@/app/page";

describe("Application Shell & UI Suite (AC-4)", () => {
  it("should render Navbar with SpecForge branding and links", () => {
    render(<Navbar />);
    expect(screen.getByText("SpecForge")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("should render HomePage landing hero and feature cards", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Track issues with/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Issue Management")).toBeInTheDocument();
    expect(screen.getByText("Categorization & Tags")).toBeInTheDocument();
    expect(screen.getByText("Instant Search & Filter")).toBeInTheDocument();
  });
});
