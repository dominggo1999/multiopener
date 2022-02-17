import React from 'react';
import ReactSelect from 'react-select';
import { SelectWrapper } from './Select.style';
import { createOptions } from '../../../util';

const Select = ({
  value, handleChange, options: opt, labelKey, valueKey, name,
}) => {
  const options = createOptions(opt, labelKey, valueKey);
  const index = options.map((i) => i.value).indexOf(value);
  const defaultValue = options[index];

  return (
    <SelectWrapper>
      <ReactSelect
        isSearchable={false}
        name={name}
        onChange={handleChange}
        value={defaultValue}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
      />
    </SelectWrapper>
  );
};

export default Select;
