import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit/react";
import { toast } from "react-toastify";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderError(
  error: FetchBaseQueryError | SerializedError | undefined
) {
  if (error && "originalStatus" in error) {
    if (error.originalStatus >= 500) {
      toast.error("Unexpected Error Happened" as string, {
        toastId: "Login Unexpected",
      });
    } else {
      toast.error(error.data, { toastId: "Login Error" });
    }
  }
}
