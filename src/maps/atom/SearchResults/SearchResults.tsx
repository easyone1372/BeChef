import React from "react";
import InfoClickHeart from "../../../detailPage/molecules/InfoClickHeart";

export type Store = {
  storeId: number;
  storeName: string;
  address: string;
  menuName: string;
  latitude: number;
  longitude: number;
  img: string;
  rating: number;
  reviewCount: number;
};

type SearchResultsProps = {
  results: Store[];
};

const SearchResults = ({ results }: SearchResultsProps) => {
  if (results.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  console.log(results);
  return (
    <div className="p-4">
      <ul className="mt-4">
        {results.map((result, index) => (
          <li key={index} className="border p-2 mb-2">
            <div>
              사진: <img src={`${result.img}`}></img>
            </div>
            <div>이름: {result.storeName}</div>
            <div>주소: {result.address}</div>
            <div className="flex gap-1 text-sm">
              <span>별점: {result.rating}</span>
              <span>리뷰: {result.reviewCount}</span>
              {/* <InfoClickHeart storeId={result.storeId} userId={result.userId} /> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
