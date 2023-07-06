import React, { Fragment } from "react";

const DashboardPageContainer = ({
  title,
  headerActions,
  children,
}: {
  title: string;
  headerActions?: React.ReactNode[];
  children: React.ReactNode;
}) => {
  return (
    <div className="card shadow-lg mb-5">
      <div className="card-header p-0  mx-3 z-index-2 bg-transparent">
        <div className="bg-gradient-primary shadow-primary border-radius-lg p-3 d-flex align-items-center justify-content-between">
          <h3 className="text-white mb-0">{title}</h3>
          {headerActions?.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </div>
      </div>
      <div className="card-body p-3">{children}</div>
    </div>
  );
};

export default DashboardPageContainer;
