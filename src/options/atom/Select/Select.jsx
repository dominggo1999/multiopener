import React from 'react';
import { SelectWrapper } from './Select.style';

const Select = ({
  value, name, selectId, options, optionKey, title, handleChange,
}) => {
  return (
    <SelectWrapper>
      <select
        value={value}
        name={name}
        id={selectId}
        onChange={handleChange}
      >
        {
          options?.length > 0 && options.map((i) => {
            return (
              <option
                key={`theme-option${i[title]}`}
                value={i[optionKey]}
              >{i[title]}
              </option>
            );
          })
        }
      </select>
    </SelectWrapper>
  );
};

export default Select;
