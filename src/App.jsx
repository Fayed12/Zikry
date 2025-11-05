// react router
import { Outlet } from "react-router"
import { Provider } from "react-redux";

// redux
import store from "./redux/store";

// react 
import { useEffect, useState } from "react";

// local
import NavBar from "./components/nav-bar/navBar"
import Footer from "./components/footer/footer"
import Loading from "./pages/loading/loading";

function App() {
  const [isOpenWelcome, setIsOpenWelcome] = useState(() => {
    const status = sessionStorage.getItem("isOpenWelcome");
    return status === null ? "true" : status;
  })

  useEffect(() => {
     const timer =setTimeout(() => {
      setIsOpenWelcome("false")
    }, 2000);

    return ()=>clearTimeout(timer)
  }, [isOpenWelcome])

  useEffect(() => {
    sessionStorage.setItem("isOpenWelcome", isOpenWelcome.toString());
  }, [isOpenWelcome]);
  if (isOpenWelcome === "true") {
    return (
      <Loading/>
    )
  } else {
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
  
}

export default App
