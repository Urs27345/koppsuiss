import React from "react";
import PageHeaderContent from "../../components/module/pageHeaderContent";

export default function PageHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PageHeaderContent />
      {children}
    </div>
  );
}
