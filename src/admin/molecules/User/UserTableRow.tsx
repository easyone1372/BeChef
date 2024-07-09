import React from "react";
import TableCell from "../../atom/User/TableCell";
import Button from "../../atom/User/Button";

type User = {
  userNO: number;
  userName: string;
  userID: string;
  email: string;
  address: string;
};

type UserTableRowProps = {
  user: User;
  onDelete: (userNO: number) => void;
};

const UserTableRow = ({ user, onDelete }: UserTableRowProps) => (
  <tr>
    <TableCell>{user.userName}</TableCell>
    <TableCell>{user.userID}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.address}</TableCell>
    <TableCell>
      <Button
        onClick={() => onDelete(user.userNO)}
        className="bg-red-500 hover:bg-red-700 text-white"
      >
        탈퇴
      </Button>
    </TableCell>
  </tr>
);

export default UserTableRow;
