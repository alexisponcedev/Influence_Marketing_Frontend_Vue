<template>
    <div>
        <img src="/blocks/NewsSingleInfoBox.png" alt="" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, VModel } from "vue-property-decorator";
import { StructureType } from "~/models/StructureType";
import blockAddItem from "~/utils/blockAddItem";
import blockRemoveItem from "~/utils/blockRemoveItem";

const SocialItems = [
    { title: "500px", value: "500px" },
    { title: "8tracks", value: "8tracks" },
    { title: "airbnb", value: "airbnb" },
    { title: "alliance", value: "alliance" },
    { title: "amazon", value: "amazon" },
    { title: "amplement", value: "amplement" },
    { title: "android", value: "android" },
    { title: "angellist", value: "angellist" },
    { title: "apple", value: "apple" },
    { title: "appnet", value: "appnet" },
    { title: "baidu", value: "baidu" },
    { title: "bandcamp", value: "bandcamp" },
    { title: "battlenet", value: "battlenet" },
    { title: "beam", value: "beam" },
    { title: "bebee", value: "bebee" },
    { title: "bebo", value: "bebo" },
    { title: "behance", value: "behance" },
    { title: "blizzard", value: "blizzard" },
    { title: "blogger", value: "blogger" },
    { title: "buffer", value: "buffer" },
    { title: "chrome", value: "chrome" },
    { title: "coderwall", value: "coderwall" },
    { title: "curse", value: "curse" },
    { title: "dailymotion", value: "dailymotion" },
    { title: "deezer", value: "deezer" },
    { title: "delicious", value: "delicious" },
    { title: "deviantart", value: "deviantart" },
    { title: "diablo", value: "diablo" },
    { title: "digg", value: "digg" },
    { title: "discord", value: "discord" },
    { title: "disqus", value: "disqus" },
    { title: "douban", value: "douban" },
    { title: "draugiem", value: "draugiem" },
    { title: "dribbble", value: "dribbble" },
    { title: "drupal", value: "drupal" },
    { title: "ebay", value: "ebay" },
    { title: "ello", value: "ello" },
    { title: "endomodo", value: "endomodo" },
    { title: "envato", value: "envato" },
    { title: "etsy", value: "etsy" },
    { title: "facebook", value: "facebook" },
    { title: "feedburner", value: "feedburner" },
    { title: "filmweb", value: "filmweb" },
    { title: "firefox", value: "firefox" },
    { title: "flattr", value: "flattr" },
    { title: "flickr", value: "flickr" },
    { title: "formulr", value: "formulr" },
    { title: "forrst", value: "forrst" },
    { title: "foursquare", value: "foursquare" },
    { title: "friendfeed", value: "friendfeed" },
    { title: "github", value: "github" },
    { title: "goodreads", value: "goodreads" },
    { title: "google", value: "google" },
    { title: "google", value: "google" },
    { title: "googlegroups", value: "googlegroups" },
    { title: "googlephotos", value: "googlephotos" },
    { title: "googleplus", value: "googleplus" },
    { title: "grooveshark", value: "grooveshark" },
    { title: "hackerrank", value: "hackerrank" },
    { title: "hearthstone", value: "hearthstone" },
    { title: "hellocoton", value: "hellocoton" },
    { title: "heroes", value: "heroes" },
    { title: "hitbox", value: "hitbox" },
    { title: "horde", value: "horde" },
    { title: "houzz", value: "houzz" },
    { title: "icq", value: "icq" },
    { title: "identica", value: "identica" },
    { title: "imdb", value: "imdb" },
    { title: "instagram", value: "instagram" },
    { title: "issuu", value: "issuu" },
    { title: "istock", value: "istock" },
    { title: "itunes", value: "itunes" },
    { title: "keybase", value: "keybase" },
    { title: "lanyrd", value: "lanyrd" },
    { title: "lastfm", value: "lastfm" },
    { title: "line", value: "line" },
    { title: "linkedin", value: "linkedin" },
    { title: "livejournal", value: "livejournal" },
    { title: "lyft", value: "lyft" },
    { title: "macos", value: "macos" },
    { title: "mail", value: "mail" },
    { title: "medium", value: "medium" },
    { title: "meetup", value: "meetup" },
    { title: "mixcloud", value: "mixcloud" },
    { title: "modelmayhem", value: "modelmayhem" },
    { title: "mumble", value: "mumble" },
    { title: "myspace", value: "myspace" },
    { title: "newsvine", value: "newsvine" },
    { title: "nintendo", value: "nintendo" },
    { title: "npm", value: "npm" },
    { title: "odnoklassniki", value: "odnoklassniki" },
    { title: "openid", value: "openid" },
    { title: "opera", value: "opera" },
    { title: "outlook", value: "outlook" },
    { title: "overwatch", value: "overwatch" },
    { title: "patreon", value: "patreon" },
    { title: "paypal", value: "paypal" },
    { title: "periscope", value: "periscope" },
    { title: "persona", value: "persona" },
    { title: "pinterest", value: "pinterest" },
    { title: "play", value: "play" },
    { title: "player", value: "player" },
    { title: "playstation", value: "playstation" },
    { title: "pocket", value: "pocket" },
    { title: "qq", value: "qq" },
    { title: "quora", value: "quora" },
    { title: "raidcall", value: "raidcall" },
    { title: "ravelry", value: "ravelry" },
    { title: "reddit", value: "reddit" },
    { title: "renren", value: "renren" },
    { title: "researchgate", value: "researchgate" },
    { title: "residentadvisor", value: "residentadvisor" },
    { title: "reverbnation", value: "reverbnation" },
    { title: "rss", value: "rss" },
    { title: "sharethis", value: "sharethis" },
    { title: "skype", value: "skype" },
    { title: "slideshare", value: "slideshare" },
    { title: "smugmug", value: "smugmug" },
    { title: "snapchat", value: "snapchat" },
    { title: "songkick", value: "songkick" },
    { title: "soundcloud", value: "soundcloud" },
    { title: "spotify", value: "spotify" },
    { title: "stackexchange", value: "stackexchange" },
    { title: "stackoverflow", value: "stackoverflow" },
    { title: "starcraft", value: "starcraft" },
    { title: "stayfriends", value: "stayfriends" },
    { title: "steam", value: "steam" },
    { title: "storehouse", value: "storehouse" },
    { title: "strava", value: "strava" },
    { title: "streamjar", value: "streamjar" },
    { title: "stumbleupon", value: "stumbleupon" },
    { title: "swarm", value: "swarm" },
    { title: "teamspeak", value: "teamspeak" },
    { title: "teamviewer", value: "teamviewer" },
    { title: "technorati", value: "technorati" },
    { title: "telegram", value: "telegram" },
    { title: "tripadvisor", value: "tripadvisor" },
    { title: "tripit", value: "tripit" },
    { title: "triplej", value: "triplej" },
    { title: "tumblr", value: "tumblr" },
    { title: "twitch", value: "twitch" },
    { title: "twitter", value: "twitter" },
    { title: "uber", value: "uber" },
    { title: "ventrilo", value: "ventrilo" },
    { title: "viadeo", value: "viadeo" },
    { title: "viber", value: "viber" },
    { title: "viewbug", value: "viewbug" },
    { title: "vimeo", value: "vimeo" },
    { title: "vine", value: "vine" },
    { title: "vkontakte", value: "vkontakte" },
    { title: "warcraft", value: "warcraft" },
    { title: "wechat", value: "wechat" },
    { title: "weibo", value: "weibo" },
    { title: "whatsapp", value: "whatsapp" },
    { title: "wikipedia", value: "wikipedia" },
    { title: "windows", value: "windows" },
    { title: "wordpress", value: "wordpress" },
    { title: "wykop", value: "wykop" },
    { title: "xbox", value: "xbox" },
    { title: "xing", value: "xing" },
    { title: "yahoo", value: "yahoo" },
    { title: "yammer", value: "yammer" },
    { title: "yandex", value: "yandex" },
    { title: "yelp", value: "yelp" },
    { title: "younow", value: "younow" },
    { title: "youtube", value: "youtube" },
    { title: "zapier", value: "zapier" },
    { title: "zerply", value: "zerply" },
    { title: "zomato", value: "zomato" },
    { title: "zynga", value: "zynga" },
];

