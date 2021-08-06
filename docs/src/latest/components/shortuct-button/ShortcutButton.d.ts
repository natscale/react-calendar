import React from 'react';
interface Props {
    buttonText: string;
    onButtonClick: () => void;
    onBlur: () => void;
}
declare function ShortcutButtonComponent({ buttonText, onButtonClick, onBlur }: Props): JSX.Element;
export declare const ShortcutButton: React.MemoExoticComponent<typeof ShortcutButtonComponent>;
export {};
