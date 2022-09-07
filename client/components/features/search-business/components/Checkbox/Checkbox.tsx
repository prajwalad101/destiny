import { ISelectedFilters } from '@features/search-business/types';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface CheckboxProps {
  filterName: string;
  selectedFilters: ISelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<ISelectedFilters>>;
}

function Checkbox({
  filterName,
  selectedFilters,
  setSelectedFilters,
}: CheckboxProps) {
  const { features } = selectedFilters;

  // when checkbox is clicked
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id: filterName } = e.target;

    // on check
    if (checked && !features.includes(filterName)) {
      features.push(filterName);
      setSelectedFilters({ ...selectedFilters });
    }

    // on uncheck
    if (!checked) {
      const index = features.indexOf(filterName);
      if (index > -1) {
        // only remove if element is found
        features.splice(index, 1);
      }
      setSelectedFilters({ ...selectedFilters });
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        className="inp-cbx"
        id={filterName}
        style={{ display: 'none' }}
        onChange={(e) => handleChange(e)}
        checked={features.includes(filterName)}
      />
      <label className="cbx" htmlFor={filterName}>
        <span>
          <svg width="12px" height="10px" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>
        <span className="capitalize">{filterName}</span>
      </label>
    </div>
  );
}

export default Checkbox;