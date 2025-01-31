import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Mint } from "@/pages/Mint";
import { CreateCollection } from "@/pages/CreateCollection";
import { MyCollections } from "@/pages/MyCollections";
// import { TopBanner } from "./components/TopBanner";
import Portfolio from "@/pages/Portfolio";
import { IS_DEV } from "./constants";
import Home from "@/pages/Portfolio";
import HomePage from "./pages/HomePage";

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {path: "/", element:<HomePage/>},
      {
        path: "/book",
        element: <Mint />,
      },
      {
        path: "create-collection",
        element: <CreateCollection />,
      },
      {
        path: "my-collections",
        element: <MyCollections />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />
      }
    ],
  },
]);

function App() {
  return (
    <>
      {IS_DEV}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
