import SideBar from "../_components/SideBar";
import NavBar from "../_components/NavBar";
import DashBoard from "../_components/DashBoard";

export default function Home() {
  return (
    <div className="flex h-full">
      <SideBar />
      <div className="w-full ">
        <NavBar />
        <DashBoard />
      </div>
    </div>
  );
}
