import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../pages/Header"
import HomePage from "../pages/homePage/HomePage"
import BuscaCep from "../pages/buscaCep/BuscaCep"
import ErrorPage from "../pages/errorPage/ErrorPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="buscacep" element={<BuscaCep />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}