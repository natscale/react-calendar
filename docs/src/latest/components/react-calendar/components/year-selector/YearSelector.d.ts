import React from 'react';
import { CSSProps } from '../../types';
interface Props {
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
    onChangeViewingYear: (year: number) => unknown;
    yearMatrixStart: number;
    yearMatrixEnd: number;
    layoutCalcs: CSSProps;
}
declare function YearSelectorComponent({ onChangeViewType, onChangeViewingYear, yearMatrixStart, layoutCalcs }: Props): JSX.Element;
export declare const YearSelector: React.MemoExoticComponent<typeof YearSelectorComponent>;
export {};
