import React from 'react';
import PropTypes from 'prop-types';

class SelectBox extends React.Component {
  render() {
    const { id, name, required, onChange, options, label, className } = this.props;

    return (
      <div className="mb-4">
        {label && <label htmlFor={id} className="block text-gray-700">{label}</label>}
        <select
          id={id}
          name={name}
          required={required}
          onChange={onChange}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md ${className}`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    );
  }
}

SelectBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

SelectBox.defaultProps = {
  required: false,
  onChange: () => {},
  label: '',
  className: '',
};

export default SelectBox;
