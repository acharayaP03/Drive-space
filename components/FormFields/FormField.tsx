import React from 'react';
import { Path, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField as Field,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>; // Ensures the name matches one of the form fields
  fieldLabel: string;
  placeholderLabel: string;
};

export default function FormField<T extends FieldValues>({
  form,
  name,
  fieldLabel,
  placeholderLabel,
}: FormFieldProps<T>) {
  return (
    <Field
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="shad-form-item">
            <FormLabel className="shad-form-label">{fieldLabel}</FormLabel>

            <FormControl>
              <Input
                placeholder={placeholderLabel}
                className="shad-input"
                {...field}
              />
            </FormControl>
          </div>

          <FormMessage className="shad-form-message" />
        </FormItem>
      )}
    />
  );
}
