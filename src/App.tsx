import React from "react";
import NoteCard from "@/components/NoteCard";
import NoteFormDialog from "@/components/NoteFormDialog";

const App: React.FC = () => {
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
                            formSubmitButtonText="Add"
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="grid grid-cols-4 gap-4">
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                        <NoteCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
