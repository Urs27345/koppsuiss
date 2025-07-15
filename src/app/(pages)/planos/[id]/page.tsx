import React from "react";
import Department from "../../../../components/pages/department";

const Planos = ({ params }: { params: { id: string } }) => {
  return <Department id={params.id} />;
};

export default Planos;
