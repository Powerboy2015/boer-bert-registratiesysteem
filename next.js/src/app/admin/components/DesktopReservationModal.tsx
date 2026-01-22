import AdminReserveringen from "@/app/lib/AdminReserveringen";
import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { Check, Delete, Edit } from "@mui/icons-material";
import { ChangeEvent, FocusEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { OverlayContext } from "../context/OverlayContext";
import toast from "react-hot-toast";
import { start } from "repl";

interface DesktopReservationModalProps {
    res: Reservering;
}
const REQUIRED_FIELDS: string[] = [
    "ReseveringsNr",
    "Voornaam",
    "Achternaam",
    "DatumAankomst",
    "DatumVertrek",
    "PlekNummer",
    "AantalMensen",
    "Email",
    "Woonplaats",
    "Telefoonnummer",
] as const;

function isReservationComplete(r: Partial<Reservering>): r is Reservering {
    return (REQUIRED_FIELDS as readonly (keyof Reservering)[]).every((key) => {
        const v = r[key]; // now TS knows key is keyof Reservering
        return v !== undefined && v !== null && (typeof v !== "string" || v.trim() !== "");
    });
}

export default function DesktopReservationModal({ res }: DesktopReservationModalProps) {
    const [edit, canEdit] = useState<boolean>(false);
    const [createNew, isCreatingNew] = useState<boolean>(false);
    const [deleteQuestionActive, SetDeleteQuestionActive] = useState<boolean>(false);
    const [editableReservation, setEditableReservation] = useState<Reservering>(res);
    const [dateMismatch, setDateMismatch] = useState<boolean>(false);
    const context = useContext(OverlayContext);

    // if we are trying to create a new reservation, it will go into create+ edit mode.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        canEdit(res.ReseveringsNr === "Nieuwe Reservering");
        isCreatingNew(res.ReseveringsNr === "Nieuwe Reservering");
    }, [res.ReseveringsNr]);

    // reusable reloadReservations for the other handlers.
    const reloadReservations = (resp: { ok: boolean; message: string }) => {
        if (!resp.ok) {
            return toast.error(`Error: ${resp.message}`);
        }
        toast.success(resp.message);
        // console.log(resp);

        // if we have a reload reservation function we call it and it'll reload the dashboard.
        if (context !== null && context?.reloadReservations !== null) {
            context.reloadReservations();
        } else {
            console.log("could not reload reservations.");
        }
    };

    const HandleDelete = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();
        SetDeleteQuestionActive(false);

        // console logs our deletion.
        AdminReserveringen.DeleteReservation(res.ReseveringsNr).then(reloadReservations);

        // if we have given the reload function correctly, fire it

        //Clears out the current reservation we are viewing. Thus closing the modal
        context?.setActiveReservation(null);
    };

    //Handles saving by either updating or creating a new resevation. It then closes the modal and reloads all reservations.
    const handleSave = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.stopPropagation();

        const isFilled = isReservationComplete(editableReservation);
        console.log(isFilled);
        if (isFilled == false) {
            return toast.success("test");
        }

        if (createNew) {
            //depending on if we're creating a new one, create a new one or update an existing one.
            AdminReserveringen.createReservation(editableReservation).then(reloadReservations);
        } else {
            AdminReserveringen.UpdateReservation(editableReservation).then(reloadReservations);
        }
        console.log(editableReservation);
        canEdit(false);
        isCreatingNew(false);

        //Clears out the current reservation we are viewing. Thus closing the modal
        context?.setActiveReservation(null);
    };

    // updates the field for the selected reservation.
    const updateField = (field: string, value: string | number) => {
        setEditableReservation((prev) => {
            return { ...prev, [field]: value };
        });
    };

    const compareStartEndDates = (_field: string, _value: string) => {
        updateField(_field, _value);

        const start = _field === "DatumAankomst" ? new Date(_value) : new Date(editableReservation.DatumAankomst);
        const end = _field === "DatumVertrek" ? new Date(_value) : new Date(editableReservation.DatumVertrek);

        setDateMismatch(start >= end);
    };

    return (
        <div
            id="desktopDetails"
            className="min-w-[640px] w-1/3 h-full absolute right-0 top-0 bg-[#EDEBDE] flex flex-col gap-8 p-8 text-[#666666] overflow-y-auto"
        >
            <section id="view-general-info" className="flex flex-col py-4 gap-1 border-b-2 border-[#999999]">
                <p className="text-2xl">{res.ReseveringsNr}</p>
                {createNew ? (
                    <div className="flex flex-ro">
                        <input
                            className={`text-3xl w-full ${createNew ? "text-green-700 bg-white" : ""} `}
                            onChange={(e) => {
                                updateField("Voornaam", e.currentTarget.value);
                            }}
                            type="text"
                            placeholder="voornaam..."
                            defaultValue={res.Voornaam}
                            name=""
                            id=""
                        />
                        <input
                            className={`text-3xl w-full ${createNew ? "text-green-700 bg-white" : ""}`}
                            onChange={(e) => {
                                updateField("Achternaam", e.currentTarget.value);
                            }}
                            type="text"
                            placeholder="achternaam..."
                            defaultValue={res.Achternaam}
                            name=""
                            id=""
                        />
                    </div>
                ) : (
                    <p className="text-5xl text-black">
                        {res.Voornaam} {res.Achternaam}
                    </p>
                )}
            </section>
            <section
                id="view-reservation-info"
                className="flex flex-col gap-4 pb-4 text-3xl justify-center border-b-2 border-[#999999]"
            >
                {edit ? (
                    <div className="flex flex-row justify-between gap-4">
                        <input
                            type="date"
                            name=""
                            id=""
                            defaultValue={res.DatumAankomst?.split("T")[0] || undefined}
                            onChange={(e) => {
                                compareStartEndDates("DatumAankomst", e.currentTarget.value);
                            }}
                            className={`${edit ? "text-green-700 bg-white" : ""} ${dateMismatch ? "border border-red-500" : ""}`}
                        />
                        <p>Tot</p>
                        <input
                            type="date"
                            name=""
                            id=""
                            defaultValue={res.DatumVertrek?.split("T")[0] || undefined}
                            onChange={(e) => {
                                compareStartEndDates("DatumVertrek", e.currentTarget.value);
                            }}
                            className={`${edit ? "text-green-700 bg-white" : ""} ${dateMismatch ? "border border-red-500" : ""}`}
                        />
                    </div>
                ) : (
                    <p className="text-center">
                        {res.DatumAankomst?.split("T")[0] || ""} tot {res.DatumVertrek?.split("T")[0] || ""}
                    </p>
                )}
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("PlekNummer", val);
                    }}
                    name="Plaatsnummer"
                    value={`${res.PlekNummer} (${res.PlekGrootte == "G" ? "Groot" : "Klein"})`}
                    type="number"
                    min={1}
                    max={60}
                    regex="^(?:[0-9]|[1-5][0-9]|60)$"
                    placeholder="minimum 1 maximum 60"
                />
                <DataField
                    canEdit={edit}
                    editValue={(val) => {
                        updateField("AantalMensen", val);
                    }}
                    name="Aantal personen"
                    value={res.AantalMensen}
                    type="number"
                    min={1}
                    max={8}
                    regex="^[1-8]$"
                    placeholder="minimum 1 maximum 8"
                />
                <div className="flex flex-row items-center justify-between text-3xl">
                    <p className="Name text-nowrap">Reserveringsdatum</p>
                    <p className="Value text-black">
                        {res.ReserveringsDatum?.split("T")[0] ||
                            new Date().toLocaleDateString("nl-NL", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            })}
                    </p>
                </div>
            </section>
            <section
                id="view-user-info"
                className="flex flex-col gap-4 pb-4 text-3xl justify-center border-b-2 border-[#999999]"
            >
                <DataField
                    canEdit={createNew}
                    editValue={(val) => {
                        updateField("Email", val);
                    }}
                    name="Email"
                    value={res.Email}
                    regex="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
                    placeholder="emailnaam@email.domein"
                />
                <DataField
                    canEdit={createNew}
                    editValue={(val) => {
                        updateField("Woonplaats", val);
                    }}
                    name="Adres"
                    value={res.Woonplaats}
                    regex="^[A-Za-zÀ-ÿ.'\- ]+\s\d+(?:\s?[A-Za-z0-9\-\/]{1,4})?$"
                    placeholder="straatnaam 1234"
                />
                <DataField
                    canEdit={createNew}
                    editValue={(val) => {
                        updateField("Telefoonnummer", val);
                    }}
                    name="Mobiel"
                    value={res.Telefoonnummer}
                    regex="^(?:\+31|0)[1-9]\d{8}$"
                    placeholder="0612345678"
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

                {!createNew && (
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
                )}
            </section>
        </div>
    );
}

