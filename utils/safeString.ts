let replaces: Array<string> = [
    'https://public.stage.hisenseportal.com',
    'https://public.dev.hisenseportal.com',
    // 'https://www.public.stage.imdigital.ca', //Todo: need confirmation to add this item
];
export default function safeString(str: string): string {
    replaces.forEach(replace => {
        str = str.replaceAll(replace, "");
    })
    return str;
}
