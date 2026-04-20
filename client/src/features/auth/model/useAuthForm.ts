import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthForm = <T extends object>(
  initialState: T,
  submitAction: (data: T) => Promise<void>,
  errorPrefix: string,
  validate?: (data: T) => Record<string, string>,
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<T>(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (validate) {
      const errors = validate(formData);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
    }

    setIsLoading(true);
    try {
      await submitAction(formData);

      const state = location.state as { from?: { pathname: string } };
      const targetPath = state?.from?.pathname || "/";

      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(errorPrefix);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  return {
    formData,
    error,
    fieldErrors,
    isLoading,
    handleSubmit,
    handleInpChange,
  };
};
