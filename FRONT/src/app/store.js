import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist';

const {persistAtom} = recoilPersist()

export const allList = atom({
    key: 'allList',
    default : [],
    effects_UNSTABLE: [persistAtom]
});

export const chosenList = atom({
    key: 'chosenList',
    default: [],
});

export const popularList = atom({
    key: 'popularList',
    default: [],
    effects_UNSTABLE: [persistAtom]
})