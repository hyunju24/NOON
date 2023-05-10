import { Link } from "react-router-dom"
import { allList } from "../app/store"
import { useRecoilState } from "recoil"
import ToonCard from "./ToonCard"


function ResultList() {
    const toonAllList = useRecoilState(allList)[0]

    return (
        <div className='pt-0'>
            <div className="mx-5 mt-3">
                <div className="row ms-5">
                    <Link to='/'>
                        <img src='img/logo-green.png' alt='logo' width={'130px'}/>
                    </Link>
                </div>

                {/* 다시 선택하러 가기 */}
                <div className="row">
                    <div className="col-2 offset-10">
                        <Link to={'/list'} className='d-block text-decoration-none text-white'>
                            <button className="mb-3 p-3 text-white fw-bold btn btn-info opacity-75" style={{fontSize: '0.9rem'}}>
                                다시 선택하러 가기
                            </button>
                        </Link>
                    </div>
                </div>

                {/* 그림체가 비슷한 웹툰 */}
                <div className="container pt-3 rounded border border-0 bg-white-op">
                    <div className="row mb-2">
                        <h5 className="fw-bold">🎨 그림체가 비슷한 웹툰</h5>   
                    </div>
                    <div className="row justify-content-start">
                        {/* <div className="col"> */}
                            {toonAllList.map(d => {
                                return(
                                    <ToonCard data={d}/>
                                )
                            })}
                        {/* </div> */}
                    </div>
                </div>

                {/* 줄거리가 비슷한 웹툰 */}
                <div className="container mt-5 pt-3 rounded border border-0 bg-white-op">
                    <div className="row mb-2">
                        <h5 className="fw-bold">✒️ 줄거리가 비슷한 웹툰</h5>   
                    </div>
                    <div className="row justify-content-start">
                        {/* <div className="col"> */}
                            {toonAllList.map(d => {
                                return(
                                    <ToonCard data={d}/>
                                )
                            })}
                        {/* </div> */}
                    </div>
                </div>

                   
            </div>
        </div>
    )
}
export default ResultList