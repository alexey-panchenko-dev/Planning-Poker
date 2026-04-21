import { LoginForm, RegisterForm } from "@/features/auth";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LoginPage = () => {
  const location = useLocation();
  const initialAuthType = location.state?.authType === "register" ? false : true;
  const [isLogin, setIsLogin] = useState(initialAuthType);

  useEffect(() => {
    if (location.state?.authType) {
      setIsLogin(location.state.authType === "login");
    }
  }, [location.state?.authType]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-bg p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-card-bg rounded-2xl shadow-2xl border border-white/5">
        <h1 className="text-2xl font-bold text-font-main mb-6 text-center">
          {isLogin ? "Вход в систему" : "Регистрация"}
        </h1>

        <div className="text-font-main">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-font-muted">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-accent hover:brightness-110 transition-all font-medium cursor-pointer"
            >
              {isLogin ? "Создать аккаунт" : "Войти в профиль"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
