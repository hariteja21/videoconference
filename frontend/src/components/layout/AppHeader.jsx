import React from "react";

export default function AppHeader({ title, subtitle, children }) {
  return (
    <header className="appHeader">
      <div className="appHeaderBrand">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="appHeaderActions">{children}</div>
    </header>
  );
}
