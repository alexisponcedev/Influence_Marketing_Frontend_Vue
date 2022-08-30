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
      <v-btn
        small
        class="mx-1"
        v-if="config.globalActions && config.globalActions.length == 1"
        :color="config.globalActions[0].color"
        @click="
          config.globalActions[0].action
            ? $emit(config.globalActions[0].action)
            : undefined
        "
        :to="config.globalActions[0].to"
      >
        <v-icon v-if="config.globalActions[0].icon" left>
          {{ config.globalActions[0].icon }}
        </v-icon>
        {{ config.globalActions[0].text }}
      </v-btn>
    </v-card-title>
    <v-container>
      <v-row>
        <template v-if="loading">
          <v-col v-for="index in 4" :key="index" cols="12" lg="3" md="4" sm="6">
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
                  config.grid.image && typeof config.grid.image === 'function'
                    ? config.grid.image(item)
                    : getProperty(item, config.grid.image)
                "
                :src="
                  typeof config.grid.image === 'function'
                    ? config.grid.image(item)
                    : getProperty(item, config.grid.image)
                "
              />
              <v-card-title v-if="config.grid.title">
                {{
                  typeof config.grid.title === "function"
                    ? config.grid.title(item)
                    : getProperty(item, config.grid.title)
                }}
              </v-card-title>
              <v-card-subtitle v-if="config.grid.subtitle">
                {{
                  typeof config.grid.subtitle === "function"
                    ? config.grid.subtitle(item)
                    : getProperty(item, config.grid.subtitle)
                }}
              </v-card-subtitle>
              <v-card-text v-if="config.grid.chips">
                <v-chip
                  v-for="(chip, index) in config.grid.chips"
                  :key="index"
                  class="mr-1"
                  small
                >
                  {{
                    typeof chip === "function"
                      ? chip(item)
                      : getProperty(item, chip)
                  }}
                </v-chip>
              </v-card-text>

              <v-card-actions v-if="config.actions">
                <v-spacer />
                <template
                  v-for="(action, actionIndex) in config.actions"
                  @click="null"
                >
                  <v-btn
                    v-if="action.to"
                    :icon="!action.text"
                    :text="!!action.text"
                    :outlined="!!action.text"
                    :to="getActionTo(action.to, item)"
                    :key="'1-' + itemIndex + '-' + actionIndex"
                  >
                    <v-icon small>
                      {{ action.icon }}
                    </v-icon>
                    {{ action.text }}
                  </v-btn>
                  <v-btn
                    v-else
                    :icon="!action.text"
                    :text="!!action.text"
                    :outlined="!!action.text"
                    @click.stop="action.onClick(item)"
                    :key="'2-' + itemIndex + '-' + actionIndex"
                  >
                    <v-icon small>
                      {{ action.icon }}
                    </v-icon>
                    {{ action.text }}
                  </v-btn>
                </template>
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
  @Prop(Object) readonly config!: {
    globalActions?: Array<{
      text?: string;
      color?: string;
      action?: string;
    }>;
    actions?: Array<{
      type?: string;
      text?: string;
      icon?: string;
      to?: string;
    }>;
    grid?: {
      image: string | ((item: any) => string);
      title: string | ((item: any) => string);
      subtitle?: string | ((item: any) => string);
      chips?: Array<string | ((item: any) => string)>;
    };
  };

  searchQuery = "";

  getActionTo(to?: string, item?: any) {
    if (!to) return undefined;
    const myRegexp = new RegExp(/\[(.*?)\]/, "g");
    let match = myRegexp.exec(to);
    let result = to;
    while (match != null) {
      result = result.replaceAll(match[0], (item as IIndexable)[match[1]]);
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
