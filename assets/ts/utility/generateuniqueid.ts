function generate_unique_id(): string {
  const today: Date = new Date();
  const id_pt1: string = today.getTime().toString();
  const id_pt2: string = Math.random().toString().replace(".", "");
  return id_pt1 + id_pt2;
}

export { generate_unique_id };
