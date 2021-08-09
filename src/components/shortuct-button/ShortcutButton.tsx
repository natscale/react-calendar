import React, { memo } from 'react';

interface Props {
  buttonText: string;
  onButtonClick: () => void;
}

const shortcut = {
  root: {
    padding: '0 0.5rem',
    minHeight: '28px',
  },
};

function ShortcutButtonComponent({ buttonText, onButtonClick }: Props) {
  return (
    <button style={shortcut.root} className="arc_shortcut_button" onClick={onButtonClick}>
      {buttonText}
    </button>
  );
}

export const ShortcutButton = memo(ShortcutButtonComponent);
