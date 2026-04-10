import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Products",
    path: "/products",
    newTab: false,
  },
  {
    id: 4,
    title: "Account",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Sign In",
        path: "/signin",
        newTab: false,
      },
      {
        id: 42,
        title: "Sign Up",
        path: "/signup",
        newTab: false,
      },
      {
        id: 43,
        title: "Logout",
        path: "/logout", // We'll need to handle this
        newTab: false,
      },
    ],
  },
];
export default menuData;
