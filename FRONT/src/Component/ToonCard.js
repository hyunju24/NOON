import Card from 'react-bootstrap/Card';
import {chosenList} from '../app/store'
import { useRecoilState } from 'recoil';


function ToonCard({data}) {
  const [chosen, setChosen] = useRecoilState(chosenList)
  // const [nowChosen, setNowChosen] = useState(alreadyChosen)

  // const setChosen = useSetRecoilState(chosenList)

  const addChosen = (tid, tle, path) => {
    console.log('log', tid, tle, path);
    setChosen((prev)=> [
      {titleId: tid, title: tle, imgPath: path}, ...prev])
  }

  const deleteChosen = (tid) => {
    const newList = [...chosen]
    // console.log(tid, typeof chosen, data);
    let idx = 0
    for (const c of chosen) {
      if (c.titleId === data.titleId) {
        console.log(idx);
        newList.splice(idx, 1)
        setChosen(newList)
      }
      idx += 1
    }
  }

  function handleCard() {
    if (chosen.length === 0) {
      console.log(data.imgPath);
      addChosen(data.titleId, data.title, data.imgPath)
    } else if (chosen.length > 0 && chosen.length <= 5) {
      // 중복 확인
      if (chosen.some(toon => toon.titleId === data.titleId)) {
        deleteChosen(data.titleId)
      } else {
        if (chosen.length < 5){
          addChosen(data.titleId, data.title, data.imgPath)
        } else {
            window.alert('웹툰은 5개까지 선택 가능합니다.')
        }
      }
    } else if (chosen.length >= 5) {
      console.log('over', chosen);
      window.alert('웹툰은 5개까지 선택 가능합니다.')
    }
    
  }
  

  return (
    <Card style={{ width: '9rem', cursor: 'pointer' }} className='my-1 mx-3 bg-transparent pe-auto border border-0' onClick={handleCard}>
      <Card.Img variant="top" src={data.imgPath} className='mt-2'/>
      <Card.Body className='px-1 rounded'>
        <Card.Title style={{fontSize: '0.8rem'}} className='fw-bold text-center mb-0 text-truncate'>{data.title}</Card.Title>
        {/* {data.titleId} */}
      </Card.Body>
    </Card>
  );
}

export default ToonCard;