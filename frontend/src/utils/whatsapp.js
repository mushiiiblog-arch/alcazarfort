// WhatsApp helpers
// Pakistan phone: 03492244011 -> international 923492244011

export const WHATSAPP_NUMBER = "923492244011";

export function waUrl(message = "") {
  const msg = message ? `&text=${encodeURIComponent(message)}` : "";
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}${msg}`;
}

export function openWhatsApp(message = "") {
  window.open(waUrl(message), "_blank", "noopener,noreferrer");
}

export function formatBookingMessage({
  name = "",
  email = "",
  phone = "",
  check_in,
  check_out,
  adults,
  children,
  rooms,
  room_type,
  message,
}) {
  const lines = [
    "Hello Al-Cazar Fort,",
    "",
    "I would like to enquire about a booking.",
    "",
  ];
  if (name) lines.push(`Name: ${name}`);
  if (email) lines.push(`Email: ${email}`);
  if (phone) lines.push(`Phone: ${phone}`);
  if (check_in) lines.push(`Check-in: ${check_in}`);
  if (check_out) lines.push(`Check-out: ${check_out}`);
  if (rooms) lines.push(`Rooms: ${rooms}`);
  if (adults) lines.push(`Adults: ${adults}`);
  if (children !== undefined && children !== null && children !== "") lines.push(`Children: ${children}`);
  if (room_type) lines.push(`Room type: ${room_type}`);
  if (message) {
    lines.push("");
    lines.push(`Notes: ${message}`);
  }
  lines.push("");
  lines.push("Please confirm availability and pricing. Thank you!");
  return lines.join("\n");
}

export function formatRoomBookingMessage(room) {
  return [
    "Hello Al-Cazar Fort,",
    "",
    `I am interested in booking the *${room.name}*.`,
    `Starting price: Rs ${room.priceFrom.toLocaleString()} / night`,
    "",
    "Please share availability and confirm the booking details.",
    "Thank you!",
  ].join("\n");
}
