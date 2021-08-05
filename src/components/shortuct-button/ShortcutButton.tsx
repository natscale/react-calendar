import React, { memo } from 'react';

interface Props {
  buttonText: string;
  onButtonClick: () => void;
  onBlur: () => void;
}

const shortcut = {
  root: {
    padding: '0 0.5rem',
    minHeight: '28px',
  },
};

function ShortcutButtonComponent({ buttonText, onButtonClick, onBlur }: Props) {
  return (
    <button style={shortcut.root} onClick={onButtonClick} onBlur={onBlur}>
      {buttonText}
    </button>
  );
}

export const ShortcutButton = memo(ShortcutButtonComponent);
