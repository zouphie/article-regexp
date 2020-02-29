import Navigo from 'navigo';

import HomePage from '../partials/pages/home';
import NotFoundPage from '../partials/pages/notfound';
import SearchPage from '../partials/pages/search';
import RegexPage from '../partials/pages/regex';

const navigoRoot = window.location.origin;
const router = new Navigo(navigoRoot, true);
const root = document.querySelector('#app');

router.notFound(() => {
    const notFound = new NotFoundPage(root);
    notFound.render();
});

router
  .on(
    {
      '/': function () {
        const home = new HomePage(root);
        home.render();
      },
      'search': function () {
        const search = new SearchPage(root);
        search.render();
      },
      'regex': function () {
        const regex = new RegexPage(root);
        regex.render();
      },
      'not-there': function () {
        const notFound = new NotFoundPage(root);
        notFound.render();
      },
    },
  );

export default router;