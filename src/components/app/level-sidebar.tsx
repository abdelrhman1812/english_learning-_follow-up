"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

interface Image {
  title: string;
  url: string;
}

interface Audio {
  title: string;
  url: string;
}

interface Session {
  id: string;
  name: string;
  plan: {
    images: Image[];
    audios: Audio[];
  };
  ebook: {
    images: Image[];
  };
  activities: {
    images: Image[];
  };
}

interface Unit {
  id: string;
  name: string;
  sessions: Session[];
}

interface Level {
  id: string;
  name: string;
  sub_name: string;
  units: Unit[];
}

interface LevelSidebarProps {
  levels: Level[];
}

export function LevelSidebar({ levels }: LevelSidebarProps) {
  const [expandedLevels, setExpandedLevels] = useState<number[]>([]);

  const toggleLevel = (levelIndex: number) => {
    if (expandedLevels.includes(levelIndex)) {
      setExpandedLevels(expandedLevels.filter((index) => index !== levelIndex));
    } else {
      setExpandedLevels([...expandedLevels, levelIndex]);
    }
  };

  return (
    <Sidebar className="border-r relative">
      <SidebarHeader className="border-b ">
        <div className="flex items-center gap-2 px-4 py-3">
          <GraduationCap className="h-6 w-6" />
          <div>
            <h2 className="text-lg font-semibold">EduDashboard</h2>
            <p className="text-xs text-muted-foreground">
              Language Learning Platform
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {levels.map((level, index) => (
            <SidebarMenuItem key={level.name}>
              <SidebarMenuButton
                onClick={() => toggleLevel(index)}
                className="justify-between"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <div>
                    <span>{level.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({level.sub_name})
                    </span>
                  </div>
                </div>
                {expandedLevels.includes(index) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </SidebarMenuButton>

              {expandedLevels.includes(index) && level.units.length > 0 && (
                <SidebarMenuSub>
                  {level.units.map((unit) => (
                    <div key={unit.name}>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton className="justify-between">
                          <span>{unit.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {unit.sessions.length}{" "}
                            {unit.sessions.length === 1
                              ? "session"
                              : "sessions"}
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </div>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
