<template>
    <button
        class="menu-item tw-transition tw-duration-300"
        :class="{ 'is-active': isActive ? isActive(): null }"
        @click="action"
        :title="title"
    >
        <v-icon v-if="icon.startsWith('mdi')" class="tw-text-red-500">{{ icon }}</v-icon>
        <span class="tw-text-gray-500" v-else>{{ icon }}</span>
        <!--    <svg class="remix">-->
        <!--      <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />-->
        <!--    </svg>-->
    </button>
</template>

<script>
// import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'

export default {
    props: {
        icon: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        action: {
            type: Function,
            required: true,
        },

        isActive: {
            type: Function,
            default: null,
        },
    },

    data() {
        return {
            // remixiconUrl,
        }
    },
}
</script>

<style lang="scss">
.menu-item {
    min-width: 1.75rem;
    height: 1.75rem;
    color: #0D0D0D;
    border: none;
    background-color: transparent;
    //border-radius: 0.4rem;
    padding: 0.25rem;
    margin-right: 0.25rem;


    svg {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }

    &.is-active,
    &:hover {
        //color: #FFF;
        //background-color: #0D0D0D;
        border-bottom: 2px solid #af4646;
    }
}
</style>
