import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { RankItems } from "./components/FetchData";
import { Home } from "./components/Home";

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
    path: '/rank-items',
    element: <RankItems />
  }
];

export default AppRoutes;