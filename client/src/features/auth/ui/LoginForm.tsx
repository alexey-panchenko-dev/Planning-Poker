import { useSessionStore } from "@/entities/session/model/store";
import { useState } from "react";
import { type UserI } from "@/entities/session/model/types";
import { Input, Button } from "@/shared";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<UserI>({
    mail: "",
    password: "",
  });

  const loginUser = useSessionStore((state) => state.loginUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(loginData);
    navigate("/");
  };

  const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Войти в аккаунт</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="mail"
          value={loginData.mail}
          onChange={handleInpChange}
          placeholder="Введите адрес эл. почты"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInpChange}
          placeholder="Введите пароль"
        />

        <Button value="Войти" type="submit" variant="primary" />
      </form>
    </div>
  );
};
