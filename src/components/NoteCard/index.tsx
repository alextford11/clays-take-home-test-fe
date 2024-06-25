import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import React from "react";
import {Button} from "@/components/ui/button.tsx";
import NoteFormDialog from "@/components/NoteFormDialog";

const NoteCard: React.FC = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardDescription>07/04/2024 16:30pm</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        excepteur amet excepteur amet qui consequat minim velit incididunt eu sit
                        tempor aliquip nostrud ipsum
                    </p>
                </CardContent>
                <CardFooter className="justify-end">
                    <div className="flex space-x-4">
                        <div className="flex-initial">
                            <NoteFormDialog
                                triggerButtonText="Edit"
                                dialogHeaderTitle="Edit Note"
                                formSubmitButtonText="Save changes"
                            />
                        </div>
                        <Button className="flex-initial">Delete</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NoteCard;
