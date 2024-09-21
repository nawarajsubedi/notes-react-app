import { Note } from "../common/types/Note";
import fetchWithAuth from "./api";

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

const createNoteFromResponse = (data: any): Note => {
  return new Note(data);
};

export const saveTitle = async (title: string, id?: number): Promise<Note> => {
  const body = JSON.stringify({ title, id });
  const response = await fetchWithAuth("notes", {
    method: "POST",
    body,
  });

  const result = await handleResponse(response);
  return createNoteFromResponse(result.data);
};

export const updateTitle = async (title: string, id: number): Promise<void> => {
  const body = JSON.stringify({ title });
  await fetchWithAuth(`notes/${id}`, {
    method: "PUT",
    body,
  });
};

export const saveContent = async (content: string): Promise<Note> => {
  const body = JSON.stringify({ content });
  const response = await fetchWithAuth("notes", {
    method: "POST",
    body,
  });

  const result = await handleResponse(response);
  return createNoteFromResponse(result.data);
};

export const updateContent = async (
  content: string,
  id: number
): Promise<Note> => {
  const body = JSON.stringify({ content });
  const response = await fetchWithAuth(`notes/${id}`, {
    method: "PUT",
    body,
  });

  const result = await handleResponse(response);
  return createNoteFromResponse(result.data);
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await fetchWithAuth(`notes/${id}`, { method: "GET" });
  const result = await handleResponse(response);
  return createNoteFromResponse(result.data);
};

export const fetchNotes = async (search?: string): Promise<Note[]> => {
  const searchQuery = search
    ? `?search_content=${encodeURIComponent(search)}`
    : "";
  const response = await fetchWithAuth(`notes${searchQuery}`, {
    method: "GET",
  });
  const result = await handleResponse(response);
  return result.data.map(createNoteFromResponse);
};

export const deleteNote = async (id: number): Promise<void> => {
  const response = await fetchWithAuth(`notes/${id}`, { method: "DELETE" });
  await handleResponse(response); // Use handleResponse for consistent error handling
};

export const setRemainder = async (
  email: string,
  id: number,
  remainder_time: Date
): Promise<Note> => {
  const body = JSON.stringify({ email, remainder_time });
  const response = await fetchWithAuth(`notes/${id}/set-remainder`, {
    method: "PUT",
    body,
  });

  const result = await handleResponse(response);
  return createNoteFromResponse(result.data);
};
