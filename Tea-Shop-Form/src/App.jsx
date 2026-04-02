 import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerForm from "../src/lib/components/CustomerForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;