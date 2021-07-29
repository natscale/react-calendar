import React from 'react';
import { CSSProps, WeekdayIndices } from '../../types';
interface Props {
  weekStartIndex: WeekdayIndices;
  weekendIndices: WeekdayIndices[];
  layoutCalcs: CSSProps;
}
declare function WeekDaysRowComponent({ weekStartIndex, weekendIndices, layoutCalcs }: Props): JSX.Element;
export declare const WeekDaysRow: React.MemoExoticComponent<typeof WeekDaysRowComponent>;
export {};
