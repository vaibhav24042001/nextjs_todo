import { LoginForm } from "components/LoginForm";
import { useAuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { setLocalStorage } from "utils/localStorage";
import { ErrorMessage } from "./ErrorMessage";

const NAME_INPUT_NAME = "user-name";
const PASSWORD_INPUT_NAME = "user-password";

const INPUTS_CONFIG = [
  {
    type: "text",
    name: NAME_INPUT_NAME,
    placeholder: "Enter your username",
    minLength: 3,
    maxLength: 16,
    required: true
  },
  {
    type: "password",
    name: PASSWORD_INPUT_NAME,
    placeholder: "Enter your password",
    minLength: 8,
    maxLength: 16,
    required: true,
    pattern: "[\\w0-9]+",
    title:
      "This field must be at least 8 characters long, and contain only letters and numbers"
  }
];

export function RegisterForm({ type = "" }) {
  const [requestError, setRequestError] = useState(null);

  const { setAuth } = useAuthContext();

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    if (type !== "login" && type !== "signup") {
      throw new Error('"type" prop must be either login or signup');
    }

    const username = e.target[NAME_INPUT_NAME].value;
    const password = e.target[PASSWORD_INPUT_NAME].value;

    const response = await fetch(`/api/auth/${type}`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    if (response.status !== 200 && response.status !== 201) {
      return setRequestError(data);
    }

    const authData = {
      isAuth: true,
      username: data.username
    };

    setLocalStorage("authData", authData);

    setAuth(authData);

    router.push("/");
  };

  return (
    <>
      <LoginForm
        handleSubmit={handleSubmit}
        submitButtonText={type}
        inputsConfig={INPUTS_CONFIG}
      />
      <ErrorMessage error={requestError} />
    </>
  );
}
