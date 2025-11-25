import React from "react";
import Image from "next/image";
export default function Testlink() {
    return ( <>
        <div>
            <h1>Dit is de testlink pagina</h1>      {/*een testpagina om te kijken of de links werken*/}
            <Image
                src="/images/sunshine"
                alt="sunshine img"
                height={200}
                width={200}
            />
        </div>
    </>
    )
};