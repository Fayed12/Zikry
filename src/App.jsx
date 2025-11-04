// react router
import { Outlet } from "react-router"
import { Provider } from "react-redux";

// redux
import store from "./redux/store";

// local
import NavBar from "./components/nav-bar/navBar"
import Footer from "./components/footer/footer"

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="all-page">
          <header>
            <NavBar />
          </header>
          <main>
            <div className="content">
              <Outlet />
            </div>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Provider>
    </>
  );
}

export default App
