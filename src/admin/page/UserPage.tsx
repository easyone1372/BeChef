import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../organisms/User/UserTable";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";

export type User = {
  member_idx: number;
  member_name: string;
  member_id: string;
  member_email: string;
  member_phone: string;
  member_address: string;
};

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(
        "http://localhost:3001/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (member_idx: number) => {
    if (window.confirm("정말로 이 사용자를 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${member_idx}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.member_idx !== member_idx)
        );
        alert("사용자가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("사용자 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              회원 정보 관리
            </h1>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <UserTable users={users} onDelete={handleDelete} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPage;
