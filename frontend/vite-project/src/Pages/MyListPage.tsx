import MyListGrid from "@/Components/MyLIstGrid";
import CheckUser from "@/Components/shared/CheckUser";
import NavBar from "@/Components/shared/NavBar";
import Title from "@/Components/shared/Title";


const MyListPage= () => {

    return (
      <div>
      <CheckUser/>
      <NavBar></NavBar>
      <Title title='my list - Netflix'/>
      <div className="px-14 py-20 ">
        <h1 className="text-white text-3xl font-bold ">My List</h1>
        <MyListGrid/>
      </div>


  </div>
    );
};

export default MyListPage;