interface DataFieldProp extends React.ComponentProps<"input"> {
    name: string;
    value: string | number | undefined;
    editValue?: (val: string | number) => void;
    canEdit?: boolean;
    regex?: string;
}
function DataField({ name, value, editValue, canEdit = false, regex, ...props }: DataFieldProp) {
    const [valid, isValid] = useState<boolean>(true);

    const validateValue = (e: FocusEvent<HTMLInputElement, Element>) => {
        const value = e.currentTarget.value;
        if (!editValue) return;
        if (!regex) return editValue(value);

        const validateRegex = new RegExp(regex);

        if (validateRegex.test(value)) {
            isValid(true);
            return editValue(value);
        }
        isValid(false);
        return toast.error("You have filled in a field incorrectly....");
    };

    return (
        <div className="flex flex-row items-center justify-between text-3xl">
            <p className="Name text-nowrap">{name}</p>

            {canEdit ? (
                <input
                    onBlur={validateValue}
                    type={typeof value == "number" ? "number" : "text"}
                    key={name}
                    className={`Value text-black text-end w-full h-full ${canEdit ? "text-green-700 bg-white rounded-2xl py-1 px-2" : ""} ${!valid ? "border border-red-500" : ""}`}
                    defaultValue={value}
                    {...props}
                />
            ) : (
                <p className="Value text-black">{value}</p>
            )}
        </div>
    );
}
