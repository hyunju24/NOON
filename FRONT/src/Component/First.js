import { Link } from 'react-router-dom';



function First() {



  return (
    <div className="mx-auto wrapper">
        <div className="">
            {/* public을 root로 인식하기 때문에 앞에 쓸 필요 없음 */}
            <img src='img/logo-green.png' alt='logo' width={'300px'} className='d-block mx-auto'/>
            <h1 className='title'>
                나에게 딱 맞는 웹툰을 찾아보세요!
            </h1>
            <div className="d-flex justify-content-center mt-5">
                <Link to='/list'>
                    <button className="mx-4 px-5 py-3 text-white btn btn-primary opacity-75">
                            시작하기
                    </button>
                </Link>
            </div>
        </div>

    </div>
  );
}

export default First;
