import { Input, InputI } from "./Input";
import { Button } from "./Button";

interface FormProps {
  formName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  fields: InputI[];
  btnValue: string;
}

export const Form = ({
  formName,
  onChange,
  onSubmit,
  fields,
  btnValue,
}: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 bg-card-bg border border-white/5 rounded-2xl shadow-xl space-y-6"
    >
      <h1 className="text-xl font-bold text-font-main tracking-tight">
        {formName}
      </h1>

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <Input
            key={field.name} // Добавили ключ!
            onChange={onChange}
            name={field.name}
            value={field.value}
            placeholder={field.placeholder}
            // Можно добавить пропс className в Input для гибкости
          />
        ))}
      </div>

      <Button
        type="submit"
        value={btnValue}
        className="w-full justify-center py-3 bg-accent text-main-bg font-bold rounded-xl hover:scale-[1.02] transition-transform"
      />
    </form>
  );
};
