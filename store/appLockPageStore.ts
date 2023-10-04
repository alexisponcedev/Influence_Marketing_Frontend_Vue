import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Api } from ".";

@Module({
    name: "appLockPageStore",
    stateFactory: true,
    namespaced: true,
})
export default class appLockPageStore extends VuexModule {
    active: Boolean = false;
    _timerStatus: Boolean = false;
    lockedPage: any = null;

    @Mutation
    setStatus(status: Boolean) {
        this.active = status;
    }

    @Mutation
    setTimerStatus(status: Boolean) {
        this._timerStatus = status;
    }

    @Mutation
    setLockedPage(page: any) {
        this.lockedPage = page;
    }

    @Action
    start() {
        this.setStatus(true);
        this.setupTimer();
    }

    @Action
    stop() {
        this.setStatus(false);
    }

    @Action
    async setupTimer() {
        if (this.active)
            if (!this._timerStatus) {
                this.tick();
                this.setTimerStatus(true);
                await new Promise((resolve) => setTimeout(resolve, 30000));
                this.setTimerStatus(false);
                this.setupTimer();
            }
    }

    @Action
    async tick() {
        const response = await Api.Page.getLockStatus(this.lockedPage.id);
        if (response.locked_by !== this.userId) this.goBack();
    }

    get userId() {
        let profile = JSON.parse(localStorage.getItem("profile")!.toString());
        return Number(profile ? profile.user_id : 0);
    }

    @Action
    goBack() {
        if (this.lockedPage?.post?.type == "blog")
            window.location.href =
                "/posts/edit/" + this.lockedPage?.post?.id ||
                "/page/edit/" + this.lockedPage.id;
        else if (this.lockedPage?.post?.type == "news")
            window.location.href =
                "/news/edit/" + this.lockedPage?.post?.id ||
                "/page/edit/" + this.lockedPage.id;
        else window.location.href = "/page/edit/" + this.lockedPage.id;
    }
}
