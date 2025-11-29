import Image from "next/image";
interface MapTargetComponentProps {
    place: string;
}

// TODO create dynamic map bsed on which spot is selected
export default function MapTargetComponent({ place }: MapTargetComponentProps) {
    return (
        <div className="w-full h-[25%]">
            <Image
                src={"https://placecats.com/1920/1080"}
                width={1920}
                height={1080}
                className="w-full h-full object-cover object-center"
                alt={"Cute kitty for map " + place}
            ></Image>
        </div>
    );
}
