import { isEmpty, isNumeric as validateIsNumeric } from 'validator';

// Types
import { ValidationMessages } from '@/types/contexts/forms';
import { TextProps, TextValidationRules } from '@/types/controls/text';

// Services
import { manipulateContent } from '@/services/utils/resource';

type ValidateRequest = {
  value: string;
  validationMessages: ValidationMessages;
  ruleSet: TextValidationRules | undefined;
};

export const validate = ({
  value,
  ruleSet,
  validationMessages,
}: ValidateRequest): string | undefined => {
  if (!ruleSet) {
    return undefined;
  }

  const isValueEmpty = isEmpty(value);

  const { required, maxLength, minLength, regex, isNumeric } = ruleSet;

  if (required && isValueEmpty) {
    return validationMessages.isRequired;
  }

  if (isNumeric && !isValueEmpty && !validateIsNumeric(value)) {
    return validationMessages.textNotNumeric;
  }

  if (maxLength && value.length > maxLength) {
    return manipulateContent({
      content: validationMessages.textMaximumLength,
      replacements: { '{{maxLength}}': maxLength.toString() },
    });
  }

  if (!isValueEmpty && minLength !== undefined && value.length < minLength) {
    return manipulateContent({
      content: validationMessages.textMinimumLength,
      replacements: { '{{minLength}}': minLength.toString() },
    });
  }

  if (regex && !isEmpty(value) && !regex.pattern.test(value)) {
    return regex.validationMessage;
  }

  return undefined;
};