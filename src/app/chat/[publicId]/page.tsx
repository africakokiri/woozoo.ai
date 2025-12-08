export default async function chatPage(props: { params: Promise<{ publicId: string }> }) {
  const publicId = await props.params;

  return <div></div>;
}
