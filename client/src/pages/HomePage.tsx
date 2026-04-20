import { Input, Button } from "@/shared";

export const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-[200px] right-[300px] w-[300px] h-[300px] bg-accent opacity-10 blur-[150px] rounded-full" />
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent opacity-20 blur-[150px] rounded-full" />
      <div className="absolute top-[60%] left-[16%] w-[500px] h-[500px] bg-ghost opacity-10 blur-[150px] rounded-full" />

      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl px-4">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-accent">IHP</span> - I Have a Plan
        </h1>

        <p className="text-xl text-font-main leading-relaxed mb-12">
          Повысьте качество планирования спринтов <br />
          Премиальный инструмент для принятия решений в <br />
          атмосфере спокойствия и фокуса
        </p>

        <div className="w-full max-w-md">
          <h2 className="text-2xl text-font-main mb-6">Найти сессию</h2>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="Введите код" variant="default2" />
            </div>
            <Button value="Присоединиться" />
          </div>
        </div>
      </main>
    </div>
  );
};
