import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ROUTES } from "components/constants";

import SearchPage from "components/pages/SearchPage";
import ReportPage from "components/pages/ReportPage";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.HOME} element={<SearchPage />} />
                <Route path={ROUTES.REPORT} element={<ReportPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;