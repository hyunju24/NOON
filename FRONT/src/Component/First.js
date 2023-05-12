import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../CSS/First.css'
import { chosenList, sameDrawing, sameLine } from '../app/store';
import { useSetRecoilState } from 'recoil';


function First() {
    const imgData = [
        ['https://image-comic.pstatic.net/webtoon/703844/thumbnail/thumbnail_IMAG21_4122261748397257571.jpg',
        'https://image-comic.pstatic.net/webtoon/761722/thumbnail/thumbnail_IMAG21_8ad71820-0c48-418a-89e9-5c001e393f54.jpg'],
        ['https://image-comic.pstatic.net/webtoon/641253/thumbnail/thumbnail_IMAG21_01672165-03c8-44b1-ba0e-ef82c9cfcd10.jpg',
        'https://image-comic.pstatic.net/webtoon/790713/thumbnail/thumbnail_IMAG21_3919364435331003700.jpg'],
        ['https://image-comic.pstatic.net/webtoon/807306/thumbnail/thumbnail_IMAG21_69a712a4-11e8-48bf-9b0c-a26f28c405d8.jpg',
        'https://image-comic.pstatic.net/webtoon/801589/thumbnail/thumbnail_IMAG21_1b439234-e17d-4fb8-9eef-5d2d4173234c.jpg'],
    ]
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      }
    
    function handleChosenToNull() {
        setChosen([])
        setSameLine([])
        setSameDrawing([])
    }

  return (
    <div className="mx-auto wrapper">
        <div className="">
            {/* public을 root로 인식하기 때문에 앞에 쓸 필요 없음 */}
            <img src='img/logo-green.png' alt='logo' width={'300px'} className='d-block mx-auto mb-5'/>
            <h1 className='title'>
                나에게 딱 맞는 웹툰을 찾아보세요!
            </h1>
            <div className="d-flex justify-content-center mt-5">
                <Link to='/list'>
                    <button className="mx-4 px-5 py-3 text-white btn btn-primary opacity-75" onClick={handleChosenToNull}>
                            시작하기
                    </button>
                </Link>
                <Button className="mx-4 px-5 py-3 text-white btn btn-info opacity-75" onClick={() => handleShow(true)}>
                    서비스 소개
                </Button>
                <Modal className='modal-bg' show={show} fullscreen={fullscreen} 
                    onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className='mt-0 pt-0'>
                        <div className="container mt-5">
                            <div className="row mt-5">
                                <div className="col-5">
                                    <div className="mt-5">
                                        <img src="img/logo-green.png" alt="about" width={'250px'}
                                            className='d-inline border border-0 jumping'/>
                                        <h3 className='d-inline big-font align-bottom ms-3'>으로</h3>
                                        <h3 className='big-font mt-4 ms-1'>보는 즐거움</h3>
                                    </div>
                                    <div className='mt-5'>
                                        <h6 className='font-gray sliding-1' style={{fontSize: '2rem', fontWeight: 600}}>
                                            컷과 컷 사이를 누비는 인공지능
                                        </h6>
                                        <p className='font-gray mt-3 sliding-2' style={{fontSize : '1.5rem', fontWeight: 500}}>딥러닝을 활용해 당신의 취향에 딱 맞는 웹툰을 추천해드립니다. </p>
                                    </div>
                                </div>
                                <div className="col-7 opacity-75" >
                                    <div className="row">
                                        <div className="col-4 mt-5">
                                            <img src="https://image-comic.pstatic.net/webtoon/703844/thumbnail/thumbnail_IMAG21_4122261748397257571.jpg" 
                                                className='d-block mr-0 mb-3 rounded' alt="sample" width={'200px'}/>
                                            <img src='https://image-comic.pstatic.net/webtoon/761722/thumbnail/thumbnail_IMAG21_8ad71820-0c48-418a-89e9-5c001e393f54.jpg'
                                                className='d-block mr-0 mb-3 rounded' alt="sample" width={'200px'}/>
                                        </div>
                                        <div className="col-4">
                                            <img src='https://image-comic.pstatic.net/webtoon/641253/thumbnail/thumbnail_IMAG21_01672165-03c8-44b1-ba0e-ef82c9cfcd10.jpg' 
                                                className='d-block mr-0 mb-3 rounded' alt="sample" width={'200px'}/>
                                            <img src='https://image-comic.pstatic.net/webtoon/790713/thumbnail/thumbnail_IMAG21_3919364435331003700.jpg' 
                                                className='d-block mr-0 mb-3 rounded' alt="sample" width={'200px'}/>
                                        </div>
                                        <div className="col-4 mt-5">
                                            <img src='https://image-comic.pstatic.net/webtoon/807306/thumbnail/thumbnail_IMAG21_69a712a4-11e8-48bf-9b0c-a26f28c405d8.jpg' 
                                                className='d-block mr-0 mb-3 rounded' alt="sample" width={'200px'}/>
                                            <img src='https://image-comic.pstatic.net/webtoon/801589/thumbnail/thumbnail_IMAG21_1b439234-e17d-4fb8-9eef-5d2d4173234c.jpg' 
                                                className='d-block mr-0 mb-3 rounded' alt="sample" width={'200px'}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>
        </div>

    </div>
  );
}

export default First;
