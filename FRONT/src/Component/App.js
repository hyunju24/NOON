import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChooseList from "./ChooseList/ChooseList";
import First from "./First"


function App() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<First />}/>
                <Route path="/list" element={<ChooseList />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;