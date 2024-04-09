import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import OptionSelectionPage from "./OptionSelectionPage";
import LastPage from "./finalpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/options" element={<OptionSelectionPage />} />
        <Route path="/final" element={<LastPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
