export const validators = {
  email: (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  },

  password: (value: string): string | undefined => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(value)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[@$!%*?&])/.test(value)) {
      return 'Password must contain at least one special character (@$!%*?&)';
    }
    return undefined;
  },

  phone: (value: string): string | undefined => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return undefined;
  },

  url: (value: string): string | undefined => {
    try {
      new URL(value);
      return undefined;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  required: (value: any): string | undefined => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return undefined;
  },

  minLength: (min: number) => (value: string): string | undefined => {
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return undefined;
  },

  maxLength: (max: number) => (value: string): string | undefined => {
    if (value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return undefined;
  },

  confirmPassword: (originalPassword: string) => (value: string): string | undefined => {
    if (value !== originalPassword) {
      return 'Passwords do not match';
    }
    return undefined;
  }
};

export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function validateForm<T extends Record<string, any>>(
  values: T,
  validationRules: Record<keyof T, ((value: any) => string | undefined)[]>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
  const errors: Partial<Record<keyof T, string>> = {};
  
  Object.keys(validationRules).forEach(key => {
    const rules = validationRules[key as keyof T];
    const value = values[key as keyof T];
    
    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[key as keyof T] = error;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}