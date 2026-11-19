import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useMachine } from "@xstate/react";
import NavBar from "../NavBar";
import { notificationsMachine } from "../../machines/notificationsMachine";

const NavBarWithNotifications: React.FC<{ results?: unknown[] }> = ({ results }) => {
  const [, , notificationsService] = useMachine(notificationsMachine, {
    context: { results },
  });

  return (
    <MemoryRouter>
      <NavBar
        drawerOpen={false}
        toggleDrawer={() => {}}
        notificationsService={notificationsService}
      />
    </MemoryRouter>
  );
};

describe("NavBar Notifications link", () => {
  test("has the accessible name Notifications when there is no badge count", () => {
    render(<NavBarWithNotifications results={[]} />);

    expect(screen.getByRole("link", { name: "Notifications" })).toBeInTheDocument();
  });

  test("keeps the accessible name Notifications when the badge shows a count", () => {
    render(<NavBarWithNotifications results={[{ id: "notification-1" }]} />);

    const link = screen.getByRole("link", { name: "Notifications" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/notifications");
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
