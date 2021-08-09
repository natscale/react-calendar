import React from 'react';
import { ShortcutButtonModel } from './ShortcutButtonModel';
interface Props {
    viewType: string;
    shortcutButtons?: Array<ShortcutButtonModel>;
    updateView: (date: Date | undefined) => void;
}
declare function ShortcutBarComponent({ viewType, shortcutButtons, updateView }: Props): JSX.Element;
export declare const ShortcutBar: React.MemoExoticComponent<typeof ShortcutBarComponent>;
export {};
