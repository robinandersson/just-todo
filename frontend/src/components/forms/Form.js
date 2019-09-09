import React from 'react';

import { DynamicLoadingOutcomeIcon } from '../DynamicIcons';

const Form = ({
  children,
  onSubmit,
  submitText = 'Submit',
  submitIsReady = true,
  isSubmitting,
  submitSuccessful,
}) => {
  return (
    <form className="container form" onSubmit={onSubmit}>
      {children}
      <div className="mt-5 mb-2 flex items-center">
        <button
          type="submit"
          className="btn mode--positive py-1 px-3"
          disabled={!submitIsReady || isSubmitting}
        >
          {submitText}
          <DynamicLoadingOutcomeIcon
            isLoading={isSubmitting}
            isSuccessful={submitSuccessful}
          />
        </button>
      </div>
    </form>
  );
};

export default Form;
