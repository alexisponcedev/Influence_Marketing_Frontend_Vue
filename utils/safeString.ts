let replaces: Array<string> = process.env.BASE_DOMAINS!.split(',');
export default function safeString(str: string): string {
    replaces.forEach(replace => {
        str = str.replaceAll(replace, "");
    })
    return str;
}
