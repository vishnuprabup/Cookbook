import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Pages />
      </div>
    </BrowserRouter>
  );
};
export default App;
