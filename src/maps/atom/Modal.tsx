import React, { useEffect, useState } from "react";
import Button from "./Button/Button";
import axios from "axios";

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

type reviews = {
  comment: string;
  review_date: string;
};

const Modal = ({ showModal, closeModal }: ModalProps) => {
  const [reviews, setReviews] = useState<reviews[]>([]);
  const [favorites, setfavorites] = useState<string[]>([]);

  useEffect(() => {
    if (showModal) {
      // 리뷰와 찜 리스트를 각각 불러오는 API 호출
      const fetchReviews = async () => {
        try {
          const response = await axios.get("http://localhost:3001/api/reviews");
          setReviews(response.data);
        } catch (error) {
          console.log("리뷰 데이터를 불러오는 중 오류가 발생했습니다.", error);
        }
      };

      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/favorites"
          );
          setfavorites(response.data);
        } catch (error) {
          console.log(
            "찜 리스트 데이터를 불러오는 중 오류가 발생했습니다.",
            error
          );
        }
      };

      fetchReviews();
      fetchFavorites();
    }
  }, [showModal]);

  if (!showModal) return null;

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(
        `http://localhost:3001/api/delete-account/1` // 사용자의 ID로 대체
      );
      if (response.status === 200) {
        console.log("Account Deleted");
        // 추가적인 로그아웃 로직이나 UI 업데이트 수행
        closeModal();
      }
    } catch (error) {
      console.log("Error deleting account", error);
    }
  };

  return (
    <div className="text-black fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 w-3/6 max-h-[60vh] overflow-hidden flex flex-col">
        <h2 className="text-xl mb-4">마이페이지</h2>

        <div className="flex-1 flex space-x-4 overflow-hidden">
          <div className="w-1/2 flex flex-col">
            <div className="font-semibold mb-2">내가 작성한 리뷰</div>
            <div className="text-sm border-2 border-black p-2 rounded flex-1 overflow-y-auto">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div className="flex gap-5 mb-2" key={index}>
                    <div className="w-52">{review.comment}</div>
                    <div className="text-left">{review.review_date}</div>
                  </div>
                ))
              ) : (
                <div>리뷰 없음</div>
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <div className="font-semibold mb-2">찜리스트</div>
            <div className="border-2 border-black p-2 rounded flex-1 overflow-y-auto">
              {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                  <div key={index}>{favorite}</div>
                ))
              ) : (
                <div>찜 목록 없음</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-4">
          <Button
            text="회원탈퇴"
            onClick={handleDeleteAccount}
            className="mt-4 text-red-500"
          ></Button>
          <Button
            onClick={closeModal}
            text="닫기"
            className="mt-4 border p-2 rounded text-white bg-red-500 flex"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
