/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard" // name that appear in Sidebar
  },
  {
    icon: "PagesIcon",
    name: "Stok",
    routes: [
      {
        path: "/app/hizmet_ve_urunler",
        name: "Hizmet ve Ürünler"
      }
    ]
  }
];

export default routes;
