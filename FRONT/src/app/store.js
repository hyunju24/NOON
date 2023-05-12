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
    effects_UNSTABLE: [persistAtom]
});

export const popularList = atom({
    key: 'popularList',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export const sameLine = atom({
    key: 'sameLine',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

export const sameDrawing = atom({
    key: 'sameDrawing',
    default: [],
    effects_UNSTABLE: [persistAtom]
})
