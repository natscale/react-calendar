import React from 'react';
import { CSSProps, MonthIndices } from '../../utils/types';
interface Props {
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
    onChangeViewingMonth: (month: MonthIndices) => unknown;
    layoutCalcs: CSSProps;
}
declare function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType, layoutCalcs }: Props): JSX.Element;
export declare const MonthSelector: React.MemoExoticComponent<typeof MonthSelectorComponent>;
export {};
