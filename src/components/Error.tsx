import React from "react";

function Error({ err }: { err: any }) {
  return (
    <div>
      Something Went Wrong. See error below:
      <p>{err}</p>
    </div>
  );
}

export default Error;
