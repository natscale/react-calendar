export interface ShortcutButtonModel {
    buttonText: string;
    viewTypes?: Array<string>;
    onButtonClick?: () => void;
    goToDate?: Date;
    onBlur?: () => void;
}
