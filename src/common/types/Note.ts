export class Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
    email: string | null;
    reminderTime: Date | null;

    constructor(data: {
        content: string;
        created_at: string;
        email: string | null;
        id: number;
        reminder_time: string | null;
        title: string;
        updated_at: string | null;
    }) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.createdAt = new Date(data.created_at);
        this.updatedAt = data.updated_at ? new Date(data.updated_at) : null;
        this.email = data.email;
        this.reminderTime = data.reminder_time ? new Date(data.reminder_time) : null;
    }
}