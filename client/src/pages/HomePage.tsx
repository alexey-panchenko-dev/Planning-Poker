import { Input, Button } from "@/shared";
import {
  Users,
  Zap,
  ShieldCheck,
  MousePointerClick,
  MessageSquare,
  BarChart3,
} from "lucide-react";

export const HomePage = () => {
  const steps = [
    {
      id: 1,
      title: "Создайте комнату",
      description:
        "Авторизуйтесь и создайте новую сессию планирования за пару кликов.",
      icon: <Users className="text-accent" size={28} />,
    },
    {
      id: 2,
      title: "Пригласите команду",
      description: "Отправьте код или ссылку участникам. Доступ мгновенный.",
      icon: <MousePointerClick className="text-accent" size={28} />,
    },
    {
      id: 3,
      title: "Голосуйте в Real-time",
      description:
        "Выбирайте карты одновременно. Никто не видит чужие голоса до вскрытия.",
      icon: <Zap className="text-accent" size={28} />,
    },
    {
      id: 4,
      title: "Анализируйте итоги",
      description:
        "Система автоматически посчитает среднее и покажет разброс мнений.",
      icon: <BarChart3 className="text-accent" size={28} />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-main-bg text-font-main overflow-x-hidden flex flex-col items-center">
      <div className="fixed top-[200px] right-[300px] w-[300px] h-[300px] bg-accent opacity-10 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent opacity-20 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed top-[60%] left-[16%] w-[500px] h-[500px] bg-ghost opacity-10 blur-[150px] rounded-full pointer-events-none" />

      <section className="relative z-10 flex flex-col items-center text-center max-w-3xl px-4 min-h-screen justify-center">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-accent">IHP</span> - I Have a Plan
        </h1>

        <p className="text-xl text-font-main leading-relaxed mb-12 italic opacity-90">
          Повысьте качество планирования спринтов <br />
          Премиальный инструмент для принятия решений в <br />
          атмосфере спокойствия и фокуса
        </p>

        <div className="w-full max-w-md bg-card-bg/30 p-8 rounded-[32px] border border-font-muted/10 backdrop-blur-sm">
          <h2 className="text-2xl font-medium mb-6">Найти сессию</h2>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input placeholder="Введите код" variant="default2" />
            </div>
            <Button value="Присоединиться" />
          </div>
        </div>

        <div className="absolute bottom-10 animate-bounce opacity-20">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-font-main" />
        </div>
      </section>

      <section className="relative z-10 w-full max-w-6xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Как это работает?</h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group p-8 rounded-3xl bg-card-bg border border-font-muted/5 hover:border-accent/40 transition-all duration-300 hover:translate-y-[-8px] shadow-2xl"
            >
              <div className="mb-6 p-4 w-fit rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-font-main">
                {step.title}
              </h3>
              <p className="text-font-muted leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 w-full max-w-6xl px-6 py-24 mb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center bg-card-bg/20 p-12 rounded-[40px] border border-font-muted/5">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Почему именно <span className="text-accent">IHP</span>?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="mt-1 bg-accent/20 p-2 h-fit rounded-lg">
                  <ShieldCheck size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-font-main">
                    Конфиденциальность корпоративного уровня
                  </h4>
                  <p className="text-font-muted mt-1">
                    Ваши сессии защищены. Мы не передаем данные третьим лицам и
                    используем сквозное шифрование для активных комнат.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="mt-1 bg-accent/20 p-2 h-fit rounded-lg">
                  <MessageSquare size={22} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-font-main">
                    Умная синхронизация
                  </h4>
                  <p className="text-font-muted mt-1">
                    Минимальная задержка благодаря WebSocket. Голосуйте и
                    обсуждайте задачи без лагов и рассинхрона.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="aspect-[4/3] rounded-3xl bg-main-bg border border-font-muted/20 overflow-hidden shadow-inner flex flex-col p-4">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-danger/40" />
                <div className="w-3 h-3 rounded-full bg-ghost/40" />
                <div className="w-3 h-3 rounded-full bg-accent/40" />
              </div>
              <div className="flex-1 flex flex-col gap-3 justify-center items-center opacity-40">
                <div className="w-3/4 h-4 bg-card-bg rounded-full" />
                <div className="w-1/2 h-4 bg-card-bg rounded-full" />
                <div className="grid grid-cols-3 gap-2 w-full mt-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-accent/10 rounded-xl border border-accent/20"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent opacity-5 blur-[100px]" />
          </div>
        </div>
      </section>
    </div>
  );
};
