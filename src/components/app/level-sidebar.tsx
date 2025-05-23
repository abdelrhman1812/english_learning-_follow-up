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
    setExpandedLevels((prev) =>
      prev.includes(levelIndex)
        ? prev.filter((index) => index !== levelIndex)
        : [...prev, levelIndex]
    );
  };

  return (
    <Sidebar className="border-r relative border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="border-b border-border/50 sticky top-0 bg-background/95 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <GraduationCap className="h-6 w-6 text-primary" />
          <div>
            <Link
              href="/"
              className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            >
              EduDashboard
            </Link>
            <p className="text-xs text-muted-foreground">
              Language Learning Platform
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-8">
        <SidebarMenu className="space-y-1 px-2">
          {levels.map((level, index) => (
            <SidebarMenuItem key={level.id}>
              <SidebarMenuButton
                onClick={() => toggleLevel(index)}
                className="w-full justify-between px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <span className="text-sm font-medium">{level.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {level.sub_name}
                    </span>
                  </div>
                </div>
                {expandedLevels.includes(index) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </SidebarMenuButton>

              {expandedLevels.includes(index) && (
                <SidebarMenuSub className="mt-1 pl-6 border-l-2 border-muted/50">
                  {level.units.map((unit) => (
                    <SidebarMenuSubItem key={unit.id} className="relative">
                      <SidebarMenuSubButton className="w-full px-3 py-2 text-sm rounded-md hover:bg-accent/30 hover:text-accent-foreground transition-colors group">
                        <div className="flex items-center justify-between w-full">
                          <Link
                            href={`/levels/${level.id}`}
                            className="flex-1 text-left group-hover:text-primary transition-colors"
                          >
                            {unit.name}
                          </Link>
                          <span className="ml-2 text-xs bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-full">
                            {unit.sessions.length}{" "}
                            {unit.sessions.length === 1
                              ? "session"
                              : "sessions"}
                          </span>
                        </div>
                        {/* Active indicator */}
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
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
