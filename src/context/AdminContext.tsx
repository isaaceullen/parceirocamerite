import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminSettings {
  globalEnabled: boolean;
  headerEnabled: boolean;
  footerEnabled: boolean;
  footerTitle: string;
}

interface AdminContextType {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
}

const defaultSettings: AdminSettings = {
  globalEnabled: true,
  headerEnabled: true,
  footerEnabled: true,
  footerTitle: "Ficou com alguma dúvida? Nossa equipe está pronta para te atender.",
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('adminSettings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('adminSettings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AdminContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
