import { MutatingDots } from "react-loader-spinner";

function Loader() {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#FF0000"
      secondaryColor="#FF0000"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}

export default Loader;
