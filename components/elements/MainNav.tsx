import MenuModel from "../../models/MenuModel";

const MainNav: React.FC<{
  logoUrl: string;
  brandText: string;
  menu: MenuModel[];
}> = (props) => {
  return (
    <nav
      className="
  relative
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-3.5
  bg-white
  shadow
  "
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between pl-6">
        <div className="flex-grow items-center flex flex-row">
          <a
            className="
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        lg:mt-0
      "
            href="#"
          >
            <img
              src={props.logoUrl}
              alt=""
              loading="lazy"
              className="mx-8 w-12"
            />
            <span className="text-2xl font-medium text-black">
              {props.brandText}
            </span>
          </a>

          <ul className="flex flex-row pl-0 list-style-none ml-auto">
            {props.menu.map((item) => (
                                  <li key={item.id} className="py-2 pr-12 text-2xl">
                                  <a
                                    href={item.href}
                                    className="
                                    nav-link text-gray-400 hover:text-gray-700 focus:text-gray-700 p-0
                                "
                                  >
                                    {item.title}
                                  </a>
                                </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
