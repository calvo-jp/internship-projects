import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";

const Pokemon = lazy(() => import("./pages/Pokemon"));
const Pokemons = lazy(() => import("./pages/Pokemons"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/pokemons" />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemons/:id" element={<Pokemon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
