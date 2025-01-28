import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A component that provides a color picker interface.
 * The user can select a color from the palette, and the selected color state is managed internally.
 * 

/******  6e2cc6c5-cb2c-4512-a45c-6b4ece9af2c4  *******/
export function ColorPickerComponent() {
  const [color, setColor] = useColor("#561ecb");

  return <ColorPicker color={color} onChange={setColor} />;
}