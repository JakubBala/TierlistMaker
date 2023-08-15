import Item from './Item.js'

const RankingGrid = ({ items, imgArr, drag, allowDrop, drop }) => {

    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];

    const labels = ["S", "A", "B", "C"];
    var collections = [cellCollectionTop, cellCollectionMiddle, cellCollectionBottom, cellCollectionWorst];

    function pushCellMarkupToArr(item, cellCollection, rowNum) {

        cellCollection.push(<div key={ `itemrank-${rowNum}-${item.ranking}`} id={`rank-${rowNum}-${item.ranking}`} className="rank-cell">
            <Item item={item} drag={drag} itemImgObj={imgArr.find(o => o.id === item.imageId)} />
        </div>)
    }

    function createCellsForRow(rowNum) {
        const cellsInThisRow = items
            .filter((item) => item.rowNum === rowNum)
            .sort((a, b) => a.ranking - b.ranking); // Sort by ranking

        var currCollection = collections[rowNum - 1];

        //go through every item that has this row number
        cellsInThisRow.forEach((item) => {
            pushCellMarkupToArr(item, currCollection, rowNum);
        });
    }
    function createLabelForRow(rowNum) {
        //create row label
        var label = labels[rowNum - 1];

        return (
            <div className="rank-label">
                <h4>{label}</h4>
            </div>)
    }

    function createCellsForRows() {
        const maxRows = 4;
        for (var row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }

    function createRowsForGrid() {
        rankingGrid.push(<div key="row-1" id="row-1" className="rank-row top-tier" onDrop={drop} onDragOver={allowDrop}>
            {createLabelForRow(1)}<div className="drop-area">{cellCollectionTop}</div></div>)
        rankingGrid.push(<div key="row-2" id="row-2" className="rank-row middle-tier" onDrop={drop} onDragOver={allowDrop}>
            {createLabelForRow(2)}<div className="drop-area">{cellCollectionMiddle}</div></div>)
        rankingGrid.push(<div key="row-3" id="row-3" className="rank-row bottom-tier" onDrop={drop} onDragOver={allowDrop}>
            {createLabelForRow(3)}<div className="drop-area">{cellCollectionBottom}</div></div>)
        rankingGrid.push(<div key="row-4" id="row-4" className="rank-row worst-tier" onDrop={drop} onDragOver={allowDrop}>
            {createLabelForRow(4)}<div className="drop-area">{cellCollectionWorst}</div></div>)

        return rankingGrid;
    }

    function createRankingGrid() {
        createCellsForRows();
        return createRowsForGrid();
    }

    return (
        <div className="rankings">
            {createRankingGrid()}
        </div>
    )
}
export default RankingGrid;