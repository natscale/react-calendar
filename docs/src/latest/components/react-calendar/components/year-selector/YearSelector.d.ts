import React from 'react';
import { CSSProps } from '../../calendar';
interface Props {
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => any;
    onChangeViewingYear: (year: number) => any;
    yearMatrixStart: number;
    yearMatrixEnd: number;
    layoutCalcs: CSSProps;
}
declare function YearSelectorComponent({ onChangeViewType, onChangeViewingYear, yearMatrixStart, layoutCalcs, }: Props): JSX.Element;
export declare const YearSelector: React.MemoExoticComponent<typeof YearSelectorComponent>;
export {};
