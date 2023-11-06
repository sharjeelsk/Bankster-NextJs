"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

function VerificationFailed(props) {
  const router = useRouter();
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="mt-3">Account already exists, Try LogIn</h1>
      <Button variant="contained" onClick={() => router.push("/login")}>
        LogIn
      </Button>
    </div>
  );
}

export default VerificationFailed;
