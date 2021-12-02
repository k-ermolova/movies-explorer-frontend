import {useState} from 'react';

export function useCheckboxFilter() {
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxState = () => {
    setIsChecked(!isChecked);
  }

  const featureFilms = (movies) => movies.length ? movies.filter(card => card.duration > 40) : [];

  return {isChecked, handleCheckboxState, featureFilms};
}
