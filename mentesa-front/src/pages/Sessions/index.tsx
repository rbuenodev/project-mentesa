import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/Header";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { usePatientList } from "../../services/Patient/hooks";
import { getUserId } from "../../services/Auth/service";
import formatDate from "../../utils/formatDate";
import { InputSeach, SessionButton } from "./style";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IRow {
  id: string;
  professionalId: string;
  patientId: string;
  appointmentDate: string;
  statusId: string;
  topic: string;
  appointmentTypeId: string;
  sessionTypeId: string;
  createdAt: string;
}

const Sessions: React.FC = () => {
  const [rows, setRows] = useState([] as IRow[]);
  const [filteredRows, setFilteredRows] = useState([] as IRow[]);

  const columns: GridColDef<IRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "themeHeader",
    },
    {
      field: "professionalId",
      headerName: "Profissional",
      width: 150,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "patientId",
      headerName: "Paciente",
      width: 150,
      headerClassName: "themeHeader",
    },
    {
      field: "appointmentDate",
      headerName: "Data",
      width: 150,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "statusId",
      headerName: "Status",
      width: 110,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "topic",
      headerName: "Topico",
      width: 160,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "appointmentTypeId",
      headerName: "Tipo de apontamento",
      width: 160,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "sessionTypeId",
      headerName: "Tipo de Sessão",
      width: 160,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "createdAt",
      headerName: "Data de registo",
      width: 160,
      editable: false,
      headerClassName: "themeHeader",
    },
  ];

  // useEffect(() => {
  //   if (data) {
  //     const rowMapped = data.map((patient) => {
  //       return {
  //         id: patient.id,
  //         name: patient.name,
  //         cpf: patient.cpf,
  //         email: patient.email,
  //         gender: patient.gender,
  //         createdAt: formatDate(patient.createdAt),
  //       };
  //     }, []);
  //     setRows(rowMapped);
  //   } else {
  //     setRows([]);
  //   }
  // }, [data]);

  const handleSearch = (input: string) => {
    console.log(input);
    // if (input.length === 0) {
    //   setFilteredRows([]);
    // } else {
    //   const search = rows.filter((patient) => {
    //     return (
    //       patient.name.includes(input.toLocaleLowerCase()) ||
    //       patient.cpf.includes(input.toLocaleLowerCase())
    //     );
    //   });
    //   setFilteredRows(search);
    // }
  };

  return (
    <Container>
      <CustomHeader>
        <h1>Minhas Sessões</h1>
        <InputSeach
          placeholder="Pesquisar"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        ></InputSeach>
        <SessionButton>
          <AddCircleIcon className="iconTheme" />
          Nova Sessão
        </SessionButton>
      </CustomHeader>
      <Box
        sx={{
          height: 400,
          width: "100%",
          "& .themeHeader": {
            backgroundColor: "#6813d4",
            color: "#fff",
          },
        }}
      >
        <DataGrid
          rows={filteredRows.length === 0 ? rows : filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  );
};

export default Sessions;
