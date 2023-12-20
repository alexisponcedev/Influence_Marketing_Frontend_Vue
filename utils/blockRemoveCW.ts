export default function blockRemoveCW(base: any) {
    Object.keys(base).forEach((key) => {
        if (base[key].type == "changeWidget") delete base[key];
    });
}
