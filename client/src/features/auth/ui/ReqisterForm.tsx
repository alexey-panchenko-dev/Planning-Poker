import { Input, Button } from "@/shared";
import { useAuthForm } from "../model/useAuthForm";
import { useSessionStore } from "@/entities/session/model/store";

export const RegisterForm = () => {
  const registerUser = useSessionStore((state) => state.registerUser);

  const validateRegister = (data: any) => {
    const errors: Record<string, string> = {};

    if (!data.email.includes("@")) {
      errors.email = "Email должен содержать @";
    }
    if (!data.email.includes(".")) {
      errors.email = "Email должен содержать .";
    }
    if (!data.name.trim()) {
      errors.name = "Имя обязательно";
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
    { email: "", name: "", password: "" },
    registerUser,
    "Ошибка регистрации",
    validateRegister,
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Создать аккаунт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-600">{error}</div>}

        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInpChange}
          error={fieldErrors.email}
          placeholder="example@mail.com"
        />

        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInpChange}
          error={fieldErrors.name}
          placeholder="Любое имя"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInpChange}
          error={fieldErrors.password}
          placeholder="Минимум 8 символов"
        />

        <Button
          value={isLoading ? "Регистрация..." : "Зарегистрироваться"}
          type="submit"
        />
      </form>
    </div>
  );
};
