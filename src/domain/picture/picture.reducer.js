import { types } from './picture.actions';

export default function reducer(state, action) {
    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_LIKED:
            const { pictures } = state;
            const idx = pictures.findIndex(picture => picture.picsum_id === action.payload.picsum_id);
            pictures[idx] = { ...pictures[idx], ...action.payload };
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            }
        case types.PICTURE_DISLIKED:
            const pictureLiked = state.pictures;
            const userLiked = state.user;
            const idx2 = pictureLiked.findIndex(picture => picture.picsum_id === action.payload.picsum_id);

            pictureLiked[idx2].likedBy.forEach((userId, index)=> {
                if(userId === userLiked.id) {
                    pictureLiked[idx2].likedBy.splice(index,1)
                }
            });
            pictureLiked[idx2] = { ...pictureLiked[idx2], ...action.payload };
            return {
                ...state,
                pending: false,
                pictures: [...pictureLiked]
            }
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
