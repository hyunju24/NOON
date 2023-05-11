// 웹툰 리스트 고르는 페이지
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ToonCard from "./ToonCard";
import {allList, chosenList, popularList, sameLine, sameDrawing} from '../app/store'
import {useRecoilState, useSetRecoilState} from 'recoil'
import axios from 'axios'


function ChooseList() {
    const toonAllList = useRecoilState(allList)[0]
    const setToonAllList = useSetRecoilState(allList)
    const popular = useRecoilState(popularList)[0]
    const setPopular = useSetRecoilState(popularList)
    const setSameLineList = useSetRecoilState(sameLine)
    const setSameDrawingList = useSetRecoilState(sameDrawing)

    const chosen = useRecoilState(chosenList)[0]
    const [isChosen, setIsChosen] = useState(0)
    const [isFiltered, setIsFiltered] = useState(0)
    const [filteredList, setIsFilteredList] = useState([])
    const lengthOfToons = toonAllList.length

    // create될 떄 axios 보내서 webtoon list 전체 받아오기
    // const baseURL = ',
    // "proxy": "http://10.10.223.67:8000'

    const sameDrawingList = useRecoilState(sameDrawing)[0]

    useEffect (()=> {
        // 인기 웹툰 5개
        axios({
            url: '/top_web',
            method: 'get',
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);
            setPopular(res.data)
        })
        
        // 웹툰 전체 리스트
        axios({
            url: '/sql_read_col',
            method: 'get',
            withCredentials: true,
        })
        .then(res => {
            setToonAllList(res.data)
        })
        .catch(err => console.log(err))
    }, [])


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

    function handleChosen() {
        // const baseURL = 'http://10.10.223.67:8000'/
        const onlyId = []
        for (const item of chosen) {
            onlyId.push(item.titleId)
        }
        console.log(onlyId); 
        axios({
            url: '/get_webtoon',
            method: 'post',
            data: onlyId
        })
        .then(res => {
            // console.log(res.data.items1, res.data.items2);
            setSameLineList(res.data.items1)
            setSameDrawingList(res.data.items2)
        })
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

                {isFiltered === 0 &&
                    <div className="container mt-5 mx-5">
                        <div className="row mb-2">
                            <h5 className="fw-bold text-center">🏆 이 달의 인기 웹툰</h5>   
                        </div>
                        <div className="row justify-content-center">
                            {/* <div className="col"> */}
                                {popular.map(d => {
                                    return(
                                        <ToonCard data={d}/>
                                    )
                                })}
                            {/* </div> */}
                        </div>
                    </div>
                }
                {isFiltered === 1 && (
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
                                        {chosen.map(d => {
                                                return(
                                                    <div>
                                                        <ToonCard data={d}/>
                                                    </div>
                                                )
                                        })}
                            </div>
                        </div>
                        <div className="d-flex col-2 align-items-end">
                            {/* {chosen.length === 5 && */}
                            {/* chosen.length === 5 ? '/result': '' */}
                                <Link to={''} 
                                    className='text-decoration-none text-white'
                                    onClick={chosen.length === 5 ? handleChosen : ''}>
                                    <button className={`mx-4 mb-4 px-5 py-3 text-white fw-bold btn opacity-75 ${chosen.length === 5? 'btn-primary':'disabled btn-secondary'}`}>
                                        결과 보기
                                    </button>
                                </Link>
                        </div>
                            
                    </div> 
                </div>}                
            </div>
        </div>
    )
}

export default ChooseList;