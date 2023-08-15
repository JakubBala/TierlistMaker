const Item = ({item, drag, itemImgObj }) => {
    return (
        <div className="unranked-cell" key={item.id}>
            <img id={`item-${item.id}`}
                src={itemImgObj.image}
                alt="item logo"
                style={{ cursor: "pointer" }}
                draggable="true"
                onDragStart={drag}></img>
        </div>
    )
}

export default Item;