import Inventory from "../pages/Account/Inventory";
import AccountValidated from "../pages/Auth/AccountValidated";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import ValidateAccount from "../pages/Auth/ValidateAccount";
import CreateProduct from "../pages/private/CreateProduct";
import AllProducts from "../pages/AllProducts";
import HomePage from "../pages/public/HomePage";
import NotFound from "../pages/NotFound";
import CreateVendor from "../pages/Vendor/CreateVendor";
import Dashboard from "../pages/private/Dashboard";
import CompanyProducts from "../pages/private/CompanyProducts";
import CheckoutProduct from "../pages/public/CheckoutProduct";
import ViewProduct from "../pages/private/ViewProduct";
import ViewOrders from "../pages/private/ViewOrders";
import AllMyOrders from "../pages/private/loggedUser/AllMyOrders";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: SignIn },
  { path: "/signUp", component: SignUp },
  { path: "/create_vendor", component: CreateVendor },
  { path: "/validateAccount", component: ValidateAccount },
  { path: "/accountValidated/:token", component: AccountValidated },
  { path: "product/:id", component: CheckoutProduct },
  { path: "/ourProducts", component: AllProducts },
  { path: "*", component: NotFound },
];

const privateRoutes = [
  { path: "/inventory", component: Inventory },
  { path: "/", component: Dashboard },
  { path: "/createProduct", component: CreateProduct },
  { path: "/companyProducts", component: CompanyProducts },
  { path: "/viewProduct/:id", component: ViewProduct },
  { path: "/viewOrders", component: ViewOrders },
  { path: "/myOrders", component: AllMyOrders },
  { path: "/ourProducts", component: AllProducts },
  { path: "*", component: NotFound },
  { path: "product/:id", component: CheckoutProduct },
];
export { publicRoutes, privateRoutes };
