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
import Link from "next/link";
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
    <Sidebar className="border-r border-border relative   bg-sidebar">
      <SidebarHeader className="border-b border-border mb-10">
        <div className="flex items-center gap-3 px-5 py-1">
          <GraduationCap className="h-7 w-7 text-primary" />
          <div>
            <Link href={"/"} className="text-xl font-semibold text-foreground">
              EduDashboard
            </Link>
            <p className="text-sm text-muted-foreground">
              Language Learning Platform
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {levels.map((level, index) => (
            <SidebarMenuItem key={level.name} className="hover:bg-accent">
              <SidebarMenuButton
                onClick={() => toggleLevel(index)}
                className="justify-between hover:bg-accent/90 text-base"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-foreground text-base">
                      {level.name}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({level.sub_name})
                    </span>
                  </div>
                </div>
                {expandedLevels.includes(index) ? (
                  <ChevronDown className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-primary" />
                )}
              </SidebarMenuButton>

              {expandedLevels.includes(index) && level.units.length > 0 && (
                <SidebarMenuSub className="bg-accent/50">
                  {level.units.map((unit) => (
                    <div key={unit.name}>
                      <SidebarMenuSubItem className="hover:bg-accent/70">
                        <SidebarMenuSubButton className="justify-between text-base">
                          <span className="text-foreground">{unit.name}</span>
                          <span className="text-sm text-muted-foreground">
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
