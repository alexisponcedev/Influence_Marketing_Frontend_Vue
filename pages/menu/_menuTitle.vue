<template>
    <menu-container :sections="sections" :menu="menu" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { MenuResource } from "@/repositories";
import { Api } from "@/store";

@Component({
    layout: "panel",
})
export default class Menus extends Vue {
    menu: MenuResource = {};

    sections: Array<{
        title: string;
        value: string;
        type: string;
    }> = [];

    mounted() {
        this.updateMenuSections();
        this.getMenu();
    }

    updateMenuSections() {
        switch (this.$route.params.menuTitle) {
            case "header-menu":
                this.sections = [
                    {
                        title: "Center Options",
                        value: "center",
                        type: "links-menu-products",
                    },
                    {
                        title: "Right Options",
                        value: "right",
                        type: "links-menu-products",
                    },
                    {
                        title: "Hamburger Menu",
                        value: "hamburger",
                        type: "links",
                    },
                    {
                        title: "Logo",
                        value: "logo",
                        type: "links-single",
                    },
                ];
                break;
            case "footer-menu":
                this.sections = [
                    {
                        title: "Main Options",
                        value: "main",
                        type: "links-menu",
                    },
                    {
                        title: "Socials",
                        value: "socials",
                        type: "socials",
                    },
                    {
                        title: "Links",
                        value: "links",
                        type: "links",
                    },
                ];
                break;
        }
    }

    async getMenu() {
        await Api.Menu.getAll();
        const finded = Api.Menu.all.filter(
            (menu) => menu.title == this.$route.params.menuTitle
        );
        if (finded && finded.length) this.menu = finded[0];
        else
            Api.Menu.create({
                title: this.$route.params.menuTitle,
                widgets: [],
            }).then(this.getMenu);
    }
}
</script>
