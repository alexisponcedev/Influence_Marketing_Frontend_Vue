<template>
    <div>
        <v-card-title>
            <v-text-field
                v-if="search"
                single-line
                hide-details
                label="Search"
                v-model="searchQuery"
                append-icon="mdi-magnify"
            />
            <v-spacer />
            <v-spacer />
            <v-btn
                v-if="!gridOnly"
                small
                outlined
                class="mx-1"
                color="secondary"
                @click="showListView()"
            >
                <v-icon left v-html="'mdi-format-list-bulleted'" />
                List View
            </v-btn>
            <v-menu
                v-for="(globalAction, index) in config.globalActions"
                :key="index"
                offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        small
                        v-on="on"
                        class="mx-1"
                        v-bind="attrs"
                        :to="globalAction.to"
                        :color="globalAction.color"
                        :class="globalAction.class"
                        @click="
                            !(
                                globalAction.childs &&
                                globalAction.childs.length
                            ) && globalAction.action
                                ? $emit(
                                      globalAction.action,
                                      globalAction.payload
                                  )
                                : undefined
                        "
                    >
                        <v-icon
                            v-if="
                                globalAction.childs &&
                                globalAction.childs.length
                            "
                            left
                        >
                            mdi-chevron-down
                        </v-icon>
                        <v-icon
                            v-else-if="globalAction.icon"
                            :left="!!globalAction.text"
                        >
                            {{ globalAction.icon }}
                        </v-icon>
                        {{ globalAction.text }}
                    </v-btn>
                </template>
                <v-list
                    dense
                    v-if="globalAction.childs && globalAction.childs.length"
                >
                    <v-list-item
                        v-for="(child, index) in globalAction.childs"
                        style="cursor: pointer"
                        :key="index"
                    >
                        <v-list-item-icon v-if="child.icon" class="mr-2">
                            <v-icon small v-text="child.icon" />
                        </v-list-item-icon>
                        <v-list-item-content
                            @click="
                                child.to
                                    ? $router.push(child.to)
                                    : child.action
                                    ? $emit(child.action, child.payload)
                                    : undefined
                            "
                        >
                            <v-list-item-title>
                                {{ child.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-container>
            <v-row>
                <template v-if="loading">
                    <v-col
                        v-for="index in 4"
                        :key="index"
                        cols="12"
                        lg="3"
                        md="4"
                        sm="6"
                    >
                        <v-skeleton-loader type="card" />
                    </v-col>
                </template>
                <template v-else-if="config.grid">
                    <v-col
                        v-for="(item, itemIndex) in filteredItems"
                        :key="itemIndex"
                        cols="12"
                        lg="3"
                        md="4"
                        sm="6"
                    >
                        <v-card outlined @click="clickRow(item)">
                            <v-img
                                height="200"
                                v-if="
                                    config.grid.image &&
                                    (typeof config.grid.image === 'function'
                                        ? config.grid.image(item)
                                        : getProperty(item, config.grid.image))
                                "
                                :src="
                                    typeof config.grid.image === 'function'
                                        ? config.grid.image(item)
                                        : getProperty(item, config.grid.image)
                                "
                            />
                            <v-card-title
                                v-if="config.grid.title"
                                :class="{
                                    'text-h4': gridCenter,
                                    'font-weight-bold': gridCenter,
                                    'justify-content-center': gridCenter,
                                }"
                            >
                                {{
                                    typeof config.grid.title === "function"
                                        ? config.grid.title(item)
                                        : getProperty(item, config.grid.title)
                                }}
                            </v-card-title>
                            <v-card-subtitle
                                :class="{
                                    'text-center': gridCenter,
                                    ' pt-2 pb-0': gridCenter,
                                }"
                                v-if="config.grid.subtitle"
                            >
                                {{
                                    typeof config.grid.subtitle === "function"
                                        ? config.grid.subtitle(item)
                                        : getProperty(
                                              item,
                                              config.grid.subtitle
                                          )
                                }}
                            </v-card-subtitle>
                            <v-card-text
                                :class="{
                                    'text-center': gridCenter,
                                }"
                                v-if="config.grid.chips"
                            >
                                <v-chip
                                    v-for="(chip, index) in typeof config.grid
                                        .chips === 'function'
                                        ? config.grid.chips(item)
                                        : getProperty(item, config.grid.chips)"
                                    :key="index"
                                    class="mr-1 mb-1"
                                    small
                                >
                                    {{ chip }}
                                </v-chip>
                            </v-card-text>

                            <v-card-actions
                                :class="{
                                    'flex-flow-column': gridCenter,
                                }"
                                v-if="config.actions"
                            >
                                <v-spacer />
                                <template
                                    v-for="(
                                        action, actionIndex
                                    ) in config.actions"
                                    @click="null"
                                >
                                    <v-btn
                                        v-if="action.to"
                                        class="ma-1"
                                        :icon="!action.text"
                                        :text="!!action.text"
                                        :small="!!action.text"
                                        :outlined="!!action.text"
                                        :to="getActionTo(action.to, item)"
                                        :key="
                                            '1-' + itemIndex + '-' + actionIndex
                                        "
                                    >
                                        <v-icon
                                            :small="!!action.text"
                                            :left="!!action.text"
                                        >
                                            {{ action.icon }}
                                        </v-icon>
                                        {{ action.text }}
                                    </v-btn>
                                    <v-btn
                                        v-else
                                        class="ma-1"
                                        target="_blank"
                                        :icon="!action.text"
                                        :text="!!action.text"
                                        :small="!!action.text"
                                        :outlined="!!action.text"
                                        :key="
                                            '2-' + itemIndex + '-' + actionIndex
                                        "
                                        @click.stop="
                                            action.onClick
                                                ? action.onClick(item)
                                                : null
                                        "
                                        :href="
                                            action.href
                                                ? getProperty(item, action.href)
                                                : null
                                        "
                                    >
                                        <v-icon
                                            :small="!!action.text"
                                            :left="!!action.text"
                                        >
                                            {{ action.icon }}
                                        </v-icon>
                                        {{ action.text }}
                                    </v-btn>
                                </template>
                                <v-spacer v-if="gridCenter" />
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { IIndexable } from "@/utils/IIndexable";

