// ROUTER
import { BrowserRouter, Routes, Route } from "react-router-dom"

//DEFAULT LAYOUT
import Defaultlayout from "./layouts/Defaultlayout"

//PAGES
import Homepage from "./pages/Homepage"
import SearchPage from "./pages/SearchPage"
import DetailPage from "./pages/DetailPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import NotFoundPage from "./pages/NotFoundPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Defaultlayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/searchpage" element={<SearchPage />} />
            <Route path="/detailpage/:slug" element={<DetailPage />} />
            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
