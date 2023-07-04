"use client";
import { signOut } from "next-auth/react";

const SignOutButton = ({
  
}) => {
  return (
    <button
      onClick={() => signOut()}
      className="btn btn-sm  bg-gradient-primary  btn-round mb-0 ms-auto"
    >
      SignOut
    </button>
  );
};

export default SignOutButton;
