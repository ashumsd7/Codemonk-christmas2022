import { lazy } from "react";

export const DefaultRoute = "/home";

/**
 * By default all routes are protected and have 'default' layout.
 * If a route doesn't requires auth, provide public: true
 * If a route requires blank layout, provide layout: 'blank'
 */
export const pageRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../pages/auth/Login")),
    public: true,
  },
  {
    path: "/home",
    public: true,
    component: lazy(() => import("../pages/main/Index")),
  },
  {
    path: "/wishlist",
    public: true,
    component: lazy(() => import("../pages/List/AllWishList")),
  },

  {
    path: "/update-mywish/",
    public: true,
    component: lazy(() => import("../pages/List/UpdateMyWish")),
  },

];
