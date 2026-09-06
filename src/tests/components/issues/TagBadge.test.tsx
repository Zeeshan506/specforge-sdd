import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TagBadge } from "@/components/issues/TagBadge";

describe("TagBadge Component (AC-3)", () => {
  it("should render tag name with hashtag prefix", () => {
    render(<TagBadge name="frontend" />);
    expect(screen.getByText("#frontend")).toBeInTheDocument();
  });

  it("should render a link when href is provided", () => {
    render(<TagBadge name="bug" href="/issues?tag=bug" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/issues?tag=bug");
    expect(link).toHaveTextContent("#bug");
  });

  it("should handle remove button click when onRemove is passed", () => {
    const handleRemove = vi.fn();
    render(<TagBadge name="urgent" onRemove={handleRemove} />);

    const removeBtn = screen.getByRole("button", {
      name: /remove tag urgent/i,
    });
    expect(removeBtn).toBeInTheDocument();

    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
