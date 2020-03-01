import './styles/main.scss';
import router from './modules/router';

// localStorage.clear();
window.Storage = localStorage;
console.log(Storage)
const images = importAll(require.context('./assets/', false, /\.(png|jpe?g|svg|gif)$/));

function importAll(r) {
    return r.keys().map(r);
}

router.resolve();