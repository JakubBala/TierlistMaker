import Item from './Item.jsx';
import GridRow from './GridRow.jsx';

const RankingGrid = ({ items, imgArr, drag, allowDrop, drop }) => {

    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];

    const labels = ["S", "A", "B", "C"];
    var collections = [cellCollectionTop, cellCollectionMiddle, cellCollectionBottom, cellCollectionWorst];

    function pushCellMarkupToArr(item, cellCollection, rowNum) {

        cellCollection.push(<div key={`itemrank-${rowNum}-${item.ranking}`} id={`rank-${rowNum}-${item.ranking}`} className="rank-cell">
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

    function createCellsForRows() {
        const maxRows = 4;
        for (var row = 1; row <= maxRows; row++) {
            createCellsForRow(row);
        }
    }

    function createRowsForGrid() {

        rankingGrid.push(<GridRow key="row-1" cellCollection={cellCollectionTop} labels={labels} rowNum={1} rowName={"top-tier"} drop={drop} allowDrop={allowDrop} />)
        rankingGrid.push(<GridRow key="row-2" cellCollection={cellCollectionMiddle} labels={labels} rowNum={2} rowName={"middle-tier"} drop={drop} allowDrop={allowDrop} />)
        rankingGrid.push(<GridRow key="row-3" cellCollection={cellCollectionBottom} labels={labels} rowNum={3} rowName={"bottom-tier"} drop={drop} allowDrop={allowDrop} />)
        rankingGrid.push(<GridRow key="row-4" cellCollection={cellCollectionWorst} labels={labels} rowNum={4} rowName={"worst-tier"} drop={drop} allowDrop={allowDrop} />)

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