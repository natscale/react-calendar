import React from 'react';
import { HeaderProps } from '../../utils/types';
declare function HeaderComponent({ onClickPrev, onChangeViewType, onClickNext, viewType, monthInView: viewingMonth, yearInView: viewingYear, yearMatrixEnd, yearMatrixStart, }: HeaderProps): JSX.Element;
export declare const Header: React.MemoExoticComponent<typeof HeaderComponent>;
export {};
