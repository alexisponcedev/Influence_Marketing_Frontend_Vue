<template>
    <menu-container :sections="sections" :menu="menu" @submit="updateMenu" />
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
    lang: string | null = null;

    sections: Array<{
        title: string;
        value: string;
        type: string;
    }> = [];

    mounted() {
        this.setLanguage();
        this.updateMenuSections();
        this.getMenu();
    }

    setLanguage() {
        if (!Api.Auth.languages.length) Api.Auth.getBrandLanguages();
        if (this.$route.query.lang)
            this.lang = this.$route.query.lang as string;
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
                    {
                        title: "Texts",
                        value: "texts",
                        type: "texts",
                    },
                ];
                break;
        }
    }

    async updateMenu() {
        if (this.menu.id)
            if (this.isDefaultLanguage)
                await Api.Menu.update({
                    id: +this.menu.id,
                    Menu: this.menu,
                });
            else if (this.lang)
                Api.Menu.addTranslation({
                    id: +this.menu.id,
                    language: this.lang,
                    widgets: this.menu.widgets!,
                });
    }

    async getMenu() {
        await Api.Menu.getAll();
        const selectedMenu = Api.Menu.all.find(
            (menu) => menu.title == this.$route.params.menuTitle
        );
        if (selectedMenu) {
            const langMenu: any =
                selectedMenu.translations?.find(
                    (translation) => translation.language == this.lang
                )?.body || null;
            selectedMenu.widgets =
                langMenu?.widgets || selectedMenu.widgets || [];
            this.menu = selectedMenu;
        } else
            Api.Menu.create({
                title: this.$route.params.menuTitle,
                widgets: [],
            }).then(this.getMenu);
    }

    get isDefaultLanguage() {
        if (!this.lang) return true;
        const defaultLangSlug = Api.Auth.languages.find(
            (language: any) => language.pivot.primary == 1
        )?.slug;
        if (this.lang == defaultLangSlug) return true;
        return false;
    }
}
</script>
