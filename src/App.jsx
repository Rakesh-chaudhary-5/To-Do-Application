import Home from "./components/Home";
import { MyProvider } from "./context/MyContext";

function App() {
  return (
    <MyProvider>
      <Home />
    </MyProvider>
  );
}

export default App;
