import React, {useEffect, useState} from "react";
import NoteCard from "@/components/NoteCard";
import NoteFormDialog from "@/components/NoteFormDialog";
import {handleErrors} from "@/lib/utils.ts";
import {Note} from "@/lib/global_interfaces.tsx";

const App: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);

    const getNotes = React.useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL_BASE}/notes/`).then(
                handleErrors
            );
            setNotes(response.notes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }, []);

    useEffect(() => {
        getNotes();
    }, [getNotes]);

    const refreshNotes = () => {
        getNotes();
    };

    return (
        <div className="h-[calc(100vh-2rem)] w-screen container my-4">
            <div className="grid gap-5">
                <div className="flex flex-row">
                    <div className="flex-1">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Notes
                        </h1>
                    </div>
                    <div className="flex-initial">
                        <NoteFormDialog
                            triggerButtonText="Add Note"
                            dialogHeaderTitle="Add Note"
                            dialogHeaderDescription="Add text to create your note. Click save when you're done."
                            formSubmitButtonText="Add"
                            refreshNotes={refreshNotes}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="grid grid-cols-4 gap-4">
                        {notes.map((note: Note) => (
                            <NoteCard key={note.id} note={note} refreshNotes={refreshNotes} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
