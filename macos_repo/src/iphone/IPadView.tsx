import React from 'react';
import { IPadFrame } from './components/ipad/IPadFrame';
import { AppContainer } from './components/shell/AppContainer';

export const IPadView: React.FC = () => {
  return (
    <div className="h-[100dvh] min-h-0 w-full">
      <IPadFrame>
      <AppContainer />
      </IPadFrame>
    </div>
  );
};
