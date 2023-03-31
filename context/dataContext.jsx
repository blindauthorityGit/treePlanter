import { createContext, useState } from "react";
import Data from "../components/map/data";
import DataSki from "../components/map/data/dataSki";
export const DataContext = createContext();

export function DataProvider(props) {
    const ski = true;
    const [data, setData] = useState(ski ? DataSki : Data);

    return <DataContext.Provider value={[data, setData]}>{props.children}</DataContext.Provider>;
}
