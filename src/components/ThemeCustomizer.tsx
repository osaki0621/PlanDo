import React from 'react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeCustomizer: React.FC<Props> = ({ theme, onThemeChange }) => {
  return (
    <div>
      <h2 style={{ color: theme.primaryColor }}>ThemeCustomizer</h2>
      {/* TODO: 実装 */}
    </div>
  );
};

export default ThemeCustomizer;
