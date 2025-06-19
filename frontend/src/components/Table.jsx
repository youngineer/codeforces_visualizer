import React, { useEffect, useState } from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import {
  updateUserInDatabase,
  deleteUserFromDatabase,
  saveUserToDatabase,
  fetchAllUsersFromDatabase,
} from "@/services/tableServices";

export default function Table() {
  const [rows, setRawRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const setRows = (rows) => {
    const mapped = rows.map((r, i) => ({
      ...r,
      no: i + 1,
      updatedAt: r.updatedAt ? new Date(r.updatedAt) : null, // FIXED
    }));
    setRawRows(mapped);
  };


  const fetchAndSetRows = async () => {
    try {
      setLoading(true);
      const res = await fetchAllUsersFromDatabase();
      if (res) setRows(res);
    } catch (err) {
      console.error("Error fetching rows", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetRows();
  }, []);

  const onSaveRow = async (id, updatedRow, oldRow, oldRows) => {
    try {
      const newUser = {
        name: updatedRow.name,
        emailId: updatedRow.emailId,
        phoneNumber: updatedRow.phoneNumber,
        handle: updatedRow.handle,
      };

      const allUsers = await saveUserToDatabase(newUser);

      const enrichedUsers = allUsers.map((u, index) => ({
        ...u,
        id: u._id,
        no: index + 1,
        updatedAt: u.updatedAt ? new Date(u.updatedAt) : null,
      }));

      setRawRows(enrichedUsers);
    } catch (err) {
      console.error(err);
    }
  };


  const onDeleteRow = async (id, oldRow, oldRows) => {
    try {
      await deleteUserFromDatabase({ handle: oldRow.handle });
      fetchAndSetRows();
    } catch (err) {
      console.error("Error deleting row:", err);
    }
  };

  const createRowData = (rows) => {
    const getNextValue = (key) =>
      rows.length > 0
        ? Math.max(...rows.map((r) => Number(r[key] || 0))) + 1
        : 1;

    return {
      id: getNextValue("id"),
      no: getNextValue("no"),
      name: "",
      handle: "",
      currentRating: 0,
      maxRating: 0,
      emailId: "",
      phoneNumber: "",
      updatedAt: new Date(),
      isNew: true,
    };
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "handle", headerName: "CF Handle", width: 120, editable: true },
    {
      field: "currentRating",
      headerName: "Current Rating",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "maxRating",
      headerName: "Max Rating",
      width: 120,
      editable: true,
      type: "number",
    },
    {
      field: "emailId",
      headerName: "E-mail",
      width: 180,
      editable: true,
      type: "email",
    },
    {
      field: "phoneNumber",
      headerName: "Contact Number",
      width: 160,
      editable: true,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 120,
      editable: true,
      type: "date",
    },
  ];

  return (
    <FullEditDataGrid
      columns={columns}
      rows={rows}
      onSaveRow={onSaveRow}
      onDeleteRow={onDeleteRow}
      createRowData={createRowData}
      loading={loading}
    />
  );
}
