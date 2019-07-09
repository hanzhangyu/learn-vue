import Watcher from './observer/Watcher.js';
import Observer from './observer/Observer.js';

const data = {a: 1};
new Observer(data);
let watcher = null;

const $view = document.getElementById('view');
document.getElementById('input').addEventListener('input', (e) => {
    data.a = e.target.value;
});

document.getElementById('watch').addEventListener('click', () => {
    watcher = new Watcher(data, 'a', (val, oldVal) => {
        console.log(`received changes ${oldVal} to ${val}`);
        $view.innerText = JSON.stringify(data);
    });
});
document.getElementById('unwatch').addEventListener('click', () => {
    watcher && watcher.teardown();
});

window.data = data;
$view.innerText = JSON.stringify(data);