// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Csc477 Asgn5",

  // The pages and sections in the sidebar.
  pages: [
    {name: "WWII Casualties", path: "/ww2"}
  ],

  // Content to add to the head of the page: favicon + the two fonts the chart uses.
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">'
      + '<link rel="preconnect" href="https://fonts.googleapis.com">'
      + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;0,800;1,400&family=IBM+Plex+Sans:wght@400;500;600&display=swap">',

  // REQUIRED for GitHub Pages project sites served at
  // https://<username>.github.io/<repo>/  — must match your repo name EXACTLY
  // (case-sensitive), with leading and trailing slashes. Remove this line when
  // running `npm run dev` locally if the dev server 404s, then restore for deploy.
  base: "/CSC477-ASGN5/",

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};