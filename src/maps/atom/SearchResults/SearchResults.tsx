import React from "react";
import InfoClickHeart from "../../../detailPage/molecules/InfoClickHeart";
import MapInfoBtn from "../Button/MapInfoBtn";
import InfoStar from "../../../detailPage/atom/InfoSetStar";

export type Store = {
  store_id: number;
  store_name: string;
  store_address: string;
  menu_name: string;
  store_latitude: number;
  store_longitude: number;
  img: string;
  store_rating: number;
  reviewCount: number;
};

type SearchResultsProps = {
  results: Store[];
  user_id?: number;
  onMarkerHover: (storeId: number | null) => void; //마커 hover 이벤트 콜백 함수
};

const SearchResults = ({
  results,
  user_id,
  onMarkerHover,
}: SearchResultsProps) => {
  if (results.length === 0) {
    return <div className="p-3">검색 결과가 없습니다.</div>;
  }

  console.log(results);

  //리스트 아이템 hover 이벤트 핸들러
  const handleListHover = (storeId: number | null) => {
    onMarkerHover(storeId);
  }; // 마커 hover 이벤트 전달};

  return (
    <ul className="mt-4 h-[900px] overflow-y-scroll">
      {results.map((result, index) => (
        <li
          key={index}
          className="border p-2 mb-2 hover:bg-skipMB transition-colors duration-200"
          onMouseEnter={() => {
            handleListHover(result.store_id);
          }} // 마우스 오버 이벤트 함수 호출
          onMouseLeave={() => {
            handleListHover(null);
          }} // 마우스 아웃 이벤트 함수 호출 (모든 마커 hover 해제)
        >
          <div className="w-full h-70">
            <img
              className="w-full h-full object-cover"
              src={`${result.img}`}
              alt={`${result.store_name}`}
            />
          </div>
          <div>이름: {result.store_name}</div>
          <div>주소: {result.store_address}</div>
          <div className="flex gap-1 text-sm">
            <InfoStar starNum={result.store_rating} />
            <span>리뷰: {result.reviewCount}</span>
            <MapInfoBtn
              store_id={result.store_id}
              user_id={user_id}
              content="상세 정보"
            />
            {/* <InfoClickHeart storeId={result.storeId} userId={result.userId} /> */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
