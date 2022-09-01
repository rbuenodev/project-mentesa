import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../services/queryClient";
import { useAuth } from "../hooks/auth";

const Routes: React.FC = () => {
  const { logged } = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{logged ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
    </QueryClientProvider>
  );
};

export default Routes;
