import "./App.css";
import Navbar from "./components/Navbar";
import Sidenavbar from "./components/Sidenavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse";
import Communication from "./pages/Communication";
import StartUp from "./pages/StartUp";
import Home from "./pages/Home";
import ShowNavBars from "./components/ShowNavBars";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ChatProvider>
        <main>
          <Navbar />
          <ShowNavBars>
            <Sidenavbar />
          </ShowNavBars>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/:startUpId/startUp" element={<StartUp />} />
          </Routes>
        </main>
        </ChatProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
