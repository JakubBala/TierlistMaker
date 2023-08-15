const RankingGrid = ({ items, imgArr, drag, allowDrop, drop}) => {

    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];

    const labels = ["S", "A", "B", "C"];
    var collections = [cellCollectionTop, cellCollectionMiddle, cellCollectionBottom, cellCollectionWorst];

    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        if (rankNum > 0) {
            var item = items.find(o => o.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} className="rank-cell" onDrop={drop} onDragOver={allowDrop}>
                {(item != null)
                    ? <img id={`item-${item.id}`} src={imgArr.find(o => o.id === item.imageId)?.image} draggable="true" onDragStart={drag} alt="img"/>
                    : null}
            </div>)
        }
        else {
            cellCollection.push(<div id={`rank-${rankNum}`} className="rank-label">
                <h4>{rowLabel}</h4>
            </div>)
        }
    }

    function createCellsForRow(rowNum) {
        var rankNum = 0; //overall rank out of max 16 (top left = 1, bottom right = 16)
        var currCollection = [];
        var label = "";
        const numCells = 5;

        for (var a = 1; a <= numCells; a++) {
            rankNum = (a === 1) ? 0 : ((numCells - 1) * (rowNum - 1)) + a -1;
            label = labels[rowNum - 1];
            currCollection = collections[rowNum - 1];

            pushCellMarkupToArr(currCollection, rankNum, label);
        }
    }

    function createCellsForRows() {
        const maxRows = 4;
        for (var row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }

    function createRowsForGrid() {
        rankingGrid.push(<div id="row-1" className="rank-row top-tier">{cellCollectionTop}</div>)
        rankingGrid.push(<div id="row-2" className="rank-row middle-tier">{cellCollectionMiddle}</div>)
        rankingGrid.push(<div id="row-3" className="rank-row bottom-tier">{cellCollectionBottom}</div>)
        rankingGrid.push(<div id="row-4" className="rank-row worst-tier">{cellCollectionWorst}</div>)

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