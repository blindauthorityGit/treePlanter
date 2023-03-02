import React from "react";

const TreeSum = () => {
    return (
        <div className="absolute top-4 left-4">
            <div className="baeume">{`Gepflanzte Bäume: ${props.plantedTrees} / ${props.sumTrees}`}</div>
        </div>
    );
};

export default TreeSum;
