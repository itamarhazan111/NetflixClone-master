import { IUserState } from "@/Models/States/IUserState";
import { USER_SIGNIN, USER_SIGNOUT, ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST,GET_MY_LIST } from "../Helpers/Actions";
import { MyAction } from "@/Models/Action/MyAction";

const userReducer = (state: IUserState, action: MyAction) => {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case USER_SIGNIN: {
      return { ...state, userInfo: payload };
    }
    case USER_SIGNOUT: {
      return { ...state, userInfo:null};
    }
    case ADD_TO_MY_LIST: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          myList: [...(state.userInfo?.myList||[]),payload],
        },
      };
    }case REMOVE_FROM_MY_LIST: {
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            myList: state.userInfo?.myList?.filter(item => item._id !== payload._id) || [],
          },
        };
      }
    default:
      return { ...state };
  }
};

export default userReducer;