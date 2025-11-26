import Image from "next/image";
import Widget1 from "./components/widget1";
import Widget2 from "./components/widget2";
import Widgetbar1 from "./components/widgetbar1";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import Input1 from "./components/input1";
import Input2 from "./components/input2";
import Toggle1 from "./components/toggle1";
import Toggle2 from "./components/toggle2";
export default function Home() {
  return (
    <>
      <Widget1/>
      <Widget2/>
      <Button1/>
      <Button2/>
      <Toggle1/>
      <Toggle2/>
      <Input1/> <br></br>
      <Input2/> <br></br>
      knoppen die nog niet werken: <br></br>
      'random option field knoppen'
      <Widgetbar1/>
    </>
  );
}

