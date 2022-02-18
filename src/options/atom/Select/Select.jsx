import React from 'react';
import ReactSelect from 'react-select';
import { SingleSelectWrapper, MultiSelectWrapper } from './Select.style';
import { createOptions } from '../../../util';

const Select = ({
  value,
  handleChange,
  options: opt,
  labelKey,
  valueKey,
  name,
  isMulti,
  isSearchable,
  ...rest
}) => {
  const options = createOptions(opt, labelKey, valueKey);
  const getValue = () => {
    if(!value) return null;

    if(!isMulti) {
      const index = options.map((i) => i.value).indexOf(value);
      return options[index];
    }

    return value;
  };

  const val = getValue();

  const SelectWrapper = isMulti ? MultiSelectWrapper : SingleSelectWrapper;

  return (
    <SelectWrapper isMulti>
      <ReactSelect
        isSearchable={isSearchable}
        name={name}
        onChange={handleChange}
        value={val}
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        isMulti={isMulti}
      />
    </SelectWrapper>
  );
};

export default Select;
