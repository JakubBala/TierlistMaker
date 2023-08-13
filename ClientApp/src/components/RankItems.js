import React, { useState, useEffect } from 'react'

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
            })
    })


    //This is the actual rendering part of the React component. 
    return (
        <main>
            {
                (items != null) ? items.map((item) => <h3>{item.Title}</h3>):<div>Loading...</div>
            }
        </main>
    )
}