import { IIndexable } from "@/utils/IIndexable";

const BRANDS_LIVE_WEBSITE_URL = {
    LIVE_WEBSITE_HISENSEUSA: process.env.LIVE_WEBSITE_HISENSEUSA,
    LIVE_WEBSITE_INFLUENCEMARKETING:
        process.env.LIVE_WEBSITE_INFLUENCEMARKETING,
    LIVE_WEBSITE_EMPOWERMARKETING: process.env.LIVE_WEBSITE_EMPOWERMARKETING,
    LIVE_WEBSITE_IMDIGITAL: process.env.LIVE_WEBSITE_IMDIGITAL,
    LIVE_WEBSITE_AAFC: process.env.LIVE_WEBSITE_AAFC,
    LIVE_WEBSITE_CANADA: process.env.LIVE_WEBSITE_HISENSECANADA,
};

export default function getLiveWebisteURL() {
    return (BRANDS_LIVE_WEBSITE_URL as IIndexable)[
        "LIVE_WEBSITE_" + localStorage.getItem("active_brand")?.toUpperCase()
    ];
}
