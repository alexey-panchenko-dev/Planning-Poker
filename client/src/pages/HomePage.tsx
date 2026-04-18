import { Input, Button } from "@/shared";
import { Header } from "@/widgets/Header";

export const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00c38b] opacity-20 blur-[150px] rounded-full" />

      <Header />

      <main className="relative z-10 flex flex-col items-center text-center max-w-3xl px-4">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-[#00c38b]">IHP</span> - I Have a Plan
        </h1>

        <p className="text-xl text-gray-400 leading-relaxed mb-12">
          Повысьте качество планирования спринтов. <br />
          Премиальный инструмент для принятия решений в <br />
          атмосфере спокойствия и фокуса.
        </p>

        <div className="w-full max-w-md">
          <h2 className="text-2xl text-gray-300 mb-6">Найти сессию</h2>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Введите код"
                // Можно добавить кастомные стили для этого конкретного инпута,
                // если bg-gray-600 слишком светлый
              />
            </div>
            <Button value="Присоединиться" variant="primary" />
          </div>
        </div>
      </main>
    </div>
  );
};
