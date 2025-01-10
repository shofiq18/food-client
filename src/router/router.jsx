import {
  createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error from "./Error";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../pages/PrivateRoute";
import FoodDetails from "../pages/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/foods',
        element: <AvailableFoods></AvailableFoods>
      },
      {
        path: '/add',
        element: <PrivateRoute>
          <AddFood></AddFood>
        </PrivateRoute>,
      },
      {
        path: '/my-foods',
        element: <PrivateRoute><ManageMyFoods></ManageMyFoods></PrivateRoute>,
      },
      {
        path: '/my-request',
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>,
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: '/signup',
        element: <Signup></Signup>
      },
      {
        path: '/details/:id',
        element: <FoodDetails></FoodDetails>,
        loader: ({params}) => fetch(`https://assignment-11-server-nine-chi.vercel.app/available-foods/${params.id}`)
      }

    ]
  },
]);
export default router;