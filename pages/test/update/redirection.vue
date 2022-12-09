<template>
    <v-container>
        <div class="tw-mb-2 tw-flex tw-items-center tw-space-x-2">
            <div>Insert Redirects</div>
            <button @click="start"
                    :disabled="loading"
                    class="tw-bg-green-400 tw-px-2 tw-py-1 tw-rounded-lg">
                Start the process
            </button>
        </div>

        <ul class="list-unstyled tw-pl-0 tw-space-y-2 tw-grid tw-grid-cols-1 tw-gap-2">
            <li v-for="(redirect , index ) in redirects"
                class="tw-flex tw-items-center tw-space-x-2 tw-bg-gray-50 tw-rounded-lg tw-px-2 tw-py-1">
                <div class="tw-w-10 tw-text-center">{{ index + 1 }}</div>
                <div class="tw-flex-1">

                    <a target="_blank" :href="`${website}/${redirect.source_url}`"
                       class="tw-line-clamp-1 hover:tw-text-blue-500">
                        {{ redirect.source_url }}
                    </a>
                    <div class="tw-text-xs tw-text-gray-500 tw-line-clamp-1">{{ redirect.redirect_url }}</div>
                </div>
                <div class="tw-w-20 tw-text-right" :class="{
                    'tw-text-red-500' : redirect.status === 'queued' ,
                    'tw-text-blue-500' : redirect.status === 'in progress' ,
                    'tw-text-red-500' : redirect.status === 'error' ,
                    'tw-text-green-500' : redirect.status === 'done' ,
                    }">
                    {{ redirect.status }}
                </div>
            </li>
        </ul>
    </v-container>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";
import {Api} from "@/store";
import {Page} from "~/repositories";
import {StructureType} from "~/models/StructureType";

@Component
export default class Index extends Vue {
    Api = Api;

