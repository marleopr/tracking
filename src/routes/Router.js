import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "../pages/homePage/HomePage"
import ErrorPage from "../pages/errorPage/ErrorPage"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                {/* <Route path="details/:id" element={<DetailsPage/>}/> */}
                {/* <Route path="search" element={<SearchPage/>}/> */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}