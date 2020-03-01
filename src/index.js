import './styles/main.scss';
import router from './modules/router';

window.Storage = localStorage;
const images = importAll(require.context('./assets/', false, /\.(png|jpe?g|svg|gif)$/));

function importAll(r) {
    return r.keys().map(r);
}

router.resolve();