import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

const ReCAPTCHAComponent = ({ onChange }) => {
  return (
    <div className="mt-4">
      <ReCAPTCHA
        sitekey="6LfjKg8qAAAAAMlpSsrYmCFmkjmDFDFQpEIO9QCI"
        onChange={onChange}
      />
    </div>
  );
};

ReCAPTCHAComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ReCAPTCHAComponent;
