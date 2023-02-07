import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Page({ page }: { page: number }) {
  const { page: urlPage } = useParams();
  const isActive = page === Number(urlPage);
  return (
    <Link
      style={isActive ? { backgroundColor: "#F15B6C", color: "white" } : {}}
      to={`/library/${page}`}
      className="border w-10 py-2 text-center text-white font-bold rounded-xl gen-btn"
    >
      {page}
    </Link>
  );
}

export default Page;
