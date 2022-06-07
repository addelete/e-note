import { IRouterConfig, lazy } from 'ice';

const IndexPage = lazy(() => import('@/pages/index'));

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: IndexPage,
  },
];

export default routerConfig;
