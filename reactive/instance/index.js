import { observe } from "../observer/Observer.js";
import { stateMixin } from "./state.js";

function Vue(options) {
    this._isVue = true;
    this.data = options.data;
    observe(this.data);
}

stateMixin(Vue);

export default Vue;
