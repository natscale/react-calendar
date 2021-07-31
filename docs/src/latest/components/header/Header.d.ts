import React from 'react';
import { MonthIndices } from '../../utils/types';
interface Props {
    onClickPrev: () => any;
    onClickNext: () => any;
    onChangeViewType: (view: 'month_dates' | 'months' | 'years') => any;
    viewType: 'month_dates' | 'months' | 'years';
    viewingMonth: MonthIndices;
    viewingYear: number;
    yearMatrixStart: number;
    yearMatrixEnd: number;
}
declare function HeaderComponent({ onClickPrev, onChangeViewType, onClickNext, viewType, viewingMonth, viewingYear, yearMatrixEnd, yearMatrixStart, }: Props): JSX.Element;
export declare const Header: React.MemoExoticComponent<typeof HeaderComponent>;
export {};
