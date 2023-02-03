import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Page({ page }: { page: number }) {
  const { page: urlPage } = useParams();
  const isActive = page === Number(urlPage);
  return (
    <Link
      style={isActive ? { backgroundColor: "red", color: "white" } : {}}
      to={`/library/${page}`}
      className="border w-10 text-center"
    >
      {page}
    </Link>
  );
}

export default Page;
