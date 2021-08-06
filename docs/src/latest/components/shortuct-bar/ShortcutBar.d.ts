import React from 'react';
import { ShortcutButtonModel } from './ShortcutButtonModel';
interface Props {
    viewType: string;
    barSize: number;
    shortcutButtons?: Array<ShortcutButtonModel>;
    updateView: (date: Date | undefined) => void;
    onBlurDefault: () => void;
}
declare function ShortcutBarComponent({ viewType, barSize, shortcutButtons, updateView, onBlurDefault }: Props): JSX.Element;
export declare const ShortcutBar: React.MemoExoticComponent<typeof ShortcutBarComponent>;
export {};
