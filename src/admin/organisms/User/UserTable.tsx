import React from "react";
import UserTableHeader from "../../molecules/User/UserTableHeader";
import UserTableRow from "../../molecules/User/UserTableRow";

type User = {
  userNO: number;
  userName: string;
  userID: string;
  email: string;
  address: string;
};

type UserTableProps = {
  users: User[];
  onDelete: (userNO: number) => void;
};

const UserTable = ({ users, onDelete }:UserTableProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <UserTableHeader />
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <UserTableRow key={user.userNO} user={user} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
