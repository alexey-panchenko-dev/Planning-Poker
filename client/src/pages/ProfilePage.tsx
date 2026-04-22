import { ProfileHeader } from "@/widgets/Profile/ProfileHeader";

export const ProfilePage = () => {
  return (
    <div className="relative min-h-screen bg-main-bg pt-28 pb-10 px-6 md:px-16 overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[300px] h-[300px] bg-ghost opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

      <main className="relative z-10 max-w-[1440px] mx-auto">
        <ProfileHeader />
      </main>
    </div>
  );
};
