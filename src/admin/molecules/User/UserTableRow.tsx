import React from "react";
import TableCell from "../../atom/User/TableCell";
import Button from "../../atom/User/Button";

export type User = {
  member_idx: number;
  member_name: string;
  member_id: string;
  member_email: string;
  member_phone: string;
  member_address: string;
};

type UserTableRowProps = {
  user: User;
  onDelete: (userNO: number) => void;
};

const UserTableRow = ({ user, onDelete }: UserTableRowProps) => (
  <tr>
    <TableCell>{user.member_name}</TableCell>
    <TableCell>{user.member_id}</TableCell>
    <TableCell>{user.member_email}</TableCell>
    <TableCell>{user.member_address}</TableCell>
    <TableCell>
      <Button
        onClick={() => onDelete(user.member_idx)}
        className="bg-red-500 hover:bg-red-700 text-white"
      >
        탈퇴
      </Button>
    </TableCell>
  </tr>
);

export default UserTableRow;
