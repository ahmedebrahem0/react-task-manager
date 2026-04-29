import type { FilterValue } from './types';

export const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'All', label: 'All' },
  { value: 'High', label: '🔴 High' },
  { value: 'Medium', label: '🟡 Medium' },
  { value: 'Low', label: '🟢 Low' },
];
