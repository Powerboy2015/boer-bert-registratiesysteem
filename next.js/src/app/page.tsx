import Image from "next/image";
import Widget1 from "./Components/widget1";
import Widget2 from "./Components/widget2";
import Widgetbar1 from "./Components/widgetbar1";
import Button1 from "./Components/button1";
import Button2 from "./Components/button2";
import Input1 from "./Components/input1";
import Input2 from "./Components/input2";
import Toggle1 from "./Components/toggle1";
import Toggle2 from "./Components/toggle2";
import Optionfield1 from "./Components/optionfield1"
import Optionfield2 from "./Components/optionfield2"
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
