import { IIndexable } from "@/utils/IIndexable";

const BRANDS_LIVE_WEBSITE_URL = {
    LIVE_WEBSITE_HISENSEUSA: process.env.LIVE_WEBSITE_HISENSEUSA,
    LIVE_WEBSITE_INFLUENCEMARKETING:
        process.env.LIVE_WEBSITE_INFLUENCEMARKETING,
    LIVE_WEBSITE_EMPOWER_MARKETING: process.env.LIVE_WEBSITE_EMPOWER_MARKETING,
    LIVE_WEBSITE_IM_AAFC: process.env.LIVE_WEBSITE_IM_AAFC,
};

export default function getLiveWebisteURL() {
    return (BRANDS_LIVE_WEBSITE_URL as IIndexable)[
        "LIVE_WEBSITE_" + localStorage.getItem("active_brand")?.toUpperCase()
    ];
}
