'use client';

import WorkspaceModal from './workspace/WorkspaceModal';
import AuthModals from './AuthModals';

const ModalsProvider = () => {
  return (
    <>
      <AuthModals />
      <WorkspaceModal />
    </>
  );
};

export default ModalsProvider;
