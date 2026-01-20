import { ReactNode } from "react"


interface NavBarIconProps {
    children: ReactNode
}

export default function NavBarIcon({children}:NavBarIconProps) {
    return(
        <>
        {children}
        </>
    )
}