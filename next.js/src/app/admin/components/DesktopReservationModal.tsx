import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { Check, Delete, Edit, Undo } from "@mui/icons-material";
import { useState } from "react";

interface DesktopReservationModalProps {
    res: Reservering;
}
export default function DesktopReservationModal({ res }: DesktopReservationModalProps) {
    const [edit, canEdit] = useState<boolean>(false);

    return (
        <div
            id="desktopDetails"
            className="min-w-[640px] w-1/3 h-full absolute right-0 top-0 bg-[#EDEBDE] flex flex-col gap-8 p-8 text-[#666666]"
        >
            <section id="view-general-info" className="flex flex-col py-4 gap-1 border-b-2 border-[#999999]">
                <p className="text-2xl">{res.ReseveringsNr}</p>
                <p className="text-5xl text-black">
                    {res.Voornaam} {res.Achternaam}
                </p>
            </section>
            <section
                id="view-reservation-info"
                className="flex flex-col gap-4 pb-4 text-3xl justify-center border-b-2 border-[#999999]"
            >
                <p className="text-center">
                    {res.DatumAankomst.split("T")[0]} tot {res.DatumVertrek.split("T")[0]}
                </p>
                <DataField
                    canEdit={edit}
                    name="Plaatsnummer"
                    value={`${res.PlekNummer} (${res.PlekGrootte == "G" ? "Groot" : "Klein"})`}
                />
                <DataField canEdit={edit} name="Aantal personen" value={res.AantalMensen} />
                <DataField canEdit={edit} name="Gereserveerd op" value={res.ReserveringsDatum.split("T")[0]} />
                <DataField canEdit={edit} name="Status" value={"afwachtend"} />
            </section>
            <section
                id="view-user-info"
                className="flex flex-col gap-4 pb-4 text-3xl justify-center border-b-2 border-[#999999]"
            >
                <DataField canEdit={edit} name="Email" value={res.Email} />
                <DataField canEdit={edit} name="Adres" value={res.Woonplaats} />
                <DataField canEdit={edit} name="Mobiel" value={res.Telefoonnummer} />
            </section>
            <section id="action-buttons" className="flex flex-row justify-between ">
                {!edit ? (
                    <button
                        id="edit-reservation"
                        className="flex flex-row text-[32px] items-center py-2 px-1 gap-4 bg-[#F6FF80] rounded text-[#666C13]"
                        onClick={() => {
                            canEdit(true);
                        }}
                    >
                        <Edit style={{ width: 32, height: 32 }} />
                        <p className="text-black">Aanpassen</p>
                    </button>
                ) : (
                    <button
                        id="save-reservation"
                        className="flex flex-row text-[32px] items-center py-2 px-1 gap-4 bg-[#00A367] rounded text-[#007248]"
                        onClick={() => {
                            canEdit(false);
                        }}
                    >
                        <Check style={{ width: 32, height: 32 }} />
                        <p className="text-black">Opslaan</p>
                    </button>
                )}

                <button
                    id="delete-reservation"
                    className="flex flex-row text-[32px] items-center py-2 px-1 gap-4 bg-[#FF8080] rounded text-[#852221] relative"
                >
                    {/* <div className="bg-gray-100 rounded-2xl p-4 absolute -bottom-20 text-base w-[175px]">
                        <p>Are you sure?</p>
                        <div className="options flex flex-row justify-between">
                            <button className="px-4 bg-green-400 rounded">yes</button>
                            <button className="px-4 bg-red-400 rounded">no</button>
                        </div>
                    </div> */}
                    <Delete style={{ width: 32, height: 32 }} />
                    <p className="text-black">Verwijderen</p>
                </button>
            </section>
        </div>
    );
}

interface DataFieldProp {
    name: string;
    value: string | number | undefined;
    editValue?: (name: string, val: string | number) => void;
    canEdit?: boolean;
}
function DataField({ name, value, editValue, canEdit = false }: DataFieldProp) {
    return (
        <div className="flex flex-row justify-between text-3xl">
            <p className="Name text-nowrap">{name}</p>

            {canEdit ? (
                <input
                    onChange={(e) => {
                        if (!editValue) return console.log(e.currentTarget.value);
                        editValue(name, e.currentTarget.value);
                    }}
                    type={typeof value == "number" ? "number" : "text"}
                    key={name}
                    className="Value text-black text-end"
                    defaultValue={value}
                />
            ) : (
                <p className="Value text-black">{value}</p>
            )}
        </div>
    );
}
