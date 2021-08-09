import React from 'react';
interface Props {
    buttonText: string;
    onButtonClick: () => void;
}
declare function ShortcutButtonComponent({ buttonText, onButtonClick }: Props): JSX.Element;
export declare const ShortcutButton: React.MemoExoticComponent<typeof ShortcutButtonComponent>;
export {};
