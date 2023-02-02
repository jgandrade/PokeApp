import { useSelector } from "react-redux";

export default function useDetails() {
  const { name, image, favorites } = useSelector((state: any) => state.user);
  return { name, image, favorites };
}
