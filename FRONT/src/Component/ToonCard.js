import Card from 'react-bootstrap/Card';
import {chosenList} from '../app/store'
import { useRecoilState } from 'recoil';


function ToonCard({data, name, idx, size, marginClass}) {
  const [chosen, setChosen] = useRecoilState(chosenList)
  // const [nowChosen, setNowChosen] = useState(alreadyChosen)

  // const setChosen = useSetRecoilState(chosenList)
  const prize = ['🥇', '🥈', '🥉', '🏅', '🏅']

  const addChosen = (tid, tle, path) => {
    // console.log('log', tid, tle, path);
    setChosen((prev)=> [
      {titleId: tid, title: tle, imgPath: path}, ...prev])
  }

  const deleteChosen = (tid) => {
    const newList = [...chosen]
    // console.log(tid, typeof chosen, data);
    let idx = 0
    for (const c of chosen) {
      if (c.titleId === data.titleId) {
        // console.log(idx);
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

  function openLink(event, id) {
    // console.log(event, id)
    window.open(`https://comic.naver.com/webtoon/list?titleId=${id}`, '_blank')
  }
  

  return (
    <Card style={{ width: `${size}rem`, cursor: 'pointer' }} className={`hover-card ${marginClass} my-1 bg-transparent pe-auto border border-0`} 
      onClick={name === 'chooseList' ? handleCard : (event) => openLink(event, data.titleId)}>
      <Card.Img variant="top" src={data.imgPath} className='mt-2'/>
      <Card.Body className='rounded px-0'>
        <Card.Title style={{fontSize: '0.8rem'}} className='fw-bold text-center mb-0 text-truncate'>
          <span style={{fontSize: '1.4rem'}}>{prize[idx]}</span> {data.title}</Card.Title>
        {/* {data.titleId} */}
      </Card.Body>
    </Card>
  );
}

export default ToonCard;