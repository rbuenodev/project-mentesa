import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/Header";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { usePatientList } from "../../services/Patient/hooks";
import { getUserId } from "../../services/Auth/service";
import formatDate from "../../utils/formatDate";
import { InputSeach, PatientButton } from "./style";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface IRow {
  id: string;
  name: string;
  cpf: string;
  email: string;
  gender: string;
  createdAt: string;
}

const Patients: React.FC = () => {
  const [rows, setRows] = useState([] as IRow[]);
  const [filteredRows, setFilteredRows] = useState([] as IRow[]);
  const { data } = usePatientList({ id: getUserId() });

  const columns: GridColDef<IRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "themeHeader",
    },
    {
      field: "name",
      headerName: "Nome",
      width: 150,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "cpf",
      headerName: "CPF",
      width: 150,
      headerClassName: "themeHeader",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 150,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "gender",
      headerName: "Gênero",
      width: 110,
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

  useEffect(() => {
    if (data) {
      const rowMapped = data.map((patient) => {
        return {
          id: patient.id,
          name: patient.name,
          cpf: patient.cpf,
          email: patient.email,
          gender: patient.gender,
          createdAt: formatDate(patient.createdAt),
        };
      }, []);
      setRows(rowMapped);
    } else {
      setRows([]);
    }
  }, [data]);

  const handleSearch = (input: string) => {
    if (input.length === 0) {
      setFilteredRows([]);
    } else {
      const search = rows.filter((patient) => {
        return (
          patient.name.toLowerCase().indexOf(input) !== -1 ||
          patient.cpf.toLowerCase().indexOf(input) !== -1
        );
      });
      setFilteredRows(search);
    }
  };

  return (
    <Container>
      <CustomHeader>
        <h1>Meus Pacientes</h1>
        <InputSeach
          placeholder="Pesquisar"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        {/* <PatientButton>
          <AddCircleIcon className="iconTheme" />
          Novo Paciente
        </PatientButton> */}
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

export default Patients;
