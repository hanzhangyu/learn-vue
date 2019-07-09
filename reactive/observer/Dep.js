let id = 0;

export default class Dep {
    constructor() {
        this.id = id++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
        if (window.target) {
            window.target.addDep(this);
        }
    }

    removeSub(sub) {
        const index = this.subs.indexOf(sub);
        if (~index) this.subs.splice(index, 1);
    }

    notify() {
        this.subs.forEach(sub => sub.update());
    }
}
