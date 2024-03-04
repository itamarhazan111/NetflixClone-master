import ContentCard from "@/Components/HomePage/ContentCard";
import { User } from "@/Context/user";
import reducerHook from "@/Hooks/reducerHook";
import { IContent } from "@/Models/IContent";
import { IState } from "@/Models/States/IState";

import myListReducer from "@/Reducers/myListGridReducer";
import { useContext, useEffect, useReducer } from "react";



const MyListGrid = () => {
  const { state: { userInfo } } = useContext(User);
    console.log(userInfo)
//   const [state, dispatch] = useReducer(myListReducer, initialState);
  // Fetch data when the component mounts or when userInfo.myList changes
//   useEffect(() => {
//     reducerHook(`/api/v1/users/getMyList/${userInfo.email}`, dispatch);
//   }, [userInfo]); // Add userInfo as a dependency
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* {state.loading ? (
        <p>Loading</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : ( */}
        <>
          {userInfo.myList.map((content: IContent, index: number) => (
            <ContentCard key={index} content={content}></ContentCard>
          ))}
        </>

    </div>
  );
};

export default MyListGrid;
