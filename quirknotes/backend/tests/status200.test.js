const SERVER_URL = "http://127.0.0.1:4000";

beforeEach(() => {
  const postNoteRes = fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
});

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
  expect(getAllNotesBody.response).toStrictEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
  const title = ["Title1", "Title2"];
  const content = ["Content1", "Content2"];

  const postNoteOneRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title[0],
          content: content[0],
      }),
  });
 
  const postNoteTwoRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title[1],
          content: content[1],
      }),
  });
  const response = await fetch(`${SERVER_URL}/getAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  });
  let jsonResponse = await response.json();

  expect(response.status).toBe(200);
  expect(jsonResponse.response.length).toBe(2)
});

test("/deleteNote - Delete a note", async () => {
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
  
  const getPostNoteResJson = await postNoteRes.json();

  const response = await fetch(`${SERVER_URL}/deleteNote/${getPostNoteResJson.insertedId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  expect(response.status).toBe(200);
  expect(responseJson.response).toBe(`Document with ID ${getPostNoteResJson.insertedId} deleted.`);
});


test("/patchNote - Patch with content and title", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const titleNew = "newTitle";
  const contentNew = "newContent";

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

  const getPostNoteResJson = await postNoteRes.json();

  const response = await fetch(`${SERVER_URL}/patchNote/${getPostNoteResJson.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleNew,
      content: contentNew,
    }),
  });

  const responseJson = await response.json();

  expect(response.status).toBe(200);
  expect(responseJson.response).toBe(`Document with ID ${getPostNoteResJson.insertedId} patched.`);
});

test("/patchNote - Patch with just title", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const titleNew = "newTitle";

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

  const getPostNoteResJson = await postNoteRes.json();

  const response = await fetch(`${SERVER_URL}/patchNote/${getPostNoteResJson.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titleNew,
    }),
  });

  const responseJson = await response.json();

  expect(response.status).toBe(200);
  expect(responseJson.response).toBe(`Document with ID ${getPostNoteResJson.insertedId} patched.`);
});


test("/patchNote - Patch with just content", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const contentNew = "newContent";

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

  const getPostNoteResJson = await postNoteRes.json();

  const response = await fetch(`${SERVER_URL}/patchNote/${getPostNoteResJson.insertedId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: contentNew,
    }),
  });

  const responseJson = await response.json();

  expect(response.status).toBe(200);
  expect(responseJson.response).toBe(`Document with ID ${getPostNoteResJson.insertedId} patched.`);
});


test("/deleteAllNotes - Delete one note", async () => {
  const title = "Title";
  const content = "Content";

  const postNoteOneRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const response = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseJson = await response.json();

  expect(response.status).toBe(200);
  expect(responseJson.response).toBe(`1 note(s) deleted.`);
});

 
test("/deleteAllNotes - Delete three notes", async () => {
  const title = ["1", "2", "3"];
  const content = ["a", "b", "c"];

  const postNoteOneRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title[0],
          content: content[0],
      }),
  });

  const postNoteTwoRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        title: title[1],
        content: content[1],
    }),
});

const postNoteThreeRes = await fetch(`${SERVER_URL}/postNote`, {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
  },
  body: JSON.stringify({
      title: title[2],
      content: content[2],
  }),
});

  const response = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseJson = await response.json();

  expect(response.status).toBe(200);
  expect(responseJson.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const contentNew = "newContent";

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

  const getPostNoteResJson = await postNoteRes.json();

  const response = await fetch(`${SERVER_URL}/updateNoteColor/${getPostNoteResJson.insertedId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        color: 'red',
    }),
});

const updateColorJson = await response.json();

expect(response.status).toBe(200);
expect(updateColorJson.message).toBe('Note color updated successfully.');
});