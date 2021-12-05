import {useState} from 'react';

export function useCheckboxFilter() {
  const [checkboxState, setCheckboxState] = useState({
    saved: localStorage.checkboxForSaved ? JSON.parse(localStorage.checkboxForSaved) : true,
    all: localStorage.checkbox ? JSON.parse(localStorage.checkbox) : true,
  });

  const handleCheckboxState = (savedMoviesPage) => {
    if (savedMoviesPage) {
      setCheckboxState({
        ...checkboxState,
        saved: !checkboxState.saved,
      });
      localStorage.setItem('checkboxForSaved', JSON.stringify(!checkboxState.saved));
    } else {
      setCheckboxState({
        ...checkboxState,
        all: !checkboxState.all,
      });
      localStorage.setItem('checkbox', JSON.stringify(!checkboxState.all));
    }
  }

  const featureFilms = (movies) => movies.length ? movies.filter(card => card.duration > 40) : [];

  return {checkboxState, handleCheckboxState, featureFilms};
}
