import React from 'react';
import { MonthIndices } from '../../utils/types';
interface Props {
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
    onChangeViewingMonth: (month: MonthIndices) => unknown;
}
declare function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType }: Props): JSX.Element;
export declare const MonthSelector: React.MemoExoticComponent<typeof MonthSelectorComponent>;
export {};
