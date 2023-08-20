import { useEffect, useState } from 'react';
import RankingGrid from './RankingGrid.jsx';
import ItemCollection from './ItemCollection.jsx';

const RankItems = ({ items, setItems, dataType, imgArr, localStorageKey}) => {

    const [reload, setReload] = useState(false);

    function reloadItems() {
        setReload(true);
    }

    function drag(ev) {
        //get id of element we are dragging
        const draggedElId = ev.target.id.substring(5);
        ev.dataTransfer.setData("id", draggedElId);
        //get the row that this element was just in "previousRow"
        ev.dataTransfer.setData("prevRow", items.find(o => o.id === parseInt(draggedElId)).rowNum);
        //and get the rank it held in that row (its current ranking)
        ev.dataTransfer.setData("prevRank", items.find(o => o.id === parseInt(draggedElId)).ranking);
    }

    //prevent default drop behaviour
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        //ensure we cant drop onto another image
        const targetEl = ev.target;
        if (targetEl.nodeName === "IMG") {
            return false;
        }
        //we drop into a row
        if (targetEl.classList.contains("rank-row")) {
            var draggedElId = parseInt(ev.dataTransfer.getData("id"));
            var prevRow = parseInt(ev.dataTransfer.getData("prevRow"));
            var prevRank = parseInt(ev.dataTransfer.getData("prevRank"));

            //adjust rankings of row cells of row we left
            var itemsInSamePrevRow = [];
            if (prevRow !== 0) {
                itemsInSamePrevRow = items.filter(
                    (otherItem) => otherItem.rowNum === prevRow && otherItem.ranking > prevRank
                );
            }

            //set row based off of row it was dragged onto
            //set row ranking based off of the max rank in the row + 1
            const transformedCollection = items.map((item) => {
                
                if (item.id === parseInt(draggedElId)) {
                    const newRowNum = parseInt(targetEl.id.substring(4)); // The new row number

                    // Find items in the same row
                    const itemsInSameRow = items.filter((otherItem) => otherItem.rowNum === newRowNum);

                    // Find the maximum ranking within the same row
                    var newRowRanking = 1
                    if (itemsInSameRow.length > 0) {
                        newRowRanking = Math.max(...itemsInSameRow.map((otherItem) => otherItem.ranking)) + 1;
                    }

                    return { ...item, rowNum: newRowNum, ranking: newRowRanking };
                }
                else if (itemsInSamePrevRow.some((otherItem) => otherItem.id === item.id)) {
                    // Decrease ranking for items in the same previous row with higher ranking
                    return { ...item, ranking: item.ranking - 1 };
                }
                return { ...item };
            });
            setItems(transformedCollection);

        }
    }

    //this will run whenever dataType changes and re-render the component
    useEffect(() => {
        if (items == null) {
            getDataFromApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataType]);

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
                console.log(data);
            })
    }

    //this will run whenever items changes, prompting a re-render and a save to local storage
    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
        setReload(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    //this will run whenever the reload state changes to true (button clicked)
    useEffect(() => {
        if (reload === true) {
            getDataFromApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);


    //This is the actual rendering part of the React component. 
    return (
        (items != null)?
        <main>
            <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} imgArr={imgArr} drag={drag} />
                <button onClick={reloadItems}>Reload</button>
            </main>
        :<main>Loading...</main>
    )
}
export default RankItems;