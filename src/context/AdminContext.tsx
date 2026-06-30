import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminSettings {
  generalEnabled: boolean;
  headerEnabled: boolean;
  footerEnabled: boolean;
  footerTitle: string;
}

interface AdminContextType {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
}

const defaultSettings: AdminSettings = {
  generalEnabled: true,
  headerEnabled: true,
  footerEnabled: true,
  footerTitle: 'Ficou com alguma dúvida? Nossa equipe está pronta para te atender.',
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <AdminContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
