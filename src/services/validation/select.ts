import { isEmpty } from 'validator';

// Types
import { ValidationMessages } from '@/types/contexts/forms';
import { SelectValidationRules } from '@/types/controls/select';

type ValidateSelect = {
  value: string;
  ruleSet?: SelectValidationRules;
  validationMessages: ValidationMessages;
};

export const validate = ({
  value,
  ruleSet,
  validationMessages,
}: ValidateSelect): string | undefined => {
  if (!ruleSet) {
    return undefined;
  }

  const { required } = ruleSet;

  if (required && isEmpty(value)) {
    return validationMessages.isRequired;
  }

  return undefined;
};
