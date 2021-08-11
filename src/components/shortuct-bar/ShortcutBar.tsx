import React, { memo } from 'react';
import { ShortcutButton } from '../shortuct-button/ShortcutButton';
import { ShortcutButtonModel } from './ShortcutButtonModel';

interface Props {
  viewType: string;
  shortcutButtons?: Array<ShortcutButtonModel>;
  updateView: (date: Date | undefined) => void;
}

const getShortcutStyles = () => ({
  root: {
    display: 'flex',
    padding: '2%',
    gap: '1rem',
    alignItems: 'center',
    flexDirection: 'column' as const,
    overflow: 'auto',
    width: '120px',
  },
});

function ShortcutBarComponent({ viewType, shortcutButtons, updateView }: Props) {
  const shortcut = getShortcutStyles();
  const onButtonClick = (btn: ShortcutButtonModel) => {
    btn.goToDate ? updateView(btn.goToDate) : btn.onButtonClick ? btn.onButtonClick() : () => 0;
  };

  return (
    <div style={shortcut.root} className={'rc_shortcuts_view'}>
      {shortcutButtons &&
        shortcutButtons.map((btn: ShortcutButtonModel, index: number) => {
          {
            if (!btn.viewTypes || btn.viewTypes.find((type) => type === viewType)) {
              return (
                <ShortcutButton key={index} buttonText={btn.buttonText} onButtonClick={() => onButtonClick(btn)} />
              );
            }
          }
        })}
    </div>
  );
}

export const ShortcutBar = memo(ShortcutBarComponent);
