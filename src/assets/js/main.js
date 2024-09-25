import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';

Alpine.plugin(AsyncAlpine)
Alpine.asyncData('code', () => import('./components/code.js'))
Alpine.start()
