import { useState, useEffect } from "react";

export const Loader = () => {
  const [isFirstState, setIsFirstState] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstState((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  //логика - я изменяю раз в секунду стейт который будет определять положение элементов в диве лоадера

  return (
    <div className="h-screen w-full flex justify-center items-cetner">
      <div className="flex flex-col justify-center items-cetner">
        <h1 className="animation-pulse">Загрузка</h1>

        <div className="flex justify-center items-center h-20 w-40 relative">
          <div
            className={`
          absolute h-6 w-6 bg-accent shadow-accent shadow-xl rounded-full 
          transition-transform duration-500 ease-in-out
          ${isFirstState ? "translate-x-10" : "-translate-x-10"}
        `}
          />
          <div
            className={`
          absolute h-6 w-6 bg-ghost shadow-ghost shadow-xl rounded-full 
          transition-transform duration-500 ease-in-out
          ${isFirstState ? "-translate-x-10" : "translate-x-10"}
        `}
          />
        </div>
      </div>
    </div>
  );
};
