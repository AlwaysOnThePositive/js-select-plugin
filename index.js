import { Select } from "./select/select";
import "./select/styles.scss";

const select = new Select("#select", {
  placeholder: "Выберите элемент",
  selectedId: "4",
  data: [
    { id: "1", value: "Vue" },
    { id: "2", value: "Angular" },
    { id: "3", value: "React" },
    { id: "4", value: "ReactNative" },
    { id: "5", value: "Next" },
    { id: "6", value: "Cordova" },
  ],
  onSelect(item) {
    console.log(item);
  },
});

window.s = select;
