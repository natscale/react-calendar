import React from 'react';
import { WeekdayIndices } from '../../utils/types';
interface Props {
    weekStartIndex: WeekdayIndices;
    weekendIndices: WeekdayIndices[];
}
declare function WeekDaysRowComponent({ weekStartIndex, weekendIndices }: Props): JSX.Element;
export declare const WeekDaysRow: React.MemoExoticComponent<typeof WeekDaysRowComponent>;
export {};
