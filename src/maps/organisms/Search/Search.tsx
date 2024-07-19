import React, { useState } from "react";
import axios from "axios";
import HeaderSection from "../../molecules/HeaderSection/HeaderSection";
import SearchSection from "../../molecules/SearchSection/SearchSection";
import SearchResults, { Store } from "../../atom/SearchResults/SearchResults";
import SortBtn from "../../molecules/sortBtn/SortBtn";

// Store 인터페이스 정의

interface SearchProps {
  setResults: React.Dispatch<React.SetStateAction<Store[]>>; // Store[] 타입으로 설정
  onMarkerHover: (storeId: number | null) => void; // 수정: 부모 컴포넌트로부터 전달받는 onMarkerHover 함수
}

const Search = ({ setResults, onMarkerHover }: SearchProps) => {
  const [query, setQuery] = useState(""); // 검색어 상태
  const [results, setResultsState] = useState<Store[]>([]); // 검색 결과 상태
  const [sortOption, setSortOption] = useState<string>("");

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

  // 정렬 버튼 클릭시 호출되는 함수
  const handleSort = (sortOption: string) => {
    let sortedResults = [...results];
    if (sortOption === "review") {
      sortedResults.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOption === "rating") {
      sortedResults.sort((a, b) => b.store_rating - a.store_rating);
    }
    setResultsState(sortedResults);
  };

  return (
    <div className="bg-npLG w-px415 flex flex-col h-full">
      <HeaderSection /> {/* 헤더 섹션 */}
      <div className="">
        <SearchSection
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
        />
        <SortBtn setSortOption={handleSort} />
        <SearchResults results={results} onMarkerHover={onMarkerHover} />{" "}
        {/* 검색 결과 섹션 */}
      </div>
    </div>
  );
};

export default Search;
