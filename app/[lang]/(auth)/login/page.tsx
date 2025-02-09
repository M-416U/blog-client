import { langType } from "@/@types";
import { LoginForm } from "@/components/LoginForm";
import React from "react";

const Login = async ({ params }: { params: Promise<{ lang: langType }> }) => {
  const lang = (await params).lang;
  return <LoginForm lang={lang} />;
};

export default Login;
