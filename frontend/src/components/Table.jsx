import * as React from "react";
import FullEditDataGrid from "mui-datagrid-full-edit";
import { useEffect, useState } from "react";
import sellerController from "@/services/tableServices";

export default function Table() {
  const [rows, setRawRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const setRows = (rows) => {
    return setRawRows([...rows.map((r, i) => ({ ...r, no: i + 1 }))]);
  };
  useEffect(() => {
    setLoading(true);
    sellerController
      .getAll()
      .then((res) => {
        setRows(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSaveRow = (id, updatedRow, oldRow, oldRows) => {
    sellerController
      .saveRow(updatedRow)
      .then((res) => {
        const dbRow = res.data;
        setRows(oldRows.map((r) => (r.id === updatedRow.id ? { ...dbRow } : r)));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const onDeleteRow = (id, oldRow, oldRows) => {
    sellerController
      .deleteRow(id)
      .then((res) => {
        const dbRowId = res.data.id;
        setRows(oldRows.filter((r) => r.id !== dbRowId));
      })
      .catch((err) => {
        setRows(oldRows);
      });
  };

  const createRowData = (rows) => {
    const newId = Math.max(...rows.map((r) => (r.id ? r.id : 0) * 1)) + 1;
    const newNo = Math.max(...rows.map((r) => (r.no ? r.no : 0) * 1)) + 1;
    return { id: newId, no: newNo };
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'handle', headerName: 'CF Handle', width: 120, editable: true },
    { 
      field: 'currentRating', 
      headerName: 'Current Rating', 
      width: 120, 
      editable: true,
      type: 'number'
    },
    { 
      field: 'maxRating', 
      headerName: 'Max Rating', 
      width: 120, 
      editable: true,
      type: 'number'
    },
    { 
      field: 'emailId', 
      headerName: 'E-mail', 
      width: 180, 
      editable: true,
      type: 'email'
    },
    { field: 'phoneNumber', headerName: 'Contact Number', width: 160, editable: true },
    { 
      field: 'updatedAt', 
      headerName: 'Updated At', 
      width: 120, 
      editable: true,
      type: 'date'
    }];

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
