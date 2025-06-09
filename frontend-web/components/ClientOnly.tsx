"use client";

import * as React from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}
