import React, { memo } from 'react';

interface Props {
  buttonText: string;
  onButtonClick: () => void;
}

const shortcut = {
  root: {
    padding: '7px 10px',
  },
};

function ShortcutButtonComponent({ buttonText, onButtonClick }: Props) {
  return (
    <button style={shortcut.root} className="rc_shortcut_button" onClick={onButtonClick}>
      {buttonText}
    </button>
  );
}

export const ShortcutButton = memo(ShortcutButtonComponent);
