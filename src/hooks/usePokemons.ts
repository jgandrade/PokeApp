import { useSelector } from "react-redux";

export default function useDetails() {
  const { count, pages, pageData } = useSelector((state: any) => state.pokemon);
  return { count, pages, pageData };
}
