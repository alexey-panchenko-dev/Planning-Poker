import { useSessionStore } from "@/entities/session/model/useSessionStore";
import { useAuthForm } from "../model/useAuthForm";
import { Input, Button } from "@/shared";

export const LoginForm = () => {
  const loginUser = useSessionStore((state) => state.loginUser);

  const validate = (data: any) => {
    const errors: Record<string, string> = {};

    if (!data.email.includes("@")) {
      errors.email = "Email должен содержать @";
    }
    if (!data.email.includes(".")) {
      errors.email = "Email должен содержать .";
    }
    if (data.password.length < 8) {
      errors.password = "Пароль должен быть от 8 символов";
    }

    return errors;
  };
  const {
    formData,
    error,
    fieldErrors,
    isLoading,
    handleSubmit,
    handleInpChange,
  } = useAuthForm(
    {
      email: "",
      password: "",
    },
    loginUser,
    "Ошибка входа",
    validate,
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Войти в аккаунт</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}

        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInpChange}
          placeholder="example@mail.com"
          error={fieldErrors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInpChange}
          placeholder="Введите пароль"
          error={fieldErrors.password}
        />

        <Button value={isLoading ? "Загрузка..." : "Войти"} type="submit" />
      </form>
    </div>
  );
};
