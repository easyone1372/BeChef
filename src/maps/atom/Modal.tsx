import React from "react";
import Button from "./Button/Button";

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
};

const Modal = ({ showModal, closeModal }: ModalProps) => {
  if (!showModal) return null;
  return (
    <div className="text-black fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 w-3/6">
        <h2 className="text-xl mb-4">마이페이지</h2>

        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="font-semibold mb-2">내가 작성한 리뷰</div>
            <div className="border border-black p-2 rounded">리뷰 내용</div>
          </div>

          <div className="flex-1">
            <div className="font-semibold mb-2">찜리스트</div>
            <div className="border border-black p-2 rounded">찜 내용</div>
          </div>
        </div>

        <div className="flex justify-center imtems-center space-x-4 mt-4 ">
          <Button
            text="회원탈퇴"
            onClick={() => {}}
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
