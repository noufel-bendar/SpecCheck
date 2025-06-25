function Header() {
  return (
    <header className=" text-white p-4  h-24 flex items-center justify-between">
      <a href="/">
       <img className ="h-24 w-24 inline " src="src/assets/images/icon.png"  />
        <span className="text-2xl font-bold">SpecCheck</span>
      </a>

    </header>
  );
}
export default Header;