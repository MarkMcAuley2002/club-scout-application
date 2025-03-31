import React, { useEffect, useState } from "react";

// Predefined tags for selection
const availableTags = [
  "Sports",
  "Music",
  "Art",
  "Technology",
  "Science",
  "Food",
  "Travel",
  "Gaming",
];

interface SelectTagsProps {
  currentTags?: string[];
}

const SelectTags: React.FC<SelectTagsProps> = ({ currentTags }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const onTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleTagClick = (tag: string) => {
    if (selectedTags.length < 6 && !selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    onTagsChange(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  useEffect(() => {
    if (currentTags) {
      setSelectedTags(currentTags);
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Display Selected Tags as Spans */}
      <div className="mb-2 flex flex-wrap gap-2">
        <input
          type="hidden"
          name="club-tags"
          value={JSON.stringify(selectedTags)}
        />
        {selectedTags.map((tag, index) => (
          <span
            key={index}
            className=" bg-blue-500 text-white px-2 py-1 rounded-full cursor-pointer"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag} <span className="ml-1 text-xs">x</span>
          </span>
        ))}
      </div>

      {/* Search Bar with Dropdown Trigger */}
      <div
        className="flex items-center border border-gray-300 p-2 rounded cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <input
          type="text"
          placeholder="Search tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow outline-none p-2"
        />
        <span className="text-gray-500">{isDropdownOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && selectedTags.length < 6 && (
        <div className="absolute bg-white border rounded-lg shadow-lg w-full mt-2 z-50">
          <ul className="max-h-40 overflow-y-auto">
            {filteredTags.map((tag, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectTags;
