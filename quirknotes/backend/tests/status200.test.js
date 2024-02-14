const SERVER_URL = "http://127.0.0.1:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
  })

  const getAllNotesBody = await getAllNotesRes.json();

  expect(getAllNotesRes.status).toBe(200);
  expect(getAllNotesBody.response).toBe([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteNote - Delete a note", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with content and title", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with just title", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/patchNote - Patch with just content", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteAllNotes - Delete one note", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/deleteAllNotes - Delete three notes", async () => {
  // Code here
  expect(false).toBe(true);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  // Code here
  expect(false).toBe(true);
});