import './styles/main.scss';
import router from './modules/router';

// localStorage.clear()
window.Storage = localStorage;
console.log(Storage);

router.resolve();