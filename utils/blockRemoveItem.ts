export default function blockRemoveItem(base: any, list : string[]) {
    list.forEach(key => {
        if(base.hasOwnProperty(key)) 
            delete base[key];
    })
}
