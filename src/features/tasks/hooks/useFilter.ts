import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilter } from '../store/tasksSlice';
import { selectFilter, selectFilteredTasks } from '../store/selectors';
import type { Priority } from '../types';

export const useFilter = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilter);
  const filteredTasks = useAppSelector(selectFilteredTasks);

  const handleSetFilter = useCallback((filter: Priority | 'All') => {
    dispatch(setFilter(filter));
  }, [dispatch]);

  return useMemo(() => ({
    currentFilter,
    filteredTasks,
    handleSetFilter,
  }), [currentFilter, filteredTasks, handleSetFilter]);
};
