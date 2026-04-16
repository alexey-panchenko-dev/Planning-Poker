import { useSessionStore } from "@/entities/session/model/store";
import { useState } from "react";
import { Input, Button } from "@/shared";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [regData, setRegData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const registerUser = useSessionStore((state) => state.registerUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await registerUser(regData);
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        const detail = err.response?.data?.detail;
        setError(
          Array.isArray(detail)
            ? "Не правильно введен Email или Password"
            : detail || "Ошибка регистрации",
        );
      } else {
        setError("Ошибка сети");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Создать аккаунт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}

        <Input
          label="Email"
          name="email"
          value={regData.email}
          onChange={handleInpChange}
          placeholder="example@mail.com"
        />
        <Input
          label="Name"
          name="name"
          value={regData.name}
          onChange={handleInpChange}
          placeholder="Любое имя"
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={regData.password}
          onChange={handleInpChange}
          placeholder="Минимум 6 символов"
        />

        <Button
          value={isLoading ? "Регистрация..." : "Зарегистрироваться"}
          type="submit"
        />
      </form>
    </div>
  );
};
