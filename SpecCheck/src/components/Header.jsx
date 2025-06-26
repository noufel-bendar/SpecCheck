import { IoMdSearch } from "react-icons/io";
const manuel = [
  {id:1, name: "Home", link: "/#" },
  {id:2, name: "About", link: "/#about" },
  {id:3, name: "Shop", link: "/#shop" },
  {id:4, name: "Account", link: "/#account" }
]
function Header() {
  return (
    <header className="  p-4  h-20 flex items-center justify-between bg-royal bg-opacity-90 shadow-lg fixed top-0 left-0 right-0 z-50 ">
      <a href="/">
       <img className ="h-32 w-32 inline " src="src/assets/images/icon12.png"  />
      </a>
      <span className="text-white text-4xl font-bold">SpecCheck</span>

          <div className="relative group hidden sm:block  ml-auto">
                <input className="search" type="text" placeholder="Search" />
                <IoMdSearch className="absolute top-1/2  -translate-y-1/2 right-1 text-xl text-royal group-hover:text-pretty duration-300 pl-1" />
          </div>
        <div>
         
          <ul>
            {
              manuel.map((data, index) => (
                <li key={index} className="inline-block mx-4 text-white hover:text-gray-300 duration-200">
                  <a href={data.link} className="font-semibold">{data.name}</a>
                </li>
              ))
            }
          </ul>
        </div>


    </header>
  );
}
export default Header;