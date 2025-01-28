import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

export function ColorPickerComponent() {
  const [color, setColor] = useColor("#561ecb");

  return <ColorPicker color={color} onChange={setColor} hideInput={["rgb", "hsv"]} disabled={true}/>;
}