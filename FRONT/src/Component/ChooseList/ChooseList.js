// 웹툰 리스트 고르는 페이지
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../CSS/toonlist.css'
import ToonCard from "../ToonCard";
import SearchBar from './SearchBar';
import {allList, chosenList} from '../../app/store'
import {useRecoilState} from 'recoil'


function ChooseList() {
    const toonAllList = useRecoilState(allList)[0]
    const chosen = useRecoilState(chosenList)[0]
    const [isChosen, setIsChosen] = useState(0)
    const [isFiltered, setIsFiltered] = useState(0)
    const [filteredList, setIsFilteredList] = useState([])
    const lengthOfToons = toonAllList.length

    useEffect(() => {
        // toonAllList.forEach((toon) => console.log(toon))
        if (chosen.length !== 0) {
            setIsChosen(1)
        } else if (chosen.length === 0){
            setIsChosen(0)
        } 

    }, [chosen])

    function handleChangeSearch(event) {
        let filtered = toonAllList.filter(toon => toon.title.includes(event.target.value))
        // console.log(filtered);
        // console.log('leng', filtered.length,lengthOfToons);
        if (filtered.length > 0 && filtered.length < lengthOfToons) {
            setIsFiltered(1)
            setIsFilteredList(filtered)
        } else if (filtered.length === 0 || filtered.length === lengthOfToons) {
            setIsFiltered(0)
            setIsFilteredList([])
        }
    }



    return (
        <div className='pt-0'>
            <div className="mx-5 mt-3">
                <Link to='/'>
                    <img src='img/logo-green.png' alt='logo' width={'130px'}/>
                </Link>

                <div>
                    <h4 className="fw-bold text-center">즐겨보는 웹툰 5개를 선택해주세요</h4>
                    <input type="text" className="border border-none rounded d-block w-50 py-3 px-3 mt-4 mx-auto" placeholder="🔎 웹툰 이름 검색"
                        onKeyUp={handleChangeSearch}/>
                </div>

                {!isFiltered &&
                    <div className="container mt-5 mx-5">
                        <div className="row mb-2">
                            <h5 className="fw-bold text-center">🏆 이 달의 인기 웹툰</h5>   
                        </div>
                        <div className="row justify-content-center">
                            {/* <div className="col"> */}
                                {toonAllList.map(d => {
                                    return(
                                        <ToonCard data={d}/>
                                    )
                                })}
                            {/* </div> */}
                        </div>
                    </div>
                }
                {isFiltered && (
                    <div className="container mt-5 mx-5">
                        <div className="row mb-2">
                            <h5 className="fw-bold text-center">🔎 검색 결과</h5>   
                        </div>
                        <div className="row justify-content-center">
                            {filteredList.map(filtered => {
                                return(
                                    <ToonCard data={filtered} />
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className="w-100 fixed-bottom px-5 rounded-top" style={{backgroundColor: 'rgb(256, 256, 256, 0.8)'}}>
            {isChosen === 1 && 
                <div>
                    <div className="row">
                        <div className="col-2">
                            <h5 className='mt-3 mb-0'>❤️ 내가 선택한 웹툰 목록</h5>

                        </div>
                        <div className="col-8">
                            <div className='d-flex justify-content-start'>
                                    {/* <div> */}
                                        {chosen.map(d => {
                                                return(
                                                    <div>
                                                        {/* {d} */}
                                                        <ToonCard data={d}/>
                                                    </div>
                                                )
                                        })}
                                {/* </div> */}
                            </div>
                        </div>
                        <div className="d-flex col-2 align-items-end">
                            <button className="mx-4 mb-4 px-5 py-3 text-white fw-bold btn btn-primary opacity-75">
                                    결과 보기
                            </button>
                        </div>
                            
                    </div> 
                </div>}                
            </div>
        </div>
    )
}

export default ChooseList;