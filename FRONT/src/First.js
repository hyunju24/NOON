// import logo from './logo.svg';
import './First.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from ''

function App() {
  return (
    <div className="mx-auto">
        <div className="wrapper">
            <h1 className='title'>
                NOON으로 보는 더 큰 즐거움
            </h1>
            <div className="d-flex justify-content-center mt-5">
                <Route path='/login' element={}>
                    <button className="mx-4 px-5 py-3 text-white btn btn-primary opacity-75">
                            login
                    </button>
                </Route>
                {/* <a href="./login.html" className="text-decoration-none">
                    
                </a> */}
                <a href="./join.html" className="text-decoration-none">
                    <button className="mx-4 px-5 py-3 text-white btn btn-primary opacity-75">
                        join us
                    </button>
                </a>
            </div>
        </div>

    </div>
  );
}

export default App;
