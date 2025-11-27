import Image from "next/image";
import Widget1 from "./widget1";
import Widget2 from "./widget2";
import Widgetbar1 from "./widgetbar1";
import Button1 from "./button1";
import Button2 from "./button2";
import Input1 from "./input1";
import Input2 from "./input2";
import Toggle1 from "./toggle1";
import Toggle2 from "./toggle2";
import Optionfield1 from "./optionfield1"
import Optionfield2 from "./optionfield2"
export default function Home() {
  return (
    <>
      <Widget1/>
      <Widget2/>
      <Button1/>
      <Button2/>
      <Toggle1/>
      <Toggle2/>
      <Optionfield1/>
      <Optionfield2/>
      <Widgetbar1/>
      <Input1/> <br></br>
      <Input2/> <br></br>
    </>
  );
}

