import {useState } from 'react'
import RankItems from './RankItems.jsx'
import Typography from '@mui/material/Typography'

const RankItemsContainer = ({ dataType, imgArr }) => {

    const gameLocalStorageKey = "games";
    const countryLocalStorageKey = "countries";
    var localStorageKey = "";

    const [gameItems, setGameItems] = useState(JSON.parse(localStorage.getItem(gameLocalStorageKey)))
    const [countryItems, setCountryItems] = useState(JSON.parse(localStorage.getItem(countryLocalStorageKey)))

    var data = [];
    var setFunc = null;

    if (dataType === 1) {
        data = gameItems;
        setFunc = setGameItems;
        localStorageKey = gameLocalStorageKey;
    } else if (dataType === 2) {
        data = countryItems;
        setFunc = setCountryItems;
        localStorageKey = countryLocalStorageKey;
    }

    return (
        <div>
            <Typography>MUI Typography</Typography>
            <RankItems items={data} setItems={setFunc} dataType={dataType} imgArr={imgArr} localStorageKey={localStorageKey} />
        </div>
    )
}
export default RankItemsContainer;