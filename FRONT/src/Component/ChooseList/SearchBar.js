import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { allList } from "../../app/store";

function SearchBar() {
    const toonAllList = useRecoilState(allList)[0]
    const [isFiltered, setIsFiltered] = useState(0)
    const [filteredList, setIsFilteredList] = useState([])

    function handleChangeSearch(event) {
        
        // for (const c in toonAllList) {
        //     console.log(c, toonAllList[c]);
        // }
        let filtered = toonAllList.filter(toon => toon.title.includes(event.target.value))
        // console.log(filtered);
        if (filtered.length > 0) {
            setIsFiltered(1)
        } else if (filtered.length === 0) {
            setIsFiltered(0)
        }
        setIsFilteredList(filtered)
    }

    return (
        <div>
            <input type="text" className="border border-none rounded d-block w-50 py-3 px-3 mt-4 mx-auto" placeholder="🔎 웹툰 이름 검색"
                onKeyUp={handleChangeSearch}/>
        </div>
    )
}

export default SearchBar;