export const routes: Routes = {
  index: {
    title: "home.title",
    slug: {
      en: "/",
      es: "/",
    },
  },
  about: {
    title: "about.title",
    slug: {
      en: "/about",
      es: "/acerca",
    },
  },
};

interface Routes {
  [key: string]: {
    title: string;
    slug: {
      [locale: string]: string;
    };
  };
}
