import { createContext, useState } from "react";
import Data from "../components/map/data";
export const DataContext = createContext();

export function DataProvider(props) {
    const [data, setData] = useState(Data);

    return <DataContext.Provider value={[data, setData]}>{props.children}</DataContext.Provider>;
}
