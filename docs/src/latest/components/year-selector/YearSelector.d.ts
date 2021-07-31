import React from 'react';
interface Props {
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => unknown;
    onChangeViewingYear: (year: number) => unknown;
    yearMatrixStart: number;
    yearMatrixEnd: number;
}
declare function YearSelectorComponent({ onChangeViewType, onChangeViewingYear, yearMatrixStart }: Props): JSX.Element;
export declare const YearSelector: React.MemoExoticComponent<typeof YearSelectorComponent>;
export {};
