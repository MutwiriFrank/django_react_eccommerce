import { CATEGORIES_LIST_REQUEST, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAIL,
    ROOM_CATEGORIES_LIST_REQUEST, ROOM_CATEGORIES_LIST_SUCCESS, ROOM_CATEGORIES_LIST_FAIL
} from '../constants/categoryConstants'


export const categoryListReducer = (state= {categories: []}, action) => {

    switch (action.type){
        case CATEGORIES_LIST_REQUEST:
            return{
                loading: true,
                categories: []
                
            }
        

        case CATEGORIES_LIST_SUCCESS:
            
            return{
                loading: false,
                categories: action.payload
            }   

        case CATEGORIES_LIST_FAIL:
            return{
                loading: false,
                error: action.payload

            }
        default:
            return state           

        }

}

export const RoomCategoryListReducer = (state= {rooms: []}, action) => {

    switch (action.type){
        case ROOM_CATEGORIES_LIST_REQUEST:
            return{
                loading: true,
                categories: []
                
            }
        

        case ROOM_CATEGORIES_LIST_SUCCESS:
            
            return{
                loading: false,
                rooms: action.payload
            }   

        case ROOM_CATEGORIES_LIST_FAIL:
            return{
                loading: false,
                error: action.payload

            }
        default:
            return state           

        }

}