    redirects: any[] = [
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 992,
            source_url: "/televisions/32a45gv-32-hisense-a4-series-4k-uhd-vidaa-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/32A45GV_32-hisense-a4-series-4k-uhd-vidaa-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 993,
            source_url: "/televisions/75u8h-hisense-75-mini-led-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/75U8H_hisense-75-mini-led-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 994,
            source_url: "/televisions/65a6gv-65-hisense-a6-series-4k-uhd-vidaa-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65A6GV_65-hisense-a6-series-4k-uhd-vidaa-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 995,
            source_url: "/televisions/43a6gv-43-hisense-a6-series-4k-uhd-vidaa-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43A6GV_43-hisense-a6-series-4k-uhd-vidaa-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 996,
            source_url: "/televisions/40a4gv-40-hisense-a4-series-full-hd-vidaa-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/40A4GV_40-hisense-a4-series-4k-uhd-vidaa-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 997,
            source_url: "/televisions/55a6gv-55-hisense-a6-series-4k-uhd-vidaa-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55A6GV_55-hisense-a6-series-4k-uhd-vidaa-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 999,
            source_url: "/televisions/50a6gv-50-hisense-a6-series-4k-uhd-vidaa-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50A6GV_50-hisense-a6-series-4k-uhd-vidaa-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1000,
            source_url: "/televisions/55u8h-hisense-55-mini-led-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55U8H_hisense-55-mini-led-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1001,
            source_url: "/televisions/65u8h-hisense-65-mini-led-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65U8H_hisense-65-mini-led-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1002,
            source_url: "/televisions/85u7h-hisense-85-4k-quantum-uled-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/85U7H_hisense-85-4k-quantum-uled-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1003,
            source_url: "/televisions/75u7h-hisense-75-4k-quantum-uled-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/75U7H_hisense-75-4k-quantum-uled-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1004,
            source_url: "/televisions/65u7h-hisense-65-4k-quantum-uled-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65U7H_hisense-65-4k-quantum-uled-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1005,
            source_url: "/televisions/100l5g-dlt100b-100-4k-smart-laser-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/100L5G-DLT100B_100-4k-smart-laser-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1006,
            source_url: "/televisions/55u7h-hisense-55-4k-quantum-uled-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55U7H_hisense-55-4k-quantum-uled-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1008,
            source_url: "/televisions/40a45h-hisense-40-inch-a4-series-led-4k-uhd-smart-android-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/40A45H_hisense-40-class-a4-series-led-4k-uhd-smart-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1009,
            source_url: "/televisions/50a65h-hisense-50-inch-a6-series-led-4k-uhd-smart-google-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50A65H_hisense-50-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1010,
            source_url: "/televisions/55a65h-hisense-55-inch-a6-series-led-4k-uhd-smart-google-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55A65H_hisense-55-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1011,
            source_url: "/televisions/65a65h-hisense-65-inch-a6-series-led-4k-uhd-smart-google-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65A65H_hisense-65-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1012,
            source_url: "/televisions/43a65h-hisense-43-inch-a6-series-led-4k-uhd-smart-google-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43A65H_hisense-43-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1013,
            source_url: "/televisions/58u6hf-hisense-58-4k-uled-smart-fire-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/58U6HF_hisense-58-4k-uled-smart-fire-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1014,
            source_url: "/televisions/50u6hf-hisense-50-4k-uled-smart-fire-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50U6HF_hisense-50-4k-uled-smart-fire-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1015,
            source_url: "/televisions/75u6h-hisense-75-inch-u6h-series-quantum-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/75U6H_hisense-75-class-u6h-series-quantum-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1016,
            source_url: "/televisions/px1-px1-trichroma-laser-cinema",
            redirect_url: "/tv-and-audio/televisions/all-tvs/PX1_px1-trichroma-laser-cinema"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1017,
            source_url: "/televisions/55u6h-hisense-55-inch-u6h-series-quantum-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55U6H_hisense-55-class-u6h-series-quantum-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1018,
            source_url: "/televisions/50u6h-hisense-50-inch-u6h-series-quantum-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50U6H_hisense-50-class-u6h-series-quantum-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1019,
            source_url: "/televisions/65u6h-hisense-65-inch-u6h-series-quantum-uled-4k-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65U6H_hisense-65-class-u6h-series-quantum-uled-4k-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1020,
            source_url: "/televisions/43a4h-hisense-43-inch-a4-series-led-1080p-smart-android-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43A4H_hisense-43-class-a4-series-led-1080p-smart-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1021,
            source_url: "/televisions/40a4h-hisense-40-inch-a4-series-led-1080p-smart-android-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/40A4H_hisense-40-class-a4-series-led-1080p-smart-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1022,
            source_url: "/televisions/32a4h-hisense-32-inch-a4-series-led-720p-smart-android-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/32A4H_hisense-32-class-a4-series-led-720p-smart-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1023,
            source_url: "/televisions/75a6h-hisense-75-inch-a6-series-led-4k-uhd-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/75A6H_hisense-75-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1024,
            source_url: "/televisions/65a6h-hisense-65-inch-a6-series-led-4k-uhd-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65A6H_hisense-65-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1025,
            source_url: "/televisions/70a6h-hisense-70-inch-a6-series-led-4k-uhd-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/70A6H_hisense-70-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1026,
            source_url: "/televisions/55a6h-hisense-55-inch-a6-series-led-4k-uhd-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55A6H_hisense-55-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1027,
            source_url: "/televisions/100l5g-cine100a-100-4k-smart-laser-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/100L5G-CINE100A_100-4k-smart-laser-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1028,
            source_url: "/televisions/px1-pro-px1-pro-trichroma-laser-cinema",
            redirect_url: "/tv-and-audio/televisions/all-tvs/PX1-PRO_px1-pro-trichroma-laser-cinema"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1029,
            source_url: "/televisions/50a6h-hisense-50-inch-a6-series-led-4k-uhd-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50A6H_hisense-50-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1030,
            source_url: "/televisions/43a6h-hisense-43-inch-a6-series-led-4k-uhd-smart-google-tv-2022",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43A6H_hisense-43-class-a6-series-led-4k-uhd-smart-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1031,
            source_url: "/televisions/120l5g-cine120a-120-4k-smart-laser-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/120L5G-CINE120A_120-4k-smart-laser-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1032,
            source_url: "/televisions/50a6gx-50-hisense-xinch-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50A6GX_50-hisense-xclass-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1033,
            source_url: "/televisions/65r6e4-65-4k-uhd-hisense-roku-tv-2020",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65R6E4_65-4k-uhd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1034,
            source_url: "/televisions/43a6gx-43-hisense-xinch-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43A6GX_43-hisense-xclass-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1035,
            source_url: "/televisions/65r6g-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65R6G_4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1036,
            source_url: "/televisions/55r6g-55-4k-uhd-hisense-roku-tv-2020",
            redirect_url: "/tv-and-audio/televisions/all-tvs/55R6G_55-4k-uhd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1037,
            source_url: "/televisions/32h4g-32-h4-series-hisense-roku-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/32H4G_32-h4-series-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1038,
            source_url: "/televisions/43h4g-43-h4-series-hisense-roku-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43H4G_43-h4-series-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1039,
            source_url: "/televisions/50r6g-50-led-4k-uhd-hisense-smart-roku-tv-2020",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50R6G_50-led-4k-uhd-hisense-smart-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1043,
            source_url: "/televisions/43r6g-43-4k-uhd-hisense-roku-tv-2020",
            redirect_url: "/tv-and-audio/televisions/all-tvs/43R6G_43-4k-uhd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1047,
            source_url: "/home-appliance/refrigerators/hrf209n6cse-hisense-36-inch-21-2-cf-french-door-refrigerator-with-ice-maker",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRF209N6CSE_hisense-36-inch-21-2-cf-french-door-refrigerator-with-ice-maker"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1048,
            source_url: "/home-appliance/refrigerators/lfc050n6awe-5-0-cu-ft-chest-freezer-with-energy-star",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LFC050N6AWE_5-0-cu-ft-chest-freezer-with-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1049,
            source_url: "/home-appliance/refrigerators/lc50d6ewd-5-0-cu-ft-chest-freezer",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LC50D6EWD_5-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1050,
            source_url: "/home-appliance/refrigerators/huf210n6awe-21-2-cu-ft-upright-freezer-white",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HUF210N6AWE_21-2-cu-ft-upright-freezer-white"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1051,
            source_url: "/home-appliance/refrigerators/hrm145n6avd-hisense-14-8-cu-ft-4-door-counter-depth-french-door-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRM145N6AVD_hisense-14-8-cu-ft-4-door-counter-depth-french-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1052,
            source_url: "/home-appliance/refrigerators/lfc070n6awe-7-0-cu-ft-chest-freezer-with-energy-star",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LFC070N6AWE_7-0-cu-ft-chest-freezer-with-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1053,
            source_url: "/home-appliance/refrigerators/huf210n6awd-21-2-cu-ft-upright-freezer-white",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HUF210N6AWD_21-2-cu-ft-upright-freezer-white"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1054,
            source_url: "/home-appliance/refrigerators/hrf254n6dse-hisense-25-4-cu-ft-french-door-refrigrator-with-dual-ice-maker-energy-star",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRF254N6DSE_hisense-25-4-cu-ft-french-door-refrigrator-with-dual-ice-maker-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1055,
            source_url: "/home-appliance/refrigerators/hrq215n6bvd-hisense-21-6-cu-ft-french-door-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRQ215N6BVD_hisense-21-6-cu-ft-french-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1057,
            source_url: "/home-appliance/refrigerators/lct43d6ase-4-4-cu-ft-double-door-apartment-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LCT43D6ASE_4-4-cu-ft-double-door-apartment-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1058,
            source_url: "/home-appliance/refrigerators/hrb171n6abe-hisense-17-1-cu-ft-counter-depth-bottom-freezer-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRB171N6ABE_hisense-17-2-cu-ft-counter-depth-bottom-freezer-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1059,
            source_url: "/home-appliance/refrigerators/hrb171n6ase-hisense-17-1-cu-ft-refrigerator-fingerprint-resistant-stainless-steel",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRB171N6ASE_hisense-17-1-cu-ft-refrigerator-fingerprint-resistant-stainless-steel"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1060,
            source_url: "/home-appliance/refrigerators/hrb171n6awe-hisense-n-17-2-cu-ft-counter-depth-bottom-freezer-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRB171N6AWE_hisense-n-17-2-cu-ft-counter-depth-bottom-freezer-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1061,
            source_url: "/home-appliance/refrigerators/wfc050m6xwd-5-0-cu-ft-chest-freezer",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/WFC050M6XWD_5-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1062,
            source_url: "/home-appliance/refrigerators/rr44d6ase-4-4-cu-ft-freestanding-compact-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/RR44D6ASE_4-4-cu-ft-freestanding-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1063,
            source_url: "/home-appliance/refrigerators/lcr44d6nse-4-4-cu-ft-single-door-compact-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LCR44D6NSE_4-4-cu-ft-single-door-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1064,
            source_url: "/home-appliance/refrigerators/lcr33d6nse-3-3-cu-ft-single-door-compact-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LCR33D6NSE_3-3-cu-ft-single-door-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1065,
            source_url: "/home-appliance/refrigerators/rt32d6ase-3-2-cu-ft-double-door-compact-refrigerator-stainless-steel",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/RT32D6ASE_3-2-cu-ft-double-door-compact-refrigerator-stainless-steel"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1066,
            source_url: "/home-appliance/refrigerators/rt32d6abe-3-2-cu-ft-double-door-compact-refrigerator-black",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/RT32D6ABE_3-2-cu-ft-double-door-compact-refrigerator-black"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1067,
            source_url: "/home-appliance/refrigerators/lct33d6ase-3-3-cu-ft-double-door-compact-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LCT33D6ASE_3-3-cu-ft-double-door-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1069,
            source_url: "/home-appliance/refrigerators/hbc54d6as-140-can-freestanding-stainless-steel-beverage-cooler",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HBC54D6AS_140-can-freestanding-stainless-steel-beverage-cooler"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1070,
            source_url: "/home-appliance/refrigerators/lc70d6ewd-7-0-cu-ft-chest-freezer",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LC70D6EWD_7-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1071,
            source_url: "/home-appliance/refrigerators/rr63d6abe-6-3-cu-ft-single-door-apartment-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/RR63D6ABE_6-3-cu-ft-single-door-apartment-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1072,
            source_url: "/home-appliance/refrigerators/lc87d6ewd-8-7-cu-ft-chest-freezer",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/LC87D6EWD_8-7-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1073,
            source_url: "/home-appliance/refrigerators/rl53d6ase-5-3-cu-ft-single-door-apartment-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/RL53D6ASE_5-3-cu-ft-single-door-apartment-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1074,
            source_url: "/home-appliance/refrigerators/hrt180n6awd-18-cu-ft-hisense-top-mount-series-full-size-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRT180N6AWD_18-cu-ft-hisense-top-mount-series-full-size-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1075,
            source_url: "/home-appliance/refrigerators/hws54029ss-54-bottle-freestanding-or-built-in-stainless-steel-wine-cooler",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HWS54029SS_54-bottle-freestanding-or-built-in-stainless-steel-wine-cooler"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1076,
            source_url: "/home-appliance/refrigerators/hrt180n6avd-hisense-18-cu-ft-top-mount-freezer-refrigerator-silver-with-ice-maker-ready",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRT180N6AVD_hisense-18-cu-ft-top-mount-freezer-refrigerator-silver-with-ice-maker-ready"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1077,
            source_url: "/home-appliance/refrigerators/hrt180n6abd-hisense-18-cu-ft-top-mount-freezer-refrigerator-black-with-ice-maker-ready",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRT180N6ABD_hisense-18-cu-ft-top-mount-freezer-refrigerator-black-with-ice-maker-ready"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1078,
            source_url: "/home-appliance/refrigerators/himt30g01-hisense-top-freezer-refrigerator-ice-maker",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HIMT30G01_hisense-top-freezer-refrigerator-ice-maker"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1079,
            source_url: "/home-appliance/refrigerators/hwd46029ss-46-bottle-freestanding-or-built-in-stainless-steel-wine-cooler",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HWD46029SS_46-bottle-freestanding-or-built-in-stainless-steel-wine-cooler"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1080,
            source_url: "/home-appliance/refrigerators/wms017m6xbe-1-6-cu-ft-compact-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/WMS017M6XBE_1-6-cu-ft-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1081,
            source_url: "/home-appliance/refrigerators/hrq215n6bwd-hisense-21-6-cu-ft-flat-door-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRQ215N6BWD_hisense-21-6-cu-ft-flat-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1082,
            source_url: "/home-appliance/refrigerators/hrf266n6cse1-26-6-cu-ft-french-door-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRF266N6CSE1_26-6-cu-ft-french-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1085,
            source_url: "/home-appliance/dishwashers/hui6220xcus-47-decibel-top-control-24-built-in-dishwasher",
            redirect_url: "/home-appliance/explore-home-appliance/dishwashers/all-dishwashers/HUI6220XCUS_47-decibel-top-control-24-built-in-dishwasher"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1086,
            source_url: "/home-appliance/microwave-ovens/hmvz173ss-1-7-cu-ft-over-the-range-microwave",
            redirect_url: "/home-appliance/explore-home-appliance/over-the-range-microwaves/HMVZ173SS_1-7-cu-ft-over-the-range-microwave"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1087,
            source_url: "/air-products/ap1022tw1gd-hisense-550-sf-dual-hose-inverter-portable-ac",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP1022TW1GD_hisense-550-sf-dual-hose-inverter-portable-ac"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1088,
            source_url: "/air-products/kj120-hisense-desktop-air-purifier-376-sq-ft-coverage",
            redirect_url: "/air-products/explore-air-products/all-air-products/KJ120_hisense-desktop-air-purifier-376-sq-ft-coverage"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1089,
            source_url: "/air-products/dh5022k1w-hisense-35-pint-2-speed-dehumidifier-energy-star",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH5022K1W_hisense-35-pint-2-speed-dehumidifier-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1090,
            source_url: "/air-products/aw0822tw1w-hisense-8000-btu-window-ac-inverter-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW0822TW1W_hisense-8000-btu-window-ac-inverter-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1091,
            source_url: "/air-products/ap0522cr1w-hisense-150-sf-portable-ac-mechanical",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP0522CR1W_hisense-150-sf-portable-ac-mechanical"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1092,
            source_url: "/air-products/ap0722cw1w-hisense-250-sf-portable-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP0722CW1W_hisense-250-sf-portable-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1093,
            source_url: "/air-products/aw1022cw1w-10000-btu-window-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1022CW1W_hisense-10000-btu-window-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1094,
            source_url: "/air-products/ap0822cw1w-hisense-300-sf-portable-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP0822CW1W_hisense-300-sf-portable-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1095,
            source_url: "/air-products/ap1022cw1g-hisense-450-sf-portable-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP1022CW1G_hisense-450-sf-portable-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1096,
            source_url: "/air-products/ap1022hw1gd-hisense-550-sf-portable-ac-with-heat",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP1022HW1GD_hisense-550-sf-portable-ac-with-heat"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1097,
            source_url: "/air-products/aw0822cw1w-hisense-8000-btu-window-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW0822CW1W_hisense-8000-btu-window-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1098,
            source_url: "/air-products/aw0822dr1w-hisense-8000-btu-window-ac-with-heat",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW0822DR1W_hisense-8000-btu-window-ac-with-heat"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1099,
            source_url: "/air-products/aw1222cw1w-hisense-12000-btu-window-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1222CW1W_hisense-12000-btu-window-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1100,
            source_url: "/air-products/aw0821cw1w-hisense-350-sq-ft-window-air-conditioner",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW0821CW1W_hisense-350-sq-ft-window-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1101,
            source_url: "/air-products/aw1221dr3w-hisense-550-sq-ft-3-speed-window-air-conditioners-with-remote-control",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1221DR3W_hisense-550-sq-ft-3-speed-window-air-conditioners-with-remote-control"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1102,
            source_url: "/air-products/ap70020hr1gd-hisense-portable-air-conditioner-gray",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP70020HR1GD_hisense-portable-air-conditioner-gray"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1103,
            source_url: "/air-products/ap1222cw1w-hisense-550-sf-portable-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP1222CW1W_hisense-550-sf-portable-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1104,
            source_url: "/air-products/ht5021kp-hisense-energy-star-50-pint-3-speed-dehumidifier-with-built-in-pump",
            redirect_url: "/air-products/explore-air-products/all-air-products/HT5021KP_hisense-energy-star-50-pint-3-speed-dehumidifier-with-built-in-pump"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1105,
            source_url: "/air-products/ap0621cr1w-hisense-ultra-slim-portable-air-conditioner",
            redirect_url: "/air-products/explore-air-products/all-air-products/AP0621CR1W_hisense-ultra-slim-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1106,
            source_url: "/air-products/dh10020kp1wg-60-pint-capacity-1500-sq-ft-coverage-3-speed-dehumidifier",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH10020KP1WG_60-pint-capacity-1500-sq-ft-coverage-3-speed-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1107,
            source_url: "/air-products/dh3020k1w-25-pint-capacity-1500-sq-ft-coverage-dehumidifier",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH3020K1W_25-pint-capacity-1500-sq-ft-coverage-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1108,
            source_url: "/air-products/dh5020k-35-pint-capacity-1000-sq-ft-coverage-2-speed-dehumidifier",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH5020K_35-pint-capacity-1000-sq-ft-coverage-2-speed-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1109,
            source_url: "/air-products/dh7021kp1g-hisense-energy-star-50-pint-2-speed-dehumidifier",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH7021KP1G_hisense-energy-star-50-pint-2-speed-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1110,
            source_url: "/air-products/dh7021w1wg-hisense-connectlife-smart-control-50-pint-3-speeds-dehumidifier",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH7021W1WG_hisense-connectlife-smart-control-50-pint-3-speeds-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1111,
            source_url: "/air-products/dh7021k1w-hisense-energy-star-50-pint-3-speeds-dehumidifier",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH7021K1W_hisense-energy-star-50-pint-3-speeds-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1112,
            source_url: "/air-products/aw1422cw1w-hisense-14000-btu-window-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1422CW1W_hisense-14000-btu-window-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1113,
            source_url: "/air-products/aw1822cw3w-hisense-18000-btu-window-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1822CW3W_hisense-18000-btu-window-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1114,
            source_url: "/air-products/aw2422cw3w-hisense-24000-btu-window-ac-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW2422CW3W_hisense-24000-btu-window-ac-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1115,
            source_url: "/air-products/aw1022tw1w-hisense-10000-btu-window-ac-inverter-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1022TW1W_hisense-10000-btu-window-ac-inverter-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1116,
            source_url: "/air-products/aw1422tw1w-hisense-14000-btu-window-ac-inverter-wifi",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1422TW1W_hisense-14000-btu-window-ac-inverter-wifi"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1117,
            source_url: "/air-products/aw1822dr3w-hisense-18000-btu-window-with-heat",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW1822DR3W_hisense-18000-btu-window-with-heat"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1118,
            source_url: "/air-products/aw2422dr3w-hisense-24000-btu-window-with-heat",
            redirect_url: "/air-products/explore-air-products/all-air-products/AW2422DR3W_hisense-24000-btu-window-with-heat"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1146,
            source_url: "/televisions/75u9dg-u9dg-dual-cell-android-tv-2021",
            redirect_url: "/tv-and-audio/televisions/all-tvs/75U9DG_u9dg-dual-cell-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1297,
            source_url: "/home-appliance/refrigerators/hbm17158ss-17-1-cu-ft-bottom-freezer-refrigerator",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HBM17158SS_17-1-cu-ft-bottom-freezer-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1313,
            source_url: "/support/template-template-product",
            redirect_url: "/support/models/Template_template-product"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1314,
            source_url: "/support/hmo173sr-over-the-range-microwave",
            redirect_url: "/support/models/HMO173SR_over-the-range-microwave"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1315,
            source_url: "/support/rf20n6ase-20-3-cu-ft-counter-depth-french-door-refrigerator",
            redirect_url: "/support/models/RF20N6ASE_20-3-cu-ft-counter-depth-french-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1316,
            source_url: "/support/hqd20058sv-20-0-cu-ft-4-door-counter-depth-french-door-refrigerator",
            redirect_url: "/support/models/HQD20058SV_20-0-cu-ft-4-door-counter-depth-french-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1317,
            source_url: "/support/lct43d6ave-4-3-cu-ft-freestanding-compact-refrigerator",
            redirect_url: "/support/models/LCT43D6AVE_4-3-cu-ft-freestanding-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1318,
            source_url: "/support/aw0521ck1w-hisense-150-sq-ft-window-air-conditioner",
            redirect_url: "/support/models/AW0521CK1W_hisense-150-sq-ft-window-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1319,
            source_url: "/support/aw0621cr1w-hisense-250-sq-ft-window-air-conditioner",
            redirect_url: "/support/models/AW0621CR1W_hisense-250-sq-ft-window-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1320,
            source_url: "/support/aw0821dr1w-hisense-350-sq-ft-window-air-conditioner-with-heater",
            redirect_url: "/support/models/AW0821DR1W_hisense-350-sq-ft-window-air-conditioner-with-heater"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1321,
            source_url: "/support/haw0821cw1w-hisense-350-sq-ft-smart-control-window-air-conditioner-with-remote",
            redirect_url: "/support/models/HAW0821CW1W_hisense-350-sq-ft-smart-control-window-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1322,
            source_url: "/support/aw1021cw1w-hisense-450-sq-ft-smart-window-air-conditioner",
            redirect_url: "/support/models/AW1021CW1W_hisense-450-sq-ft-smart-window-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1323,
            source_url: "/support/aw1221cw1w-hisense-550-sq-ft-energy-star-window-air-conditioner",
            redirect_url: "/support/models/AW1221CW1W_hisense-550-sq-ft-energy-star-window-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1324,
            source_url: "/support/rr63d6ase-6-3-cu-ft-single-door-refrigerator",
            redirect_url: "/support/models/RR63D6ASE_6-3-cu-ft-single-door-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1325,
            source_url: "/support/aw1521cw1w-hisense-700-sq-ft-smart-window-air-conditioner-with-remote",
            redirect_url: "/support/models/AW1521CW1W_hisense-700-sq-ft-smart-window-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1326,
            source_url: "/support/aw1821cw3w-hisense-1000-sq-ft-smart-window-air-conditioner-with-remote",
            redirect_url: "/support/models/AW1821CW3W_hisense-1000-sq-ft-smart-window-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1327,
            source_url: "/support/aw1821dr3w-hisense-1000-sq-ft-3-speed-window-air-conditioner-with-remote-control",
            redirect_url: "/support/models/AW1821DR3W_hisense-1000-sq-ft-3-speed-window-air-conditioner-with-remote-control"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1328,
            source_url: "/support/aw2421dr3w-hisense-1500-sq-ft-3-speed-window-air-conditioner-with-remote-control",
            redirect_url: "/support/models/AW2421DR3W_hisense-1500-sq-ft-3-speed-window-air-conditioner-with-remote-control"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1329,
            source_url: "/support/hisense-ap1221cr1w-hisense-12000-btu-portable-air-conditioner",
            redirect_url: "/support/models/AP1221CR1W_hisense-12000-btu-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1330,
            source_url: "/support/ap1021cw1g-hisense-10000-btu-connectlife-wifi-portable-air-conditioner",
            redirect_url: "/support/models/AP1021CW1G_hisense-10000-btu-connectlife-wifi-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1331,
            source_url: "/support/lcr27d6nse-2-7-cu-ft-freestanding-compact-refrigerator",
            redirect_url: "/support/models/LCR27D6NSE_2-7-cu-ft-freestanding-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1332,
            source_url: "/support/ap1021tr1gd-hisense-10000-btu-inverter-dual-hose-portable-air-conditioner",
            redirect_url: "/support/models/AP1021TR1GD_hisense-10000-btu-inverter-dual-hose-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1333,
            source_url: "/support/ap1419cw1g-hisense-9500-btu-hismart-with-wi-fi-portable-ac-with-remote",
            redirect_url: "/support/models/AP1419CW1G_hisense-9500-btu-hismart-with-wi-fi-portable-ac-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1334,
            source_url: "/support/lcr27d6nbe-2-7-cu-ft-freestanding-compact-refrigerator",
            redirect_url: "/support/models/LCR27D6NBE_2-7-cu-ft-freestanding-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1335,
            source_url: "/support/ap0921cr1g-hisense-9000-btu-ultra-slim-portable-air-conditioner-with-remote",
            redirect_url: "/support/models/AP0921CR1G_hisense-9000-btu-ultra-slim-portable-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1336,
            source_url: "/support/ap1419cr1g-hisense-8500-btu-portable-air-conditioner-with-remote",
            redirect_url: "/support/models/AP1419CR1G_hisense-8500-btu-portable-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1337,
            source_url: "/support/lcr17d6nbe-1-7-cu-ft-freestanding-compact-refrigerator",
            redirect_url: "/support/models/LCR17D6NBE_1-7-cu-ft-freestanding-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1338,
            source_url: "/support/ap0821cr1w-hisense-8000-btu-portable-air-conditioner-with-remote",
            redirect_url: "/support/models/AP0821CR1W_hisense-8000-btu-portable-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1339,
            source_url: "/support/ap1319hr1g-hisense-7500-btu-portable-air-conditioner-with-heat-pump-and-remote",
            redirect_url: "/support/models/AP1319HR1G_hisense-7500-btu-portable-air-conditioner-with-heat-pump-and-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1340,
            source_url: "/support/rw46n1dsd-46-bottle-freestanding-or-built-in-dual-zone-stainless-steel-wine-cooler",
            redirect_url: "/support/models/RW46N1DSD_46-bottle-freestanding-or-built-in-dual-zone-stainless-steel-wine-cooler"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1341,
            source_url: "/support/fe703-7-0-cu-ft-energy-star-freezer",
            redirect_url: "/support/models/FE703_7-0-cu-ft-energy-star-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1342,
            source_url: "/support/ap1219cr1w-hisense-7500-btu-portable-air-conditioner-with-remote",
            redirect_url: "/support/models/AP1219CR1W_hisense-7500-btu-portable-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1343,
            source_url: "/support/fc72d6bwe-7-2-cu-ft-energy-star-freezer",
            redirect_url: "/support/models/FC72D6BWE_7-2-cu-ft-energy-star-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1344,
            source_url: "/support/ap0721cr1w-hisense-7000-btu-portable-air-conditioner-with-remote",
            redirect_url: "/support/models/AP0721CR1W_hisense-7000-btu-portable-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1345,
            source_url: "/support/ap1019cw1g-hisense-6500-btu-hismart-with-wi-fi-portable-ac-with-remote",
            redirect_url: "/support/models/AP1019CW1G_hisense-6500-btu-hismart-with-wi-fi-portable-ac-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1346,
            source_url: "/support/ap1019cr1g-hisense-6500-btu-ultra-slim-portable-air-conditioner-with-remote",
            redirect_url: "/support/models/AP1019CR1G_hisense-6500-btu-ultra-slim-portable-air-conditioner-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1347,
            source_url: "/support/ap0819cr1w-hisense-5500-btu-ultra-slim-portable-ac-with-remote",
            redirect_url: "/support/models/AP0819CR1W_hisense-5500-btu-ultra-slim-portable-ac-with-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1348,
            source_url: "/support/lcr44d6nve-4-4-cu-ft-freestanding-compact-refrigerator",
            redirect_url: "/support/models/LCR44D6NVE_4-4-cu-ft-freestanding-compact-refrigerator"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1349,
            source_url: "/support/hisense-ap10cr1w-hisense-10k-portable-air-conditioner",
            redirect_url: "/support/models/AP10CR1W_hisense-10k-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1350,
            source_url: "/support/fc50d6awd-5-0-cu-ft-chest-freezer",
            redirect_url: "/support/models/FC50D6AWD_5-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1351,
            source_url: "/support/ap12cr1g-hisense-portable-air-conditioner",
            redirect_url: "/support/models/AP12CR1G_hisense-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1352,
            source_url: "/support/ap14cr1wg-hisense-14k-portable-air-conditioner",
            redirect_url: "/support/models/AP14CR1WG_hisense-14k-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1354,
            source_url: "/support/ap10cw2g-0-hismart-portable-air-conditioner",
            redirect_url: "/support/models/AP10CW2G-0_hismart-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1355,
            source_url: "/support/hrf210n6cbe-21-cu-ft-counter-depth-french-door-refrigerator-with-ice-maker",
            redirect_url: "/support/models/HRF210N6CBE_21-cu-ft-counter-depth-french-door-refrigerator-with-ice-maker"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1356,
            source_url: "/support/100l9g-cine100-100-trichroma-laser-tv-cinema-screen-2021",
            redirect_url: "/support/models/100L9G-CINE100_100-trichroma-laser-tv-cinema-screen"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1357,
            source_url: "/support/ap12cr2g-hisense-portable-air-conditioner-115-volt",
            redirect_url: "/support/models/AP12CR2G_hisense-portable-air-conditioner-115-volt"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1358,
            source_url: "/support/55u8g-55-4k-uled-premium-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/55U8G_55-4k-uled-premium-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1359,
            source_url: "/support/ap14cr2wg-hisense-portable-air-conditioner-115-volt",
            redirect_url: "/support/models/AP14CR2WG_hisense-portable-air-conditioner-115-volt"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1360,
            source_url: "/support/55u7g-55-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/55U7G_55-4k-uled-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1361,
            source_url: "/support/ap13hr1g-hisense-portable-air-conditioner-with-heat-pump-and-remote",
            redirect_url: "/support/models/AP13HR1G_hisense-portable-air-conditioner-with-heat-pump-and-remote"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1362,
            source_url: "/support/fc51d7awd-5-0-cu-ft-chest-freezer",
            redirect_url: "/support/models/FC51D7AWD_5-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1363,
            source_url: "/support/75u7g-75-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/75U7G_75-4k-uled-hisense-android-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1364,
            source_url: "/support/ap13hr2g-hisense-portable-air-conditioner",
            redirect_url: "/support/models/AP13HR2G_hisense-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1365,
            source_url: "/support/75u6g-75-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/75U6G_75-4k-uled-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1366,
            source_url: "/support/fc50dwbaa-5-0-cu-ft-freezer",
            redirect_url: "/support/models/FC50DWBAA_5-0-cu-ft-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1367,
            source_url: "/support/hap55021hr1w-hisense-portable-air-conditioner",
            redirect_url: "/support/models/HAP55021HR1W_hisense-portable-air-conditioner"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1368,
            source_url: "/support/55u6g-55-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/55U6G_55-4k-uled-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1369,
            source_url: "/support/fc70dwbaa-7-0-cu-ft-chest-freezer",
            redirect_url: "/support/models/FC70DWBAA_7-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1370,
            source_url: "/support/50u6g-50-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/50U6G_50-4k-uled-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1371,
            source_url: "/support/ap14dr1g-hisense-portable-air-conditioner-with-heat-pump",
            redirect_url: "/support/models/AP14DR1G_hisense-portable-air-conditioner-with-heat-pump"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1372,
            source_url: "/support/fc50d6ewd-5-0-cu-ft-chest-freezer",
            redirect_url: "/support/models/FC50D6EWD_5-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1373,
            source_url: "/support/dh70k1sle-70-pint-capacity-dehumidifier",
            redirect_url: "/support/models/DH70K1SLE_70-pint-capacity-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1374,
            source_url: "/support/fc70d6ewd-7-0-cu-ft-chest-freezer",
            redirect_url: "/support/models/FC70D6EWD_7-0-cu-ft-chest-freezer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1375,
            source_url: "/support/dh35k1w-35-pint-capacity-dehumidifier",
            redirect_url: "/support/models/DH35K1W_35-pint-capacity-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1376,
            source_url: "/support/65u8g-65-4k-uled-premium-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/65U8G_65-4k-uled-premium-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1377,
            source_url: "/support/dh50kp1wg-50-pint-capacity-dehumidifier",
            redirect_url: "/support/models/DH50KP1WG_50-pint-capacity-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1378,
            source_url: "/support/65u7g-65-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/65U7G_65-4k-uled-hisense-android-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1379,
            source_url: "/support/65u6g-65-4k-uled-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/65U6G_65-4k-uled-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1380,
            source_url: "/support/dh70kp1wg-70-pint-capacity-dehumidifier-with-built-in-pump",
            redirect_url: "/support/models/DH70KP1WG_70-pint-capacity-dehumidifier-with-built-in-pump"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1381,
            source_url: "/support/65r7g5-65-r7g5-series-hisense-roku-tv-2021",
            redirect_url: "/support/models/65R7G5_65-r7g5-series-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1382,
            source_url: "/support/dh70w1wg-0-70-pint-capacity-smart-wi-fi-dehumidifier",
            redirect_url: "/support/models/DH70W1WG-0_70-pint-capacity-smart-wi-fi-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1383,
            source_url: "/support/55r7g5-55-r7g5-series-hisense-roku-tv-2021",
            redirect_url: "/support/models/55R7G5_55-r7g5-series-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1384,
            source_url: "/support/dh3019k1w-30-pint-capacity-700-sq-ft-coverage-single-speed-dehumidifier",
            redirect_url: "/support/models/DH3019K1W_30-pint-capacity-700-sq-ft-coverage-single-speed-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1385,
            source_url: "/support/50r7g5-50-r7g5-series-hisense-roku-tv-2021",
            redirect_url: "/support/models/50R7G5_50-r7g5-series-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1386,
            source_url: "/support/43r7g5-43-r7g5-series-hisense-roku-tv-2021",
            redirect_url: "/support/models/43R7G5_43-r7g5-series-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1387,
            source_url: "/support/65h8g1-65-h8-quantum-series-hisense-android-tv-2021",
            redirect_url: "/support/models/65H8G1_65-h8-quantum-series-hisense-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1388,
            source_url: "/support/55h8g1-55-h8-quantum-series-hisense-android-tv-2021",
            redirect_url: "/support/models/55H8G1_55-h8-quantum-series-hisense-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1389,
            source_url: "/support/dh7020kp-70-pint-capacity-2-speed-dehumidifier-with-built-in-pump",
            redirect_url: "/support/models/DH7020KP_70-pint-capacity-2-speed-dehumidifier-with-built-in-pump"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1390,
            source_url: "/support/50h8g1-50-h8-quantum-series-hisense-android-tv-2021",
            redirect_url: "/support/models/50H8G1_50-h8-quantum-series-hisense-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1391,
            source_url: "/support/dh7019k1g-70-pint-capacity-1000-sq-ft-coverage-2-speed-dehumidifier",
            redirect_url: "/support/models/DH7019K1G_70-pint-capacity-1000-sq-ft-coverage-2-speed-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1392,
            source_url: "/support/55u6gr5-55-4k-uled-roku-tv-2021",
            redirect_url: "/support/models/55U6GR5_55-4k-uled-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1393,
            source_url: "/support/65u6gr5-65-4k-uled-roku-tv-2021",
            redirect_url: "/support/models/65U6GR5_65-4k-uled-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1394,
            source_url: "/support/dh7019w1wg-70-pint-capacity-1000-sq-ft-coverage-2-speed-hismart-dehumidifier",
            redirect_url: "/support/models/DH7019W1WG_70-pint-capacity-1000-sq-ft-coverage-2-speed-hismart-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1395,
            source_url: "/support/100l5f-4k-uhd-hisense-android-smart-laser-tv-with-hdr-2020",
            redirect_url: "/support/models/100L5F_4k-uhd-hisense-android-smart-laser-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1396,
            source_url: "/support/120l5fbdl-4k-uhd-hisense-android-smart-laser-cinema-with-hdr-2021",
            redirect_url: "/support/models/120L5FBDL_4k-uhd-hisense-android-smart-laser-cinema-with-hdr-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1397,
            source_url: "/support/120l10e-4k-uhd-hisense-smart-laser-tv-with-hdr-and-wide-color-gamut-2019",
            redirect_url: "/support/models/120L10E_4k-uhd-hisense-smart-laser-tv-with-hdr-and-wide-color-gamut-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1398,
            source_url: "/support/100l10e-4k-uhd-hisense-smart-laser-tv-with-hdr-and-wide-color-gamut-2019",
            redirect_url: "/support/models/100L10E_4k-uhd-hisense-smart-laser-tv-with-hdr-and-wide-color-gamut-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1399,
            source_url: "/support/dh50k1w-50-pint-2-speed-dehumidifier",
            redirect_url: "/support/models/DH50K1W_50-pint-2-speed-dehumidifier"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1400,
            source_url: "/support/85h6570g-85-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/85H6570G_85-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1401,
            source_url: "/support/75a6g-75-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/75A6G_75-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1402,
            source_url: "/support/75u9f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/75U9F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1403,
            source_url: "/support/75h8g-75-quantum-4k-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/75H8G_75-quantum-4k-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1404,
            source_url: "/support/75r7070e2-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/75R7070E2_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1405,
            source_url: "/support/60a6g-60-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/60A6G_60-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1406,
            source_url: "/support/75r7f-roku-4k-tv-missing-bulk-imagesfilesretailers-2019",
            redirect_url: "/support/models/75R7F_roku-4k-tv-missing-bulk-imagesfilesretailers-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1407,
            source_url: "/support/50a6g-50-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/50A6G_50-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1408,
            source_url: "/support/75r6e3-75-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/75R6E3_75-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1409,
            source_url: "/support/75h6570g-75-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/75H6570G_75-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1410,
            source_url: "/support/75r6e1-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/75R6E1_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1411,
            source_url: "/support/70r6290f-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/70R6290F_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1412,
            source_url: "/support/70r6270f-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/70R6270F_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1413,
            source_url: "/support/70h6570g-70-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/70H6570G_70-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1414,
            source_url: "/support/70a6g-70-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/70A6G_70-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1415,
            source_url: "/support/65u9f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/65U9F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1416,
            source_url: "/support/65h9g-65-quantum-4k-premium-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/65H9G_65-quantum-4k-premium-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1417,
            source_url: "/support/65h9f-4k-premium-uled-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/65H9F_4k-premium-uled-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1418,
            source_url: "/support/65h8g-65-quantum-4k-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/65H8G_65-quantum-4k-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1419,
            source_url: "/support/65h8f-4k-uled-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/65H8F_4k-uled-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1420,
            source_url: "/support/65r8f-4k-uled-hisense-roku-smart-tv-2019",
            redirect_url: "/support/models/65R8F_4k-uled-hisense-roku-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1421,
            source_url: "/support/65r8f5-65-4k-uled-hisense-roku-smart-tv-2020",
            redirect_url: "/support/models/65R8F5_65-4k-uled-hisense-roku-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1422,
            source_url: "/support/55r8f5-55-4k-uled-hisense-roku-smart-tv-2020",
            redirect_url: "/support/models/55R8F5_55-4k-uled-hisense-roku-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1423,
            source_url: "/support/65r7050e1-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/65R7050E1_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1424,
            source_url: "/support/65r7f-roku-4k-hisense-tv-2019",
            redirect_url: "/support/models/65R7F_roku-4k-hisense-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1425,
            source_url: "/support/65r7e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/65R7E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1426,
            source_url: "/support/65a6g-65-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/65A6G_65-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1427,
            source_url: "/support/65h6570g-65-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/65H6570G_65-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1428,
            source_url: "/support/65h6570f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/65H6570F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1429,
            source_url: "/support/65h6590f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/65H6590F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1430,
            source_url: "/support/65r6e3-65-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/65R6E3_65-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1431,
            source_url: "/support/65r6095g5-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/65R6095G5_4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1432,
            source_url: "/support/65r6090g5-65-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/65R6090G5_65-4k-uhd-hisense-roku-tv-with-hdr"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1433,
            source_url: "/support/65r6090g-65-4k-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/65R6090G_65-4k-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1434,
            source_url: "/support/65r6e1-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/65R6E1_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1435,
            source_url: "/support/65r6e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/65R6E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1436,
            source_url: "/support/60r6e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/60R6E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1437,
            source_url: "/support/58r6e3-58-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/58R6E3_58-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1438,
            source_url: "/support/58h6550e-4k-uhd-hisense-android-smart-tv-2018",
            redirect_url: "/support/models/58H6550E_4k-uhd-hisense-android-smart-tv-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1439,
            source_url: "/support/55h9g-55-quantum-4k-premium-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/55H9G_55-quantum-4k-premium-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1440,
            source_url: "/support/55h9f-4k-premium-uled-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/55H9F_4k-premium-uled-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1441,
            source_url: "/support/55h8g-55-quantum-4k-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/55H8G_55-quantum-4k-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1442,
            source_url: "/support/55h8f-4k-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/55H8F_4k-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1443,
            source_url: "/support/55r8f-4k-uled-hisense-roku-smart-tv-2019",
            redirect_url: "/support/models/55R8F_4k-uled-hisense-roku-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1444,
            source_url: "/support/55r7f-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/55R7F_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1445,
            source_url: "/support/55r7e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/55R7E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1446,
            source_url: "/support/55a6g-55-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/55A6G_55-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1447,
            source_url: "/support/55r6090g5-55-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/55R6090G5_55-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1448,
            source_url: "/support/55r6090g-55-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/55R6090G_55-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1449,
            source_url: "/support/55r6e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/55R6E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1450,
            source_url: "/support/55r6070e3-4k-uhd-smart-hisense-roku-tv-2020",
            redirect_url: "/support/models/55R6070E3_4k-uhd-smart-hisense-roku-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1451,
            source_url: "/support/55r6095g5-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/55R6095G5_4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1452,
            source_url: "/support/55r6040f-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/55R6040F_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1453,
            source_url: "/support/55h6590f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/55H6590F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1454,
            source_url: "/support/55h6570g-55-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/55H6570G_55-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1455,
            source_url: "/support/55h6570f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/55H6570F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1456,
            source_url: "/support/50h8g-50-quantum-4k-uled-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/50H8G_50-quantum-4k-uled-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1457,
            source_url: "/support/50h8f-4k-uled-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/50H8F_4k-uled-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1458,
            source_url: "/support/50r7f-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/50R7F_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1459,
            source_url: "/support/50h6570g-50-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/50H6570G_50-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1460,
            source_url: "/support/50r7e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/50R7E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1461,
            source_url: "/support/50h6590f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/50H6590F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1462,
            source_url: "/support/50h6570f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/50H6570F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1463,
            source_url: "/support/50r6e3-50-4k-uhd-hisense-roku-tv",
            redirect_url: "/support/models/50R6E3_50-4k-uhd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1464,
            source_url: "/support/50r6090g5-50-4k-uhd-hisense-roku-tv-with-hdr",
            redirect_url: "/support/models/50R6090G5_50-4k-uhd-hisense-roku-tv-with-hdr"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1465,
            source_url: "/support/50r6090g-50-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/50R6090G_50-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1466,
            source_url: "/support/50r6e1-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/50R6E1_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1467,
            source_url: "/support/50r6e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/50R6E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1468,
            source_url: "/support/50a60gmv-4k-uhd-hisense-vidaa-smart-tv-2020",
            redirect_url: "/support/models/50A60GMV_4k-uhd-hisense-vidaa-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1469,
            source_url: "/support/43a6g-43-4k-uhd-hisense-android-smart-tv-2021",
            redirect_url: "/support/models/43A6G_43-4k-uhd-hisense-android-smart-tv-2021"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1470,
            source_url: "/support/43r6e3-43-4k-uhd-hisense-roku-tv",
            redirect_url: "/support/models/43R6E3_43-4k-uhd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1471,
            source_url: "/support/43r6090g5-43-4k-uhd-hisense-roku-tv-with-hdr",
            redirect_url: "/support/models/43R6090G5_43-4k-uhd-hisense-roku-tv-with-hdr"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1472,
            source_url: "/support/43r6090g-43-4k-uhd-hisense-roku-tv-with-hdr",
            redirect_url: "/support/models/43R6090G_43-4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1473,
            source_url: "/support/43r6e1-4k-uhd-hisense-roku-tv-with-hdr-2019",
            redirect_url: "/support/models/43R6E1_4k-uhd-hisense-roku-tv-with-hdr-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1474,
            source_url: "/support/43h5500g-full-hd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/43H5500G_full-hd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1475,
            source_url: "/support/32h5500g-hd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/32H5500G_hd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1476,
            source_url: "/support/43r7e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/43R7E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1477,
            source_url: "/support/43h6570g-43-4k-uhd-hisense-android-smart-tv-2020",
            redirect_url: "/support/models/43H6570G_43-4k-uhd-hisense-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1478,
            source_url: "/support/43h6570f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/43H6570F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1479,
            source_url: "/support/43h6590f-4k-uhd-hisense-android-smart-tv-2019",
            redirect_url: "/support/models/43H6590F_4k-uhd-hisense-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1480,
            source_url: "/support/43r6e-4k-uhd-hisense-roku-tv-with-hdr-2018",
            redirect_url: "/support/models/43R6E_4k-uhd-hisense-roku-tv-with-hdr-2018"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1481,
            source_url: "/support/43h4030f-full-hd-hisense-roku-tv-2019",
            redirect_url: "/support/models/43H4030F_full-hd-hisense-roku-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1482,
            source_url: "/support/43h4f-full-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/43H4F_full-hd-hisense-roku-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1483,
            source_url: "/support/43h4030f3-full-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/43H4030F3_full-hd-hisense-roku-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1484,
            source_url: "/support/43a60gmv-43-4k-uhd-hisense-vidaa-smart-tv-2020",
            redirect_url: "/support/models/43A60GMV_43-4k-uhd-hisense-vidaa-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1485,
            source_url: "/support/40h5500f-full-hd-android-smart-tv-2019",
            redirect_url: "/support/models/40H5500F_full-hd-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1486,
            source_url: "/support/40h5590f-full-hd-android-smart-tv-2019",
            redirect_url: "/support/models/40H5590F_full-hd-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1487,
            source_url: "/support/40h4f-full-hd-hisense-roku-tv-2019",
            redirect_url: "/support/models/40H4F_full-hd-hisense-roku-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1488,
            source_url: "/support/32h4f5-32-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/32H4F5_32-hd-hisense-roku-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1489,
            source_url: "/support/40h4030f-full-hd-hisense-roku-tv-2019",
            redirect_url: "/support/models/40H4030F_full-hd-hisense-roku-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1490,
            source_url: "/support/40h3f9-full-hd-hisense-feature-tv-2019",
            redirect_url: "/support/models/40H3F9_full-hd-hisense-feature-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1491,
            source_url: "/support/40f3100-full-hd-hisense-feature-tv-2019",
            redirect_url: "/support/models/40F3100_full-hd-hisense-feature-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1492,
            source_url: "/support/32h5500f-hd-android-smart-tv-2019",
            redirect_url: "/support/models/32H5500F_hd-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1493,
            source_url: "/support/40h4030f1-full-hd-hisense-roku-tv-2019",
            redirect_url: "/support/models/40H4030F1_full-hd-hisense-roku-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1494,
            source_url: "/support/32h5590f-2019-hd-android-smart-tv-2019",
            redirect_url: "/support/models/32H5590F_2019-hd-android-smart-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1495,
            source_url: "/support/32h4f-hd-hisense-roku-tv-2019-2020",
            redirect_url: "/support/models/32H4F_hd-hisense-roku-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1496,
            source_url: "/support/32h4030f-hd-hisense-roku-tv-2019-2021",
            redirect_url: "/support/models/32H4030F_hd-hisense-roku-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1497,
            source_url: "/support/32h4030f3-32-hd-hisense-roku-tv-2021",
            redirect_url: "/support/models/32H4030F3_32-hd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1498,
            source_url: "/support/32a40gmv-hd-hisense-vidaa-smart-tv-2020",
            redirect_url: "/support/models/32A40GMV_hd-hisense-vidaa-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1499,
            source_url: "/support/32f3100-hd-hisense-feature-tv-2019",
            redirect_url: "/support/models/32F3100_hd-hisense-feature-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1500,
            source_url: "/support/32h3d5-hd-hisense-feature-tv-2019",
            redirect_url: "/support/models/32H3D5_hd-hisense-feature-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1501,
            source_url: "/support/32h3e9-hd-hisense-feature-tv-2019",
            redirect_url: "/support/models/32H3E9_hd-hisense-feature-tv-2019"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1502,
            source_url: "/support/55u1600-u1600-series-4k-uhd-commercial-tv",
            redirect_url: "/support/models/55U1600_u1600-series-4k-uhd-commercial-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1503,
            source_url: "/support/100l8d-4k-uhd-smart-laser-tv-with-hdr",
            redirect_url: "/support/models/100L8D_4k-uhd-smart-laser-tv-with-hdr"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1504,
            source_url: "/support/50h8c-h8c-series-4k-ultra-hd-smart-led-tv",
            redirect_url: "/support/models/50H8C_h8c-series-4k-ultra-hd-smart-led-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1505,
            source_url: "/support/75u1600-u1600-series-4k-uhd-commercial-tv",
            redirect_url: "/support/models/75U1600_u1600-series-4k-uhd-commercial-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1506,
            source_url: "/support/55h8050d-h8d-series-4k-uhd-smart-tv",
            redirect_url: "/support/models/55H8050D_h8d-series-4k-uhd-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1507,
            source_url: "/support/65u1600-u1600-series-4k-uhd-commercial-tv",
            redirect_url: "/support/models/65U1600_u1600-series-4k-uhd-commercial-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1508,
            source_url: "/support/55h8e-h8e-series-4k-uhd-smart-tv-with-hdr",
            redirect_url: "/support/models/55H8E_h8e-series-4k-uhd-smart-tv-with-hdr"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1509,
            source_url: "/support/55h9d-h9d-series-4k-uhd-smart-tv",
            redirect_url: "/support/models/55H9D_h9d-series-4k-uhd-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1510,
            source_url: "/support/55h8c-h8c-series-4k-ultra-hd-smart-led-tv",
            redirect_url: "/support/models/55H8C_h8c-series-4k-ultra-hd-smart-led-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1511,
            source_url: "/support/65h8050d-h8d-series-4k-uhd-smart-tv",
            redirect_url: "/support/models/65H8050D_h8d-series-4k-uhd-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1512,
            source_url: "/support/65h9d-h9d-series-4k-uhd-smart-tv",
            redirect_url: "/support/models/65H9D_h9d-series-4k-uhd-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1513,
            source_url: "/support/65h8e-h8e-series-4k-uhd-smart-tv-with-hdr",
            redirect_url: "/support/models/65H8E_h8e-series-4k-uhd-smart-tv-with-hdr"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1514,
            source_url: "/support/55r6000e-55-inch-4k-uhd-roku-tv-with-hdr-54-5-diag-2020",
            redirect_url: "/support/models/55R6000E_55-class-4k-uhd-roku-tv-with-hdr-54-5-diag"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1515,
            source_url: "/support/55h9e-55-inch-4k-uhd-smart-tv-with-hdr-works-with-amazon-alexa",
            redirect_url: "/support/models/55H9E_55-class-4k-uhd-smart-tv-with-hdr-works-with-amazon-alexa"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1516,
            source_url: "/support/65h9eplus-65-inch-4k-uled-smart-tv",
            redirect_url: "/support/models/65H9EPLUS_65-class-4k-uled-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1517,
            source_url: "/support/55h9eplus-55-inch-4k-uled-smart-tv",
            redirect_url: "/support/models/55H9EPLUS_55-class-4k-uled-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1518,
            source_url: "/support/65h9e-65-inch-4k-uled-smart-tv",
            redirect_url: "/support/models/65H9E_65-class-4k-uled-smart-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1519,
            source_url: "/support/35r7f-roku-tv",
            redirect_url: "/support/models/35R7F_roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1520,
            source_url: "/support/43h4030f1-full-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/43H4030F1_full-hd-hisense-roku-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1521,
            source_url: "/support/32h5510g-hd-android-smart-tv-2020",
            redirect_url: "/support/models/32H5510G_hd-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1522,
            source_url: "/support/43h5510g-full-hd-android-smart-tv-2020",
            redirect_url: "/support/models/43H5510G_full-hd-android-smart-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1523,
            source_url: "/support/43h6510g-4k-uhd-hisense-android-tv-2020",
            redirect_url: "/support/models/43H6510G_4k-uhd-hisense-android-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1524,
            source_url: "/support/50h6510g-4k-uhd-hisense-android-tv-2020",
            redirect_url: "/support/models/50H6510G_4k-uhd-hisense-android-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1525,
            source_url: "/support/55h6510g-4k-uhd-hisense-android-tv-2020",
            redirect_url: "/support/models/55H6510G_4k-uhd-hisense-android-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1526,
            source_url: "/support/65h6510g-4k-uhd-hisense-android-tv-2020",
            redirect_url: "/support/models/65H6510G_4k-uhd-hisense-android-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1527,
            source_url: "/support/75h6510g-4k-uhd-hisense-android-tv-2020",
            redirect_url: "/support/models/75H6510G_4k-uhd-hisense-android-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1528,
            source_url: "/support/85h6510g-4k-uhd-hisense-android-tv-2020",
            redirect_url: "/support/models/85H6510G_4k-uhd-hisense-android-tv-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1529,
            source_url: "/support/32h5580f-hd-hisense-android-tv",
            redirect_url: "/support/models/32H5580F_hd-hisense-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1530,
            source_url: "/support/40h5580f-full-hd-hisense-android-tv",
            redirect_url: "/support/models/40H5580F_full-hd-hisense-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1531,
            source_url: "/support/43h5580g-full-hd-hisense-android-tv",
            redirect_url: "/support/models/43H5580G_full-hd-hisense-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1532,
            source_url: "/support/43h4080f-full-hd-hisense-roku-tv-2021",
            redirect_url: "/support/models/43H4080F_full-hd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1533,
            source_url: "/support/50r6080g-full-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/50R6080G_full-hd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1534,
            source_url: "/support/55r6080g-4k-ultra-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/55R6080G_4k-ultra-hd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1535,
            source_url: "/support/65r6080g-4k-ultra-hd-hisense-roku-tv-2020",
            redirect_url: "/support/models/65R6080G_4k-ultra-hd-hisense-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1536,
            source_url: "/support/55r6040g-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/55R6040G_4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1537,
            source_url: "/support/50r6040g-4k-uhd-hisense-roku-tv-with-hdr-2020",
            redirect_url: "/support/models/50R6040G_4k-uhd-hisense-roku-tv-with-hdr-2020"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1538,
            source_url: "/audio/hs214-hisense-hs214-2-1-channel-soundbar",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/HS214_hisense-hs214-2-1-channel-soundbar"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1539,
            source_url: "/audio/hs218-hisense-hs218-2-1-channel-soundbar-subwoofer",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/HS218_hisense-hs218-2-1-channel-soundbar-subwoofer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1540,
            source_url: "/audio/hs212f-hisense-hs212f-2-1-ch-soundbar-with-wireless-subwoofer",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/HS212F_hisense-hs212f-2-1-ch-soundbar-with-wireless-subwoofer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1541,
            source_url: "/audio/hs219-hisense-hs219-2-1-ch-soundbar-with-wireless-subwoofer",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/HS219_hisense-hs219-2-1-ch-soundbar-with-wireless-subwoofer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1542,
            source_url: "/audio/hs205-hisense-hs205-2-0-channel-soundbar",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/HS205_hisense-hs205-2-0-channel-soundbar"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1543,
            source_url: "/audio/hs312-hisense-hs312-3-1-ch-soundbar-with-wireless-subwoofer",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/HS312_hisense-hs312-3-1-ch-soundbar-with-wireless-subwoofer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1557,
            source_url: "/televisions/100l9g-dlt100b-100-trichroma-laser-tv-daylight-screen",
            redirect_url: "/tv-and-audio/televisions/all-tvs/100L9G-DLT100B_100-trichroma-laser-tv-daylight-screen"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1560,
            source_url: "/televisions/100l9g-cine100a-100-trichroma-laser-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/100L9G-CINE100A_100-trichroma-laser-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1568,
            source_url: "/televisions/50u6g1-50-quantum-google-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/50U6G1_50-hisense-quantum-google-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1570,
            source_url: "/televisions/75u800gr-u800gr-8k-uled-roku-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/75U800GR_u800gr-8k-uled-roku-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1576,
            source_url: "/televisions/100l9g-dlt100a-100-trichroma-laser-tv-daylight-screen",
            redirect_url: "/tv-and-audio/televisions/all-tvs/100L9G-DLT100A_100-trichroma-laser-tv-daylight-screen"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1581,
            source_url: "/audio/ax5100g-hisense-soundbar-with-subwoofer",
            redirect_url: "/tv-and-audio/home-audio/home-audio-2/AX5100G_hisense-soundbar-with-subwoofer"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1587,
            source_url: "/home-appliance/refrigerators/hrb171n6bse-hisense-17-1-cu-ft-refrigerator-with-ice-maker-fingerprint-resistant-stainless-steel",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRB171N6BSE_hisense-17-1-cu-ft-refrigerator-with-ice-maker-fingerprint-resistant-stainless-steel"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1589,
            source_url: "/home-appliance/refrigerators/hrf208n6bse-hisense-20-6-cu-ft-french-door-refrigerator-with-ice-maker-stainless-steel-energy-star",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRF208N6BSE_hisense-20-6-cu-ft-french-door-refrigerator-with-ice-maker-stainless-steel-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1591,
            source_url: "/home-appliance/refrigerators/hrb208n6bse-hisense-20-9-cu-ft-bottom-freezer-refrigerator-with-ice-maker-stainless-steel-energy-star",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRB208N6BSE_hisense-20-9-cu-ft-bottom-freezer-refrigerator-with-ice-maker-stainless-steel-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1593,
            source_url: "/televisions/32a4h-hisense-32-inch-a4-series-led-720p-smart-android-tv",
            redirect_url: "/tv-and-audio/televisions/all-tvs/32A45HF_hisense-32-class-a4-series-led-4k-uhd-smart-android-tv"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1595,
            source_url: "/home-appliance/refrigerators/hrf254n6tse-hisense-25-4-cu-ft-french-door-refrigerator-with-ice-maker-stainless-steel-energy-star",
            redirect_url: "/home-appliance/explore-home-appliance/refrigerators/all-refrigerators/HRF254N6TSE_hisense-25-4-cu-ft-french-door-refrigerator-with-ice-maker-stainless-steel-energy-star"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1597,
            source_url: "/home-appliance/dishwashers/dh10019tp1wg-60-pint-capacity-1500-sq-ft-coverage-3-speed-inverter-dehumidifier-with-built-in-pump",
            redirect_url: "/air-products/explore-air-products/all-air-products/DH10019TP1WG_60-pint-capacity-1500-sq-ft-coverage-3-speed-inverter-dehumidifier-with-built-in-pump"
        },
        {
            status: 'queued',
            redirect_code: 301,
            redirect_type: "from",
            page_id: 1610,
            source_url: "/televisions/65a60gmv-65-4k-uhd-hisense-vidaa-smart-tv-2020",
            redirect_url: "/tv-and-audio/televisions/all-tvs/65A60GMV_65-4k-uhd-hisense-vidaa-smart-tv-2020"
        }
    ];

    loading: boolean = false;

    async delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    async start() {
        this.loading = true;

        for (const redirect of this.redirects) {
            redirect.status = 'in progress';
            await Api.Redirect.create(redirect);
            redirect.status = 'done';
            await this.delay(500);

        }
        this.loading = false;
        await Api.Page.doDeploy();
    }

    get website() {
        return process.env.LIVE_WEBSITE
    }
}
</script>
