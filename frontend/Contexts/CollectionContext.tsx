import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CollectionContextType {
  collectionAddress: string;
  setCollectionAddress: (address: string) => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collectionAddress, setCollectionAddress] = useState<string>('');

  return (
    <CollectionContext.Provider value={{ collectionAddress, setCollectionAddress }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};