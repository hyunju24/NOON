import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChooseList from "./ChooseList";
import First from "./First"
import ResultList from './ResultList';


function App() {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<First />}/>
                <Route path="/list" element={<ChooseList />}/>
                <Route path='/result' element={<ResultList />}/>
                <Route path='/redirect' element={ <Navigate to='/list'/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
