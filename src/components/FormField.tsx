import { memo } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from './ui/utils';
import { AlertCircle, Check } from 'lucide-react';

type FieldType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio';

interface FormFieldProps {
  type: FieldType;
  name: string;
  label: string;
  value: any;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: Array<{ label: string; value: string }>;
  rows?: number;
  onChange: (value: any) => void;
  onBlur?: () => void;
  className?: string;
  description?: string;
  validation?: 'success' | 'error' | 'warning';
}

export const FormField = memo(function FormField({
  type,
  name,
  label,
  value,
  error,
  required = false,
  placeholder,
  disabled = false,
  options = [],
  rows = 3,
  onChange,
  onBlur,
  className,
  description,
  validation
}: FormFieldProps) {
  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const descriptionId = `${fieldId}-description`;
  
  const getValidationIcon = () => {
    switch (validation) {
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const renderField = () => {
    const commonProps = {
      id: fieldId,
      name,
      disabled,
      'aria-invalid': !!error,
      'aria-describedby': cn(
        description && descriptionId,
        error && errorId
      ).trim() || undefined
    };

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            className={cn(
              error && 'border-destructive focus-visible:ring-destructive',
              validation === 'success' && 'border-green-500 focus-visible:ring-green-500'
            )}
          />
        );

      case 'select':
        return (
          <Select
            value={value || ''}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger
              {...commonProps}
              className={cn(
                error && 'border-destructive focus:ring-destructive',
                validation === 'success' && 'border-green-500 focus:ring-green-500'
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              {...commonProps}
              checked={value || false}
              onCheckedChange={onChange}
            />
            <Label 
              htmlFor={fieldId}
              className={cn(
                "text-sm font-normal cursor-pointer",
                disabled && "cursor-not-allowed opacity-70"
              )}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={onChange}
            disabled={disabled}
            className="space-y-2"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${fieldId}-${option.value}`}
                />
                <Label 
                  htmlFor={`${fieldId}-${option.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return (
          <div className="relative">
            <Input
              {...commonProps}
              type={type}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              placeholder={placeholder}
              className={cn(
                error && 'border-destructive focus-visible:ring-destructive pr-10',
                validation === 'success' && 'border-green-500 focus-visible:ring-green-500 pr-10'
              )}
            />
            {(validation === 'success' || validation === 'error' || validation === 'warning') && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getValidationIcon()}
              </div>
            )}
          </div>
        );
    }
  };

  // For checkbox, we render differently since the label is inline
  if (type === 'checkbox') {
    return (
      <div className={cn('space-y-2', className)}>
        {renderField()}
        {description && (
          <p id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label 
        htmlFor={fieldId}
        className={cn(
          "text-sm font-medium",
          disabled && "opacity-70"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      {renderField()}
      
      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
});