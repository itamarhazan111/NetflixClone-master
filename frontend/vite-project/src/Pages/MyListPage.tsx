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
      
      <MyListGrid/>

  </div>
    );
};

export default MyListPage;