import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import NoteFormDialog from "@/components/NoteFormDialog";
import {Note} from "@/lib/global_interfaces.tsx";
import {handleErrors} from "@/lib/utils.ts";
import {Dialog, DialogContent, DialogDescription, DialogHeader} from "@/components/ui/dialog";

interface NoteDialog {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    created: string;
    text: string;
}

interface NoteCardProps {
    note: Note;
    refreshNotes: () => void;
}

const NoteDialog: React.FC<NoteDialog> = ({open, onOpenChange, created, text}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription>{created}</DialogDescription>
                </DialogHeader>
                <div>
                    <p>{text}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const NoteCard: React.FC<NoteCardProps> = ({note, refreshNotes}) => {
    const [showNoteDialog, setShowNoteDialog] = useState<boolean>(false);

    const handleDeleteClick = async () => {
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL_BASE}/notes/${note.id}/`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            }).then(handleErrors);
        } catch (error) {
            console.error("Error deleting note:", error);
        } finally {
            refreshNotes();
        }
    };

    const formatCreatedDatetime = (created: string): string => {
        return new Date(created).toLocaleString("en-GB");
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex">
                    <CardDescription className="flex-1">
                        {formatCreatedDatetime(note.created)}
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{note.text}</p>
            </CardContent>
            <CardFooter className="justify-end">
                <div className="flex space-x-4">
                    <Button className="flex-initial" onClick={() => setShowNoteDialog(true)}>
                        View
                    </Button>
                    <div className="flex-initial">
                        <NoteFormDialog
                            triggerButtonText="Edit"
                            dialogHeaderTitle="Edit Note"
                            dialogHeaderDescription="Edit the text to make changes to the note. Click save when you're done."
                            formSubmitButtonText="Save changes"
                            note={note}
                            refreshNotes={refreshNotes}
                        />
                    </div>
                    <Button className="flex-initial" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </div>
            </CardFooter>
            <NoteDialog
                open={showNoteDialog}
                onOpenChange={setShowNoteDialog}
                created={formatCreatedDatetime(note.created)}
                text={note.text}
            />
        </Card>
    );
};

export default NoteCard;
