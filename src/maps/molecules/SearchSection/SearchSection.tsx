import React from "react";
import Input from "../../atom/Input/Input";
import Button from "../../atom/Button/Button";
import HeaderSection from "../HeaderSection/HeaderSection";

interface SearchSectionProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  query,
  setQuery,
  handleSearch,
  handleKeyPress,
}) => {
  return (
    <div className="p-4 border-b-2">
      <div className="flex">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button text="검색" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default SearchSection;
