import React from "react";

export default function Error({ error, errors }) {
  if (errors && errors.length) {
    return (
      <div className="alert alert-danger alert-class" role="alert">
        {errors.map((err) => (
          <div>{err}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="alert alert-danger alert-class" role="alert">
      {error}
    </div>
  );
}
