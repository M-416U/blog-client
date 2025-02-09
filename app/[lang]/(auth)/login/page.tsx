import { langType } from "@/@types";
import { LoginForm } from "@/components/LoginForm";
import React from "react";

const Login = ({ params: { lang } }: { params: { lang: langType } }) => {
  return <LoginForm lang={lang} />;
};

export default Login;
