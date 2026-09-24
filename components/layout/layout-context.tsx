"use client";
import React, { useState, useContext } from "react";

export interface GlobalSettings {
  header?: {
    nav?: Array<{ href?: string; label?: string }>;
  };
  footer?: {
    social?: Array<{ url?: string; icon?: Record<string, unknown> }>;
  };
  theme: {
    color: string;
    darkMode: string;
  };
}

interface LayoutState {
  globalSettings: GlobalSettings;
  setGlobalSettings: React.Dispatch<React.SetStateAction<GlobalSettings>>;
  pageData: Record<string, unknown>;
  setPageData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  theme: GlobalSettings["theme"];
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context) return context;

  const globalSettings: GlobalSettings = {
    theme: { color: "blue", darkMode: "default" },
  };

  return {
    globalSettings,
    setGlobalSettings: () => undefined,
    pageData: {},
    setPageData: () => undefined,
    theme: globalSettings.theme,
  } satisfies LayoutState;
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalSettings;
  pageData?: Record<string, unknown>;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
}) => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(
    initialGlobalSettings
  );
  const [pageData, setPageData] = useState<Record<string, unknown>>(
    initialPageData ?? {}
  );

  const theme = globalSettings.theme;

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        theme,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
