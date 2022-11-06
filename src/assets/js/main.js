import AsyncAlpine from 'async-alpine';
import Alpine from 'alpinejs';

AsyncAlpine.init(Alpine)

AsyncAlpine.data('code', () => import('./components/code.js'))

AsyncAlpine.start()
Alpine.start()
