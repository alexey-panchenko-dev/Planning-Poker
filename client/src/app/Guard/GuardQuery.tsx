import { Loader } from "@/shared/ui/Loader";

interface GuardQueryProps {
  isLoading: boolean;
  children: React.ReactNode;
  error?: unknown;
}

export const GuardQuery = ({ isLoading, children, error }: GuardQueryProps) => {
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-danger">
        Произошла ошибка при загрузке данных
      </div>
    );
  }

  return <>{children}</>;
};