@Component
export default class NewsSingleInfoBox extends Vue {
    @Prop(Number) readonly id: number | undefined;
    @Prop({ default: true }) readonly editable: Boolean | undefined;
    @VModel({ type: Object }) model!: any;

    mounted() {
        // blockAddItem(this.model, 'socials', {
        //     id: 0,
        //     type: StructureType.List,
        //     title: 'Socials',
        //     newItem: {
        //         social: {id: 0, type: StructureType.Select, title: "Social", value: '', items: SocialItems,},
        //         link: {id: 1, type: StructureType.Url, title: 'link', value: ''}
        //     },
        //     value: []
        // })

        blockAddItem(this.model, "downloads", {
            id: 1,
            type: StructureType.List,
            title: "Downloads",
            newItem: {
                file: {
                    id: 0,
                    type: StructureType.File,
                    title: "download file",
                    alt: "",
                    src: "",
                },
                title: {
                    id: 1,
                    type: StructureType.String,
                    title: "title",
                    value: "",
                },
            },
            value: [],
        });

        blockAddItem(this.model, "contact", {
            id: 2,
            type: StructureType.Object,
            title: "Contact Section",
            value: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "title",
                    value: "",
                },
                list: {
                    id: 0,
                    type: StructureType.List,
                    title: "Paragraph List",
                    newItem: {
                        text: {
                            id: 0,
                            type: StructureType.Text,
                            title: "Text",
                            value: "",
                        },
                    },
                    value: [],
                },
            },
        });

        blockAddItem(this.model, "about", {
            id: 3,
            type: StructureType.Object,
            title: "About Section",
            value: {
                title: {
                    id: 0,
                    type: StructureType.String,
                    title: "About title",
                    value: "",
                },
                text: {
                    id: 0,
                    type: StructureType.Text,
                    title: "Text",
                    value: "Paragraph text",
                },
            },
        });

        blockRemoveItem(this.model, ["socials"]);
        this.model = { ...this.model };
    }

    get isEmpty(): Boolean {
        return this.model && Object.keys(this.model).length === 0;
    }
}
</script>
