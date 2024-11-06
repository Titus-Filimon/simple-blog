import React from "react";
import LoginPage from "./LoginPage";
import CMSPage from "./CMSPage";

function AdminPage({ page }) {
  return (
    <div>
      {page === "login" && <LoginPage />}
      {page === "dashboard" && <CMSPage />}
    </div>
  );
}

export default AdminPage;
