import { LoginForm, RegisterForm } from "@/features/auth";
import { useState } from "react";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl ">
        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-5 text-center">
          <p className="text-gray-400">
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-400"
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
