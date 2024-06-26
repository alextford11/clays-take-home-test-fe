import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {handleErrors} from "@/lib/utils.ts";
import {Note} from "@/lib/global_interfaces.tsx";

interface NoteFormDialogProps {
    triggerButtonText: string;
    dialogHeaderTitle: string;
    dialogHeaderDescription: string;
    formSubmitButtonText: string;
    refreshNotes: () => void;
    note?: Note;
}

const formSchema = z.object({
    note: z.string().min(1).max(500)
});

const NoteFormDialog: React.FC<NoteFormDialogProps> = ({
    triggerButtonText,
    dialogHeaderTitle,
    dialogHeaderDescription,
    formSubmitButtonText,
    refreshNotes,
    note
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            note: note ? note.text : ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const url = note
            ? `${import.meta.env.VITE_BACKEND_URL_BASE}/notes/${note.id}/`
            : `${import.meta.env.VITE_BACKEND_URL_BASE}/notes/`;
        const method = note ? "PUT" : "POST";

        try {
            await fetch(url, {
                method: method,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({text: values["note"]})
            }).then(handleErrors);
        } catch (error) {
            console.error("Error submitting note:", error);
        } finally {
            setDialogOpen(false);
            refreshNotes();
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>{triggerButtonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{dialogHeaderTitle}</DialogTitle>
                    <DialogDescription>{dialogHeaderDescription}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="note"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Note text goes here..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">{formSubmitButtonText}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default NoteFormDialog;
