const GridRow = ({ cellCollection, labels, rowNum, rowName, drop, allowDrop }) => {

    function createLabelForRow(rowNum) {
        //create row label
        var label = labels[rowNum - 1];

        return (
            <div className="rank-label">
                <h4>{label}</h4>
            </div>)
    }

    return (
        <div id={`row-${rowNum}`} className={`rank-row ${rowName}`} onDrop={drop} onDragOver={allowDrop}>
            {createLabelForRow(rowNum)}<div className="drop-area">{cellCollection}</div></div>
    )
}

export default GridRow;
