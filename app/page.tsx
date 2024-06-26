'use client';

import { useState } from 'react';

// Types
import { TextState } from '@/types/controls/text';

// Contexts
import { FormProvider } from '@/contexts/FormProvider';

// Components
import { Select } from '@/index';

const Page = () => {
  const [validate, setValidate] = useState<boolean>(false);

  const [state, setState] = useState<TextState>({
    value: '',
    isValid: false,
  });

  const processForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidate(true);
  };

  return (
    <FormProvider>
      <form onSubmit={processForm}>
        <Select
          options={[]}
          label={'Foo'}
          state={state}
          helpMessage={'Bar'}
          onChange={setState}
          validate={validate}
          validationRules={{ required: true }}
        />
      </form>
    </FormProvider>
  );
};

export default Page;
