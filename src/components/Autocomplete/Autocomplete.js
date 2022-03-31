import { useState, useRef } from 'react'
import { Link } from 'react-router-dom';

import { ChevronDown } from '../ChevronDown/ChevronDown';
import './Autocomplete.css';

/**
 * <Autocomplete onChange={() => {}} onChangeDelay={100}>
 *  <AutocompleteItem></AutocompleteItem>
 * </Autocomplete>
 */

export function Autocomplete(props) {
  const {
    onChange = () => {},
    onChangeDelay = 1000,
  } = props;
  const [value, setValue] = useState('');
  const [hidden, setHidden] = useState(true);
  const timeoutRef = useRef(null);

  const classNamesForHints = [
    "autocomplete__hints",
    hidden ? 'autocomplete__hints--hidden' : ''
  ].join(' ');

  const handleInput = event => {
    setValue(event.target.value);

    if ( timeoutRef.current ) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (onChange) {
        onChange(event.target.value);
      }
    }, onChangeDelay);
  };

  const handleFocus = () => {
    setHidden(false);
  };

  const handleMouseLeave = () => {
    setHidden(true);
  }

  return (
    <div className="autocomplete" onMouseLeave={handleMouseLeave}>
      <div className="autocomplete__control">
        <label htmlFor="search">Search by City Name</label>
        <input
          id="search"
          type="text"
          value={value}
          onInput={handleInput}
          onFocus={handleFocus}
        />
        <i><ChevronDown /></i>
      </div>
      <ul className={classNamesForHints}>
        {props.children}
      </ul>
    </div>
  )
}