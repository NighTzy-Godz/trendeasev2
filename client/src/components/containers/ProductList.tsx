import React from "react";

interface ProductListProp {
  children: React.ReactNode;
}

function ProductList({ children }: ProductListProp) {
  return (
    <div className="w-3/4">
      <div className="grid grid-cols-4 gap-5">{children}</div>
    </div>
  );
}

export default ProductList;
