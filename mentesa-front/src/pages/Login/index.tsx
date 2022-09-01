import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import {
  AccessContainer,
  ButtonContainer,
  Container,
  Content,
  Subtitle,
  Title,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchUserLogin } from "../../services/Auth/service";
import { useAuth } from "../../hooks/auth";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { singIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email !== "" && password !== "") {
      mutate();
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate } = useMutation(
    () =>
      fetchUserLogin({
        email,
        password,
      }),
    {
      onSuccess: () => {
        singIn();

        toast.success("Login realizado com sucesso", {
          hideProgressBar: false,
        });
        navigate("/dashboard");
      },
      onError: (msg) => {
        toast.error(`Ops, algo aconteceu ${msg}`);
      },
    }
  );

  return (
    <Container>
      <CssBaseline />
      <Content>
        <Title>Mente Sã</Title>
        <Subtitle>Bem vindo ao sistema</Subtitle>
        <p>Por favor entre com sua conta</p>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <AccessContainer>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar Usuário"
            />
            <Link href="#" variant="body2">
              Esqueci minha senha?
            </Link>
          </AccessContainer>
          <ButtonContainer>
            <Link href="#" variant="body2">
              {"Criar Conta"}
            </Link>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </ButtonContainer>
        </Box>
      </Content>
    </Container>
  );
};
export default Login;
