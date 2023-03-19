import React from 'react';
import { CalendarWithShortcutProps, ShortcutButtonModel } from '../../utils/types';
interface Props extends Pick<CalendarWithShortcutProps, 'direction'> {
    shortcutButtons: Array<ShortcutButtonModel>;
    isDual: boolean;
}
export declare const SHORTCUT_SIZE = 130;
export declare function ShortcutBar({ shortcutButtons, direction, isDual }: Props): React.ReactElement<Props>;
export {};
