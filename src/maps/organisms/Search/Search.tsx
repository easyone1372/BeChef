import React, { useState } from "react";
import axios from "axios";
import HeaderSection from "../../molecules/HeaderSection/HeaderSection";
import SearchSection from "../../molecules/SearchSection/SearchSection";
import SearchResults, { Store } from "../../atom/SearchResults/SearchResults";

// Store 인터페이스 정의

interface SearchProps {
  setResults: React.Dispatch<React.SetStateAction<Store[]>>; // Store[] 타입으로 설정
}

const Search: React.FC<SearchProps> = ({ setResults }) => {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [results, setResultsState] = useState<Store[]>([]); // 검색 결과 상태

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = async () => {
    try {
      const response = await axios.get<Store[]>(
        `http://localhost:3001/search?query=${query}`
      );
      setResultsState(response.data);
      setResults(response.data); // 부모 컴포넌트에 검색 결과 전달
    } catch (error) {
      console.error("검색 결과를 가져오는 중 오류 발생:", error);
    }
  };

  // 엔터 키 누를 시 검색 함수 호출
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-lightG">
      <HeaderSection /> {/* 헤더 섹션 */}
      <div className="p-4">
        <SearchSection
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
        />
        <SearchResults results={results} /> {/* 검색 결과 섹션 */}
      </div>
    </div>
  );
};

export default Search;
