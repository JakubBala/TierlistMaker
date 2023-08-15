import React, { useState, useEffect } from 'react';
import GameImageArr from './GameImages.js';
import RankingGrid from './RankingGrid.js';

const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1;

    function drag(ev) {
        //get id of element we are dragging
        ev.dataTransfer.setData("text", ev.target.id);
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
        //we drop into empty row cell
        if (targetEl.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));

            //change item ranking to which cell it was dropped into
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetEl.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);

        }
    }

    //this will run when the component first is rendered
    useEffect(() => {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
                console.log(data);
            })
    }, []);


    //This is the actual rendering part of the React component. 
    return (
        <main>
            <RankingGrid items={items} imgArr={GameImageArr} drag={drag} allowDrop={allowDrop} drop={drop} />
            <div className="items-not-ranked">
                {
                    (items.length > 0) ?
                        items.map((item) =>
                            (item.ranking === 0) ?
                            <div className="unranked-cell" key={item.id}>
                                <img id={`item-${item.id}`}
                                    src={GameImageArr.find(o => o.id === item.imageId)?.image}
                                    alt="item logo"
                                    style={{ cursor: "pointer" }}
                                    draggable="true"
                                    onDragStart={drag}></img>
                            </div>
                            : null)
                        :
                        <div>Loading...</div>
                }
            </div>
        </main>
    )
}
export default RankItems;