import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectLastPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, [navigate]);

  return null;
}

export default RedirectLastPage;
