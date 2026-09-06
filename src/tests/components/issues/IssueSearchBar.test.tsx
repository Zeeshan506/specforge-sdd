import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IssueSearchBar } from "@/components/issues/IssueSearchBar";

const mockPush = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("IssueSearchBar Component (AC-4, AC-7)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it("should render search input with placeholder", () => {
    render(<IssueSearchBar />);
    expect(
      screen.getByPlaceholderText(/search issues by title or description/i)
    ).toBeInTheDocument();
  });

  it("should submit search query and update URL preserving existing params", () => {
    mockSearchParams = new URLSearchParams("tag=frontend&status=OPEN");
    render(<IssueSearchBar />);

    const input = screen.getByPlaceholderText(/search issues/i);
    fireEvent.change(input, { target: { value: "responsive" } });
    fireEvent.submit(input);

    expect(mockPush).toHaveBeenCalledWith(
      "/issues?tag=frontend&status=OPEN&q=responsive"
    );
  });

  it("should show clear button when search term is present and clicking it clears search", () => {
    mockSearchParams = new URLSearchParams("q=crash");
    render(<IssueSearchBar />);

    const clearButton = screen.getByRole("button", { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(mockPush).toHaveBeenCalledWith("/issues");
  });
});
