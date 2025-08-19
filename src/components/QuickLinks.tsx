import React from 'react';
import { Theme } from '../types';

interface Props {
  theme: Theme;
}

const QuickLinks: React.FC<Props> = ({ theme }) => {
  return (
    <div>
      <h2 style={{ color: theme.secondaryColor }}>QuickLinks</h2>
      {/* TODO: 実装 */}
    </div>
  );
};

export default QuickLinks;
