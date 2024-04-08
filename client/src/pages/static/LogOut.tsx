import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthToken } from "../../store/slices/auth";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      localStorage.removeItem("token");
      dispatch(setAuthToken(null));
      toast.success("Successfully Logged Out!", { toastId: "Logout" });
      navigate("/");
    } catch (error) {}
  }, [dispatch, navigate]);

  return null;
}

export default LogOut;
