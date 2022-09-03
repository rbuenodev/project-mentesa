import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/Header";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Container } from "@mui/material";
import { getUserId } from "../../services/Auth/service";
import formatDate from "../../utils/formatDate";
import { InputSeach, SessionButton } from "./style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSessionList } from "../../services/Session/hooks";

interface IRow {
  id: string;
  professional: string;
  patient: string;
  appointmentDate: string;
  status: string;
  topic: string;
  appointmentType: string;
  sessionType: string;
  createdAt: string;
}

const Sessions: React.FC = () => {
  const [rows, setRows] = useState([] as IRow[]);
  const [filteredRows, setFilteredRows] = useState([] as IRow[]);
  const { data } = useSessionList({ id: getUserId() });

  const columns: GridColDef<IRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      headerClassName: "themeHeader",
    },
    {
      field: "professional",
      headerName: "Profissional",
      width: 150,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "patient",
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
      field: "status",
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
      field: "appointmentType",
      headerName: "Tipo de apontamento",
      width: 160,
      editable: false,
      headerClassName: "themeHeader",
    },
    {
      field: "sessionType",
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

  useEffect(() => {
    if (data) {
      const rowMapped = data.map((session) => {
        return {
          id: session.id,
          professional: session.professional.name,
          patient: session.patient.name,
          appointmentDate: formatDate(session.appointmentDate),
          status: session.status,
          topic: session.topic,
          appointmentType: session.appointmentType,
          sessionType: session.sessionType,
          createdAt: formatDate(session.createdAt),
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
      const search = rows.filter((session) => {
        return (
          session.patient.toLowerCase().indexOf(input) !== -1 ||
          session.status.toLowerCase().indexOf(input) !== -1
        );
      });
      setFilteredRows(search);
    }
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
        />
        {/* <SessionButton>
          <AddCircleIcon className="iconTheme" />
          Nova Sessão
        </SessionButton> */}
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
