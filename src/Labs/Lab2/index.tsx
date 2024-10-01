import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <p>
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
        it is considered bad practice and you should avoid
        using the style attribute
      </p>

      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
Instead of changing the look and feel of all the 
elements of the same name, e.g., P, we can refer to a specific element by its ID
        </p>
        <p id="wd-id-selector-2">
Here's another paragraph using a different ID and a different look and
          feel
        </p>
      </div>

      <div id="wd-css-class-selectors">
        <h3>Class selectors</h3>
        <p className="wd-class-selector">
          Instead of using IDs to refer to elements, you can use an element's CLASS attribute
        </p>
        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>


      <ForegroundColors/>
      <BackgroundColors/>
      <Borders/>
      <Padding/>
      <Corners/>
      <Dimensions/>
      <Positions/>
      <Zindex/>
      <Float/>
      <GridLayout/>
      <div className="flex-container">
        <div className="flex-box flex-box-1">Box 1</div>
        <div className="flex-box flex-box-2">
            Box 2 Box 2<br/>Box 2 Box 2
        </div>
        <div className="flex-box flex-box-3">
            Box 3 Box 3 Box 3<br/>Box 3 Box 3 Box 3<br/>Box 3 Box 3
        </div>
      </div>

      <Flex/>
      <BootstrapGrids/>
      <ScreenSizeLabel/>
    </div>
  );
}
