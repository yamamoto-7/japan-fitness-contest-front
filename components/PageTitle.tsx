export default function PageTitle({ title }: { title: string; }) {
    return (
        <h1 className="text-2xl font-bold mb-6 text-black">{title}</h1>
    );
}
  