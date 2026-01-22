import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { Check, Delete, Edit, Undo } from "@mui/icons-material";
import { MouseEvent, useEffect, useState } from "react";

interface DesktopReservationModalProps {
    res: Reservering;
}
export default function DesktopReservationModal({ res }: DesktopReservationModalProps) {
    const [edit, canEdit] = useState<boolean>(false);
    const [deleteQuestionActive, SetDeleteQuestionActive] = useState<boolean>(false);
    const [editableReservation, setEditableReservation] = useState<Reservering>(res);


    useEffect(() =>{
            // eslint-disable-next-line react-hooks/set-state-in-effect
            canEdit(res.ReseveringsNr === "Nieuwe Reservering");
    },[res.ReseveringsNr])

    const HandleDelete = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        SetDeleteQuestionActive(false);
        // TODO backend logic
    };

    const handleSave = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        canEdit(false);
        console.log(editableReservation);
        // TODO backend logic
    };

    const updateField = (field: string, value: string | number) => {
        setEditableReservation((prev) => {
            return { ...prev, [field]: value };
        });
    };



    return (
        <div
            id="desktopDetails"
            className="min-w-[640px] w-1/3 h-full absolute right-0 top-0 bg-[#EDEBDE] flex flex-col gap-8 p-8 text-[#666666] overflow-y-auto"
        >
            <section id="view-general-info" className="flex flex-col py-4 gap-1 border-b-2 border-[#999999]">
                <p className="text-2xl">{res.ReseveringsNr}</p>
                {edit ?(<div className={`flex flex-row ${edit ? "text-green-700 bg-white": ""}`}>
                            <input className="text-3xl w-full" onChange={(e) => {
                                updateField("Voornaam",e.currentTarget.value);
                            }} type="text" placeholder="voornaam..." defaultValue={res.Voornaam} name="" id="" />
                            <input className="text-3xl w-full" onChange={(e) => {
                                updateField("Achternaam",e.currentTarget.value);
                            }} type="text" placeholder="achternaam..." defaultValue={res.Achternaam} name="" id="" />
                        </div>) 
                        :
                        (<p className="text-5xl text-black">
                    {res.Voornaam} {res.Achternaam}
                </p>)}
            </section>
            <section
                id="view-reservation-info"
                className="flex flex-col gap-4 pb-4 text-3xl justify-center border-b-2 border-[#999999]"
            >
                {edit ? (<div className={`flex flex-row justify-between gap-4 ${edit ? "text-green-700 bg-white": ""}`}>
                    <input type="date" name="" id="" defaultValue={res.DatumAankomst?.split("T")[0] || undefined} onChange={(e) => {
                        updateField("DatumAankomst",e.currentTarget.value)
                    }} />
                    <p>Tot</p>
                    <input type="date" name="" id="" defaultValue={res.DatumVertrek?.split("T")[0] || undefined} onChange={(e) => {
                        updateField("DatumVertrek",e.currentTarget.value)
                    }} />
                </div>) : (
                <p className="text-center">
                    {res.DatumAankomst?.split("T")[0] || ""} tot {res.DatumVertrek?.split("T")[0] || ""}
                </p>)}
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("PlekGrootte", val);
                    }}
                    name="Plaatsnummer"
                    value={`${res.PlekNummer} (${res.PlekGrootte == "G" ? "Groot" : "Klein"})`}
                />
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("AantalMensen", val);
                    }}
                    name="Aantal personen"
                    value={res.AantalMensen}
                />
                <input type="date" name="" id="" defaultValue={res.ReserveringsDatum?.split("T")[0] || undefined} onChange={(e) => {
                        updateField("ReserveringsDatum",e.currentTarget.value)
                }} />
                <DataField canEdit={edit} name="Status" value={"afwachtend"} />
            </section>
            <section
                id="view-user-info"
                className="flex flex-col gap-4 pb-4 text-3xl justify-center border-b-2 border-[#999999]"
            >
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("Email", val);
                    }}
                    name="Email"
                    value={res.Email}
                />
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("Woonplaats", val);
                    }}
                    name="Adres"
                    value={res.Woonplaats}
                />
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("Telefoonnummer", val);
                    }}
                    name="Mobiel"
                    value={res.Telefoonnummer}
                />
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
                        onClick={handleSave}
                    >
                        <Check style={{ width: 32, height: 32 }} />
                        <p className="text-black">Opslaan</p>
                    </button>
                )}

                <div
                    id="delete-reservation"
                    className="flex flex-row text-[32px] items-center py-2 px-1 gap-4 bg-[#FF8080] rounded text-[#852221] relative"
                    onClick={() => {
                        SetDeleteQuestionActive(true);
                    }}
                >
                    {deleteQuestionActive && (
                        <div className="bg-gray-100 rounded-2xl p-4 absolute -top-20 text-base w-[175px]">
                            <p>Weet je het zeker?</p>
                            <div className="options flex flex-row justify-between">
                                <button className="px-4 bg-green-400 rounded" onClick={HandleDelete}>
                                    ja
                                </button>
                                <button
                                    className="px-4 bg-red-400 rounded"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        SetDeleteQuestionActive(false);
                                    }}
                                >
                                    nee
                                </button>
                            </div>
                        </div>
                    )}

                    <Delete style={{ width: 32, height: 32 }} />
                    <p className="text-black">Verwijderen</p>
                </div>
            </section>
        </div>
    );
}

interface DataFieldProp {
    name: string;
    value: string | number | undefined;
    editValue?: (val: string | number) => void;
    canEdit?: boolean;
}
function DataField({ name, value, editValue, canEdit = false }: DataFieldProp) {
    return (
        <div className="flex flex-row items-center justify-between text-3xl">
            <p className="Name text-nowrap">{name}</p>

            {canEdit ? (
                <input
                    onChange={(e) => {
                        if (!editValue) return console.log(e.currentTarget.value);
                        editValue(e.currentTarget.value);
                    }}
                    type={typeof value == "number" ? "number" : "text"}
                    key={name}
                    className={`Value text-black text-end w-full h-full ${canEdit ? "text-green-700 bg-white rounded-2xl py-1 px-2" : ""}`}
                    defaultValue={value}
                />
            ) : (
                <p className="Value text-black">{value}</p>
            )}
        </div>
    );
}
