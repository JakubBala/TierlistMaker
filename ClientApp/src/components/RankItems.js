import React, { useState, useEffect } from 'react';
import GameImageArr from './GameImages.js';
import RankingGrid from './RankingGrid.js';

const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1;

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
            <RankingGrid items={items} imgArr={GameImageArr} />
            <div className="items-not-ranked">
                {
                    (items.length > 0) ?
                        items.map((item) =>

                            <div className="unranked-cell" key={item.id}>
                                <img id={`item-${item.id}`} src={GameImageArr.find(o => o.id === item.imageId)?.image} alt="item logo"></img>
                        </div>)
                        :
                        <div>Loading...</div>
                }
            </div>
        </main>
    )
}
export default RankItems;