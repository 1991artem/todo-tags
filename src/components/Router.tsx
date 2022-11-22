import { Routes, Route, Navigate } from "react-router-dom";
import { ITransferTodos } from "../interfaces/interfaces";
import { ErrorPage } from "./ErrorPage";
import List from "./List/List";

function AppRouter({todos}: ITransferTodos) {
  return ( 
    <Routes>
      <Route
        path=""
        element={<Navigate to="1" replace />}
    />
      <Route path=":id" element={<List todos={todos}/>} errorElement={<ErrorPage />}/>
      <Route path="*" element={<ErrorPage />} errorElement={<ErrorPage />}/>
    </Routes>
    );
}

export default AppRouter;