@Component
export default class StandardTable extends Vue {
    @Prop({ default: true }) readonly search!: Boolean;
    @Prop(Array) readonly items!: Array<Object>;
    @Prop(Boolean) readonly gridOnly!: Boolean;
    @Prop(Boolean) readonly loading!: Boolean;
    @Prop(Boolean) readonly gridCenter!: Boolean;
    @Prop(Object) readonly config!: {
        globalActions?: Array<{
            to?: string;
            text?: string;
            icon?: string;
            payload?: any;
            class?: string;
            color?: string;
            action?: string;
            childs?: Array<{
                to?: string;
                text?: string;
                icon?: string;
                payload?: any;
                action?: string;
            }>;
        }>;
        actions?: Array<{
            type?: string;
            text?: string;
            icon?: string;
            href?: string;
            onClick: any;
            to?: string;
        }>;
        grid?: {
            image: string | ((item: any) => string);
            title: string | ((item: any) => string);
            subtitle?: string | ((item: any) => string);
            chips?: string | ((item: any) => Array<string>);
        };
    };

    searchQuery = "";

    getActionTo(to?: string, item?: any) {
        if (!to) return undefined;
        const myRegexp = new RegExp(/\[(.*?)\]/, "g");
        let match = myRegexp.exec(to);
        let result = to;
        while (match != null) {
            result = result.replaceAll(
                match[0],
                (item as IIndexable)[match[1]]
            );
            match = myRegexp.exec(to);
        }
        return result;
    }

    getProperty(object: Object, path: String) {
        var parts = path.split("."),
            length = parts.length,
            i,
            property = object || this;

        for (i = 0; i < length; i++) {
            if ((property as IIndexable)[parts[i]] == undefined)
                if (i != length - 1) (property as IIndexable)[parts[i]] = {};
            property = (property as IIndexable)[parts[i]];
        }

        return property;
    }

    get filteredItems() {
        return this.items.filter(
            (item) =>
                !this.searchQuery ||
                !this.searchQuery.length ||
                JSON.stringify(item)
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
        );
    }

    @Emit("click:row")
    clickRow(event: any) {
        return event;
    }

    @Emit("showListView")
    showListView() {}
}
</script>
