import { Link, Navigate } from "react-router-dom"
import { sameLine, sameDrawing, chosenList, isClicked } from "../app/store"
import { useRecoilState } from "recoil"
import ToonCard from "./ToonCard"
import { useEffect } from "react"


function ResultList() {
    const sameLineList = useRecoilState(sameLine)[0]
    const sameDrawingList = useRecoilState(sameDrawing)[0]
    const chosen = useRecoilState(chosenList)[0]

    return (
        <div className='pt-0'>
            <div className="mx-3 mt-3">
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

                <div className="container mx-auto p-0">
                    <div className="row">
                        <div className="col-4 pt-3 rounded border border-0 bg-white-op">
                        <div className="container">
                                <div className="row mb-2">
                                    <h5 className="fw-bold text-center mt-2 mt-2">❤️ 내가 선택한 웹툰</h5>   
                                </div>
                                <div className="row justify-content-center mt-5">
                                    {/* <div className="col"> */}
                                        {chosen.map(d => {
                                            return(
                                                <ToonCard data={d} name={'resultList'} size={8.5} textAlign={'text-center'}/>
                                            )
                                        })}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            {/* 그림체가 비슷한 웹툰 */}
                            <div className="container pt-3 rounded border border-0 bg-white-op">
                                <div className="row mb-2">
                                    <h5 className="fw-bold text-center mt-2">🎨 그림체가 비슷한 웹툰</h5>   
                                </div>
                                <div className="row justify-content-center">
                                    {/* <div className="col"> */}
                                        {sameDrawingList.map((d, idx) => {
                                            return(
                                                <ToonCard data={d} name={'resultList'} idx={idx} size={9} textAlign={'text-start'}/>
                                            )
                                        })}
                                    {/* </div> */}
                                </div>
                            </div>

                            {/* 줄거리가 비슷한 웹툰 */}
                            <div className="container mt-2 pt-3 rounded border border-0 bg-white-op">
                                <div className="row mb-2">
                                    <h5 className="fw-bold text-center mt-2">✒️ 줄거리가 비슷한 웹툰</h5>   
                                </div>
                                <div className="row justify-content-center">
                                    {/* <div className="col"> */}
                                        {sameLineList.map((d, idx) => {
                                            return(
                                                <ToonCard data={d} name={'resultList'} idx={idx} size={9} textAlign={'text-start'}/>
                                            )
                                        })}
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    )
}
export default ResultList
