/* eslint-disable no-unused-vars */
import React from "react";
import { Route } from "react-router-dom";
import Rembulan from "../pages/gallery/Rembulan"; // Pastikan path ini benar

const BooksRoutes = [
  <Route key="rembulan" path="/rembulan" element={<Rembulan />} />
];

export default BooksRoutes;
