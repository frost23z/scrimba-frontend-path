import { createBrowserRouter } from 'react-router'
import ErrorBoundary from './components/ErrorBoundary'
import HostLayout from './components/HostLayout'
import Layout from './components/Layout'
import About from './pages/About'
import Home from './pages/Home'
import Dashboard, { loader as dashboardLoader } from './pages/Host/Dashboard'
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import Login, { action as loginAction, loader as loginLoader } from './pages/Login'
import NotFound from './pages/NotFound'
import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail'
import Vans, { loader as vansLoader } from './pages/Vans/Vans'
import { requireAuth } from './utils'

const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: Layout,
            ErrorBoundary: ErrorBoundary,
            children: [
                {
                    index: true,
                    Component: Home
                },
                {
                    path: 'about',
                    Component: About
                },
                {
                    path: 'vans',
                    Component: Vans,
                    loader: vansLoader,
                    ErrorBoundary: ErrorBoundary
                },
                {
                    path: 'vans/:id',
                    Component: VanDetail,
                    loader: vanDetailLoader,
                    ErrorBoundary: ErrorBoundary
                },
                {
                    path: 'login',
                    Component: Login,
                    loader: loginLoader,
                    action: loginAction
                },
                {
                    path: 'host',
                    Component: HostLayout,
                    ErrorBoundary: ErrorBoundary,
                    children: [
                        {
                            index: true,
                            Component: Dashboard,
                            loader: dashboardLoader
                        },
                        {
                            path: 'income',
                            Component: Income,
                            loader: async ({ request }) => await requireAuth(request)
                        },
                        {
                            path: 'reviews',
                            Component: Reviews,
                            loader: async ({ request }) => await requireAuth(request)
                        },
                        {
                            path: 'vans',
                            Component: HostVans,
                            loader: hostVansLoader,
                            errorElement: <ErrorBoundary />
                        },
                        {
                            path: 'vans/:id',
                            Component: HostVanDetail,
                            loader: hostVanDetailLoader,
                            errorElement: <ErrorBoundary />,
                            children: [
                                {
                                    index: true,
                                    Component: HostVanInfo,
                                    loader: async ({ request }) => await requireAuth(request)
                                },
                                {
                                    path: 'pricing',
                                    Component: HostVanPricing,
                                    loader: async ({ request }) => await requireAuth(request)
                                },
                                {
                                    path: 'photos',
                                    Component: HostVanPhotos,
                                    loader: async ({ request }) => await requireAuth(request)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '*',
                    Component: NotFound
                }
            ]
        }
    ],
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true
        }
    }
)

export function HydrateFallback() {
    return <div>Loading...</div>
}

export default router
