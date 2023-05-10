import { atom } from 'recoil'

export const allList = atom({
    key: 'allList',
    default : [
        {
            titleId: '761722',
            title: '세기말 풋사과 보습학원',
            imgPath: 'https://image-comic.pstatic.net/webtoon/761722/thumbnail/thumbnail_IMAG21_8ad71820-0c48-418a-89e9-5c001e393f54.jpg'
        },
        {
            titleId: '703844',
            title: '가비지 타임',
            imgPath: 'https://image-comic.pstatic.net/webtoon/703844/thumbnail/thumbnail_IMAG21_4122261748397257571.jpg',
        },
        {
            titleId: '765470',
            title: '율리',
            imgPath: 'https://image-comic.pstatic.net/webtoon/765470/thumbnail/thumbnail_IMAG21_4050762886755529572.jpg'
        },
        {
            titleId: '774862',
            title: '조조 코믹스',
            imgPath: 'https://image-comic.pstatic.net/webtoon/774862/thumbnail/thumbnail_IMAG21_cc92b18e-50b6-426b-bcf7-e55097b4c80b.jpg'
        },
        {
            titleId: '790713',
            title: '대학원 탈출일지',
            imgPath: 'https://image-comic.pstatic.net/webtoon/790713/thumbnail/thumbnail_IMAG21_3919364435331003700.jpg'
        },
        {
            titleId: '783053',
            title: '김부장',
            imgPath: 'https://image-comic.pstatic.net/webtoon/783053/thumbnail/thumbnail_IMAG21_d7732f14-26da-4e35-8762-660cc87b53f1.jpg'
        },
        {
            titleId: '796152',
            title: '마루는 강쥐',
            imgPath: 'https://image-comic.pstatic.net/webtoon/796152/thumbnail/thumbnail_IMAG21_26b9c1d8-ca2d-4fc7-87ea-a3334634236a.jpg'
        },
    ]

});

export const chosenList = atom({
    key: 'chosenList',
    default: []
});