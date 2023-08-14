const RankingGrid = ({ items, imgArr }) => {

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
            cellCollection.push(<div id={`rank-${rankNum}`} className="rank-cell"></div>)
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
            rankNum = (a === 1) ? 0 : ((numCells - 1) * (rowNum - 1)) + a;
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
        rankingGrid.push(<div className="rank-row top-tier">{cellCollectionTop}</div>)
        rankingGrid.push(<div className="rank-row middle-tier">{cellCollectionMiddle}</div>)
        rankingGrid.push(<div className="rank-row bottom-tier">{cellCollectionBottom}</div>)
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>)

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