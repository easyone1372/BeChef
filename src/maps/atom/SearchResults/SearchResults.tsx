import React from "react";
import InfoClickHeart from "../../../detailPage/molecules/InfoClickHeart";
import MapInfoBtn from "../Button/MapInfoBtn";
import InfoStar from "../../../detailPage/atom/InfoStar";

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
  userId?: number;
};

const SearchResults = ({ results, userId }: SearchResultsProps) => {
  if (results.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  console.log(results);

  const listHover = () => {};

  return (
    <div className="p-4">
      <ul className="mt-4">
        {results.map((result, index) => (
          <li
            key={index}
            className="border p-2 mb-2 hover:bg-skipMB ransition-colors duration-200"
            onMouseEnter={listHover}
            onMouseLeave={listHover}
          >
            <div className="w-px350 h-70">
              <img
                className="w-full h-full object-cover"
                src={`${result.img}`}
              />
            </div>
            <div>이름: {result.storeName}</div>
            <div>주소: {result.address}</div>
            <div className="flex gap-1 text-sm">
              <InfoStar starNum={result.rating} />
              <span>리뷰: {result.reviewCount}</span>
              <MapInfoBtn
                storeId={result.storeId}
                userId={userId}
                content="상세 정보"
              />
              {/* <InfoClickHeart storeId={result.storeId} userId={result.userId} /> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
