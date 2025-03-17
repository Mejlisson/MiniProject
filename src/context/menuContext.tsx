import React, { createContext, useState, ReactNode } from "react";

interface MenuContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(
  undefined,
);

export const MenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContext.Provider>
  );
};
