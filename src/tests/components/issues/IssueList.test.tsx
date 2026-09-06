import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IssueList } from "@/components/issues/IssueList";
import type { IssueWithDetails } from "@/server/queries/issues";

describe("IssueList Component (AC-3, AC-7)", () => {
  const sampleIssues: IssueWithDetails[] = [
    {
      id: "issue-1",
      title: "Header navigation overlapping",
      description: "On mobile screen sizes",
      status: "OPEN",
      userId: "user-1",
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
      },
      tags: [
        {
          id: "tag-1",
          name: "ui",
          color: "#3b82f6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "tag-2",
          name: "mobile",
          color: "#3b82f6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  ];

  it("should render issue items with their associated tag badges (AC-3)", () => {
    render(<IssueList issues={sampleIssues} />);

    expect(
      screen.getByText("Header navigation overlapping")
    ).toBeInTheDocument();
    expect(screen.getByText("#ui")).toBeInTheDocument();
    expect(screen.getByText("#mobile")).toBeInTheDocument();
    expect(screen.getByText("Opened by John Doe")).toBeInTheDocument();
  });

  it("should render initial empty state when no issues exist and no active filters", () => {
    render(<IssueList issues={[]} hasActiveFilters={false} />);

    expect(screen.getByText("No issues found")).toBeInTheDocument();
    expect(screen.getByText("Create First Issue")).toBeInTheDocument();
  });

  it("should render filter empty state with reset button when active filters match zero issues (AC-7)", () => {
    render(<IssueList issues={[]} hasActiveFilters={true} />);

    expect(screen.getByText("No matching issues found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search terms or clearing active filters.")
    ).toBeInTheDocument();
    expect(screen.getByText("Reset all filters")).toBeInTheDocument();
  });
});
