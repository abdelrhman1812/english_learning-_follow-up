"use client";

import { LevelSidebar } from "@/components/app/level-sidebar";
import levelsData from "@/data/levels-data.json";

export function DashboardShell() {
  return <LevelSidebar levels={levelsData.levels} />;
}

{
  /* <div className="flex-1 overflow-auto">
    {selectedSession ? (
      <SessionContent session={selectedSession} />
    ) : (
      <EmptyState
        title={
          selectedLevel !== null
            ? "Select a unit to begin"
            : "Select a level to begin"
        }
        description={
          selectedLevel !== null
            ? "Choose a unit from the sidebar to view its sessions"
            : "Choose a level from the sidebar to explore its units and sessions"
        }
      />
    )}
  </div> */
}
