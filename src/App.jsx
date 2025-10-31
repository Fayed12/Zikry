import { Outlet } from "react-router"
import NavBar from "./components/nav-bar/navBar"
import Footer from "./components/footer/footer"

function App() {

  return (
    <>
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
          <div className="footer">
            <Footer />
          </div>
        </footer>
      </div>
    </>
  );
}

export default App
