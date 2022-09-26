import { Dictionary } from "@/models";

interface Item {
  title: string;
  value: string;
}

const selectItems: Dictionary<Array<Item>> = {
  field_type: [
    {
      title: "Input Text",
      value: "input",
    },
    {
      title: "Dropdown",
      value: "dropdown",
    },
    {
      title: "Checkbox",
      value: "checkbox",
    },
  ],
  filter_content_type: [
    {
      title: "Fields",
      value: "CF",
    },
    {
      title: "Property",
      value: "PROPERTY",
    },
  ],
  themes : [
    {
      title : 'Light', value : 'light'
    },
    {
      title : 'Dark' , value : 'Dark'
    }
  ],
  user_level: [
    {
      title: "User",
      value: "User",
    },
    {
      title: "Admin",
      value: "Admin",
    },
  ],
};

function getItemTitle(value: string, ItemKey: string): string {
  const selectedItem = selectItems[ItemKey].filter(
    (item) => item.value == value
  );
  if (selectedItem && selectedItem.length) return selectedItem[0].title;
  return value;
}

export default selectItems;
export { getItemTitle };
