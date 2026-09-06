import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagInput } from "@/components/issues/TagInput";

describe("TagInput Component (AC-1, AC-2)", () => {
  it("should allow adding a tag via input and Add button", () => {
    const handleChange = vi.fn();
    render(<TagInput tags={["bug"]} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add a tag/i);
    fireEvent.change(input, { target: { value: "Frontend" } });

    const addBtn = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addBtn);

    expect(handleChange).toHaveBeenCalledWith(["bug", "frontend"]);
  });

  it("should add a tag on Enter key press", () => {
    const handleChange = vi.fn();
    render(<TagInput tags={[]} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add a tag/i);
    fireEvent.change(input, { target: { value: "backend" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleChange).toHaveBeenCalledWith(["backend"]);
  });

  it("should reject duplicate tag and show error message", () => {
    const handleChange = vi.fn();
    render(<TagInput tags={["bug"]} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add a tag/i);
    fireEvent.change(input, { target: { value: "BUG" } });

    const addBtn = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addBtn);

    expect(screen.getByText("Tag already added.")).toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("should reject tag names exceeding 30 characters", () => {
    const handleChange = vi.fn();
    render(<TagInput tags={[]} onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/add a tag/i);
    fireEvent.change(input, { target: { value: "a".repeat(31) } });

    const addBtn = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addBtn);

    expect(
      screen.getByText("Tag name cannot exceed 30 characters.")
    ).toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("should call onChange with tag removed when remove button is clicked", () => {
    const handleChange = vi.fn();
    render(<TagInput tags={["bug", "ui"]} onChange={handleChange} />);

    const removeBtn = screen.getByRole("button", { name: /remove tag bug/i });
    fireEvent.click(removeBtn);

    expect(handleChange).toHaveBeenCalledWith(["ui"]);
  });
});
