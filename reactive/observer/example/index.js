import Watcher from "../Watcher.js";
import Observer from "../Observer.js";

const data = {
    a: {
        a: {
            a: [1],
            b: [1]
        }
    }
};
new Observer(data);
let watcher = null;

const $view = document.getElementById("view");
document.getElementById("input").addEventListener("input", e => {
    // data.a.a.a = [e.target.value];
    data.a.a.b.push(e.target.value);
});

document.getElementById("watch").addEventListener("click", () => {
    watcher = new Watcher(
        data,
        "a",
        (val, oldVal) => {
            console.log(`received changes ${oldVal} to ${val}`);
            $view.innerText = JSON.stringify(data);
        },
        { deep: true }
    );
});
document.getElementById("unwatch").addEventListener("click", () => {
    watcher && watcher.teardown();
});

window.data = data;
$view.innerText = JSON.stringify(data);
