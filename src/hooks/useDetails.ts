import { useSelector } from "react-redux";

export default function useDetails() {
  const { name, photo, favorites, id } = useSelector(
    (state: any) => state.user
  );
  return { name, photo, favorites, id };
}
