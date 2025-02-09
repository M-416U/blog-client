import { langType } from "@/@types";
import { RegisterForm } from "@/components/RegisterForm";
import React from "react";

const Login = async ({ params }: { params: Promise<{ lang: langType }> }) => {
  const lang = (await params).lang;
  return <RegisterForm lang={lang} />;
};

export default Login;
