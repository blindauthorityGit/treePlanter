import { createContext, useState } from "react";

export const DataContext = createContext();

export function DazaProvider(props) {
    const [daza, setDaza] = useState({});

    return <DazaContext.Provider value={[data, setData]}>{props.children}</DazaContext.Provider>;
}
