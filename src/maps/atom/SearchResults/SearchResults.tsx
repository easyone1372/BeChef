import React from "react";

type Store = {
  storeId: number;
  storeName: string;
  address: string;
  menuName: string;
  img: string;
};

type SearchResultsProps = {
  results: Store[];
};

const SearchResults = ({ results }: SearchResultsProps) => {
  if (results.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <ul className="mt-4">
        {results.map((result, index) => (
          <li key={index} className="border p-2 mb-2">
            <div>이름: {result.storeName}</div>
            <div>주소: {result.address}</div>
            <div>메뉴: {result.menuName}</div>
            <div>사진: {result.img}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
