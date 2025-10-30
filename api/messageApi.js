export async function getMyMessages() {
  return [
    {
      _id: "m1",
      sender: { name: "Teacher" },
      receiver: { name: "You" },
      content: "Please submit",
      createdAt: new Date(),
    },
  ];
}
export async function sendMessage(payload) {
  return { ok: true, created: { ...payload, _id: "new-" + Date.now() } };
}
