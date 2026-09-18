import React from 'react';
import { DeviceFrame } from './components/shell/DeviceFrame';
import { AppContainer } from './components/shell/AppContainer';

export const IPhoneView: React.FC = () => {
  return (
    <div className="relative w-full h-[100dvh] min-h-0 flex items-center justify-center">
      <DeviceFrame>
        <AppContainer />
      </DeviceFrame>
    </div>
  );
};

export default IPhoneView;
