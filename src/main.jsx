import { StrictMode } from 'react'
import "leaflet/dist/leaflet.css";
import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import APOD from './components/APOD.jsx'
import MarsPhotos from './components/MarsPhotos.jsx'
import NasaMedia from './components/NasaMedia.jsx'
import EarthView from './components/EarthView.jsx'
import EarthMapView from './components/EarthMapView.jsx';
// const router = createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout/>,
//     children:[
//       {
//         path:"",
//         element:<APOD/>
//       },
//       {
//         path:"/mars",
//         element:<MarsPhotos/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path='' element={<APOD/>}/>
        <Route path='mars' element={<MarsPhotos/>}/>
        <Route path='media' element={<NasaMedia/>}/>
        <Route path='gibs' element={<EarthMapView/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
