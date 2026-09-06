"use client";

import { useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { TagBadge } from "@/components/issues/TagBadge";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
}

export function TagInput({
  tags,
  onChange,
  maxTags = 10,
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAddTag = () => {
    const normalized = inputValue.trim().toLowerCase();
    setInputError(null);

    if (!normalized) {
      return;
    }

    if (normalized.length > 30) {
      setInputError("Tag name cannot exceed 30 characters.");
      return;
    }

    if (tags.includes(normalized)) {
      setInputError("Tag already added.");
      return;
    }

    if (tags.length >= maxTags) {
      setInputError(`Cannot add more than ${maxTags} tags.`);
      return;
    }

    onChange([...tags, normalized]);
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          disabled={disabled || tags.length >= maxTags}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (inputError) setInputError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            tags.length >= maxTags
              ? `Tag limit reached (${maxTags})`
              : "Add a tag (e.g. bug, frontend)..."
          }
          className="flex-1 px-3.5 py-2 border rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={disabled || !inputValue.trim() || tags.length >= maxTags}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/50 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </button>
      </div>

      {inputError && (
        <p className="text-xs text-red-600 dark:text-red-400">{inputError}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              name={tag}
              size="md"
              onRemove={disabled ? undefined : () => handleRemoveTag(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
