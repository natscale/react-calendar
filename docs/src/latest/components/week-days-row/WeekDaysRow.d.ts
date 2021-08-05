import React from 'react';
import { WeekdayIndices } from '../../utils/types';
export interface Props {
    weekStartIndex: WeekdayIndices;
    weekendIndices: WeekdayIndices[];
}
declare function WeekDaysRowComponent({ weekStartIndex, weekendIndices }: Props): JSX.Element;
export declare const WeekDaysRow: React.MemoExoticComponent<typeof WeekDaysRowComponent>;
export {};
