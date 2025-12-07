export default async function page({ params }: { params: Promise<{ uuid: string }> }) {
  const uuid = (await params).uuid;

  return <div></div>;
}
