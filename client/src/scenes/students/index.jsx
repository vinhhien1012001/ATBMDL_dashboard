import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { blue } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

import { useGetStudentsQuery } from "../../state/api";
import axios from "../../state/axios-instance";

import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

/* Add button */

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        _id: id,
        class: "",
        dayAdmission: "",
        isPaid: false,
        monthlyFee: "",
        quarterFee: "",
        annualFee: "",
        name: "",
        parentName: "",
        parentPhone: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

function renderEditBoolean(params) {
  const value = params.value != null ? params.value : false;
  return (
    <Box
      sx={{
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100%",
      }}
    >
      <Checkbox
        sx={{
          color: blue[800],
          "&.Mui-checked": {
            color: blue[600],
          },
        }}
        checked={value}
        onChange={(event) => {
          params.api.setEditCellValue({
            id: params.id,
            field: params.field,
            value: event.target.checked,
          });
        }}
      />
    </Box>
  );
}

export default function Students() {
  const theme = useTheme();
  const { data, isLoading } = useGetStudentsQuery();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ADD
  /* ************************************************************ */
  const [rowModesModel, setRowModesModel] = useState({});
  const [rows, setRows] = useState();

  useEffect(() => {
    if (data != null) {
      setRows(data);
    }
  }, [data]);

  // useEffect(() => {
  //   if (rows) {
  //     console.log("rows:", rows);
  //   }
  // }, [rows]);

  // useEffect(() => {
  //   console.log("row modes model:", rowModesModel);
  // }, [rowModesModel]);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    axios.delete(`/student/delete/${id}`).then(() => {
      setRows(rows.filter((row) => row._id !== id));
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    // updatedRow.monthlyFee = (Number(updatedRow.quarterFee) / 3).toString();
    // updatedRow.annualFee = (Number(updatedRow.quarterFee) * 4).toString();

    if (Number.isInteger(Number(updatedRow.quarterFee) / 3)) {
      newRow.monthlyFee = (Number(updatedRow.quarterFee) / 3).toString();
    } else {
      newRow.monthlyFee = (Number(updatedRow.quarterFee) / 3)
        .toFixed(2)
        .toString();
    }

    newRow.annualFee = (Number(updatedRow.quarterFee) * 4).toString();
    if (newRow.isNew) {
      axios
        .post("/student/add", newRow)
        .then((res) => {
          setRows(rows.filter((row) => row._id !== newRow._id));
          setRows((oldRows) => [...oldRows, res.data]);
        })
        .catch((err) => console.log(err));
    } else {
      axios.put(`/student/edit/${newRow._id}`, newRow).then((res) => {
        setRows(rows.map((row) => (row._id === res.data._id ? res.data : row)));
      });
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  /* ************************************************************************* */

  const columns = [
    {
      field: "name",
      headerName: "Tên HS",
      flex: 0.6,
      editable: true,
    },
    {
      field: "parentPhone",
      headerName: "SĐT PH",
      flex: 0.3,
      editable: true,
    },
    {
      field: "parentName",
      headerName: "Tên PH",
      flex: 0.6,
      editable: true,
    },
    {
      field: "class",
      headerName: "Lớp",
      flex: 0.1,
      editable: true,
    },
    {
      field: "typeCourse",
      headerName: "CT",
      flex: 0.2,
      editable: true,
    },
    {
      field: "dayAdmission",
      headerName: "Ngày vào học",
      flex: 0.3,
      editable: true,
    },
    {
      field: "monthlyFee",
      headerName: "THÁNG",
      flex: 0.2,
      editable: true,
      renderCell: (params) => {
        return "$" + params.value;
      },
    },
    {
      field: "quarterFee",
      headerName: "QUÝ",
      flex: 0.2,
      editable: true,
      renderCell: (params) => {
        return "$" + params.value;
      },
    },
    {
      field: "annualFee",
      headerName: "NĂM",
      flex: 0.2,
      editable: true,
      renderCell: (params) => {
        return "$" + params.value;
      },
    },
    {
      field: "isPaid",
      headerName: "ĐÃ ĐÓNG HP",
      flex: 0.3,
      editable: true,
      renderCell: (params) => {
        return params.value === false ? (
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "100%",
            }}
          >
            <Checkbox
              defaultValue={false}
              disabled
              sx={{
                color: blue[800],
                "&.Mui-checked": {
                  color: blue[600],
                },
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "100%",
            }}
          >
            <Checkbox
              disabled
              checked
              sx={{
                color: blue[800],
                "&.Mui-checked": {
                  color: blue[600],
                },
              }}
            />
          </Box>
        );
      },
      renderEditCell: renderEditBoolean,
    },

    // Add
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={{}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={{}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
        <Box m="0rem 2.5rem">
          <Header title="LIST OF STUDENTS" />
          <Box
            mt="20px"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              rows={rows || []}
              columns={columns}
              editMode="row"
              loading={isLoading || !rows}
              getRowId={(row) => row._id}
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar: EditToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
