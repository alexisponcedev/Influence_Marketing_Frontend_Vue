import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({
    name: "appLockPageStore",
    stateFactory: true,
    namespaced: true,
})
export default class appLockPageStore extends VuexModule {
    status: Boolean = false;

    @Mutation
    setStatus(status: Boolean) {
        this.status = status;
    }

    @Action
    start() {
        console.log("LOCK PAGE STORE START");
        this.setStatus(true);
        this.tick();
    }

    @Action
    stop() {
        console.log("LOCK PAGE STORE STOP");
        this.setStatus(false);
    }

    @Action
    tick() {
        console.log("tick");
        if (this.status) setTimeout(this.tick, 1000); //, 30000);
    }
}
