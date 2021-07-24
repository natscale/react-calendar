import React from 'react';
import { MonthIndices } from '../../types';
import { CSSProps } from '../../calendar';
interface Props {
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => any;
    onChangeViewingMonth: (month: MonthIndices) => any;
    layoutCalcs: CSSProps;
}
declare function MonthSelectorComponent({ onChangeViewingMonth, onChangeViewType, layoutCalcs }: Props): JSX.Element;
export declare const MonthSelector: React.MemoExoticComponent<typeof MonthSelectorComponent>;
export {};
