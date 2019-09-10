import React from 'react';

import { DynamicLoadingOutcomeIcon } from '../icons/DynamicIcons';
import { concatClassNames } from '../../utils/classNames';

const Form = ({ children, childrenBottom, onSubmit, submitOptions = {} }) => {
  const {
    submitText = 'Submit',
    submitClassName,
    submitIsReady = true,
    isSubmitting,
    submitWasSuccessful,
  } = submitOptions;

  return (
    <form className="container form" onSubmit={onSubmit}>
      {children}
      <div className="mt-5 mb-2">
        <button
          type="submit"
          className={concatClassNames('btn py-1 px-3', submitClassName)}
          disabled={!submitIsReady || isSubmitting}
        >
          {submitText}
          <DynamicLoadingOutcomeIcon
            isLoading={isSubmitting}
            isSuccessful={submitWasSuccessful}
          />
        </button>
        {childrenBottom}
      </div>
    </form>
  );
};

export default Form;
