import React, { createContext, useState } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebarRight = () => {
        setIsOpen(!isOpen);
    };

    return <PaymentContext.Provider value={{ isOpen, toggleSidebarRight }}>{children}</PaymentContext.Provider>;
};
