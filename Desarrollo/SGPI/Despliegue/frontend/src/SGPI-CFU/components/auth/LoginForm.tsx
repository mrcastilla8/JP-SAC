'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/SGPI-CFU/lib/hooks/useAuth';
import { validateLoginForm, isFormValid, type FormValidationResult, type LoginFields } from '@/SGPI-CFU/lib/utils/validators';
import { Input, Button } from '@/SGPI-CFU/components/ui';

export function LoginForm() {
  const router = useRouter();
  const { login, failedAttempts, lockedUntil } = useAuth();

  const [email, setEmail] = useState('admin@unmsm.edu.pe');
  const [password, setPassword] = useState('Admin@1234');
  
  const [formErrors, setFormErrors] = useState<FormValidationResult<LoginFields>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    // Validar antes de llamar al backend
    const errors = validateLoginForm({ email, password });
    setFormErrors(errors);

    if (!isFormValid(errors)) {
      return;
    }

    setIsLoading(true);
    
    try {
      await login({ email, password });
      // Redirección directa y forzada a SGPI-CFB
      router.replace('/SGPI-CFB');
    } catch (error: any) {
      setApiError(error.message || 'Error al iniciar sesión. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = lockedUntil !== null && lockedUntil > Date.now();

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg border border-slate-100">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">Iniciar Sesión</h1>
        <p className="text-slate-500">
          Ingrese sus credenciales para acceder al sistema
        </p>
      </div>

      {apiError && (
        <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3 animate-in fade-in zoom-in-95">
          <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-800">
              {apiError}
            </p>
            {isLocked && (
              <p className="text-xs text-red-600 mt-1">
                La cuenta ha sido bloqueada temporalmente por seguridad debido a múltiples intentos fallidos.
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <Input
            id="email"
            type="email"
            placeholder="ejemplo@unmsm.edu.pe"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={formErrors.email}
            disabled={isLoading || isLocked}
            label="Correo Institucional"
            className="w-full"
          />
        </div>

        <div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
            disabled={isLoading || isLocked}
            label="Contraseña"
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-4 font-bold"
          disabled={isLoading || isLocked}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </form>
    </div>
  );
}
