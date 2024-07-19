import React from "react";
import { User } from "../../page/UserPage";

type UserTableProps = {
  users: User[];
  onDelete: (member: number) => void;
};

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            이름
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            아이디
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            이메일
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            전화번호
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            주소
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            작업
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((member) => (
          <tr key={member.member_idx}>
            <td className="px-6 py-4 whitespace-nowrap">
              {member.member_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{member.member_id}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {member.member_email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {member.member_phone}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {member.member_address}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => onDelete(member.member_idx)}
                className="text-red-600 hover:text-red-900"
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
