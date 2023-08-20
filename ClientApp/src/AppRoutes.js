import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import RankItemsContainer from "./components/RankItemsContainer";
import Home from "./components/Home.jsx";
import GameImageArr from './components/GameImages.js';
import CountryImageArr from './components/CountryImages.js';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/rank-games',
        element: <RankItemsContainer dataType={1} imgArr={GameImageArr} />
    },
    {
        path: '/rank-countries',
        element: <RankItemsContainer dataType={2} imgArr={CountryImageArr} />
    }
];

export default AppRoutes;
