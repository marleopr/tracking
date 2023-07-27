import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/homePage/HomePage"
import ErrorPage from "../pages/errorPage/ErrorPage"
import BuscaCep from "../pages/buscaCep/BuscaCep"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                {/* <Route path="details/:id" element={<DetailsPage/>}/> */}
                <Route path="buscacep" element={<BuscaCep/>}/>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}