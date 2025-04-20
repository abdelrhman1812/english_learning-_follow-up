"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import levelsData from "@/data/levels-data.json";
import {
  Award,
  BookOpen,
  Crown,
  GraduationCap,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const levelStyles = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    color:
      "from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30",
    iconClass: "text-blue-500",
  },
  {
    icon: <Star className="h-8 w-8" />,
    color:
      "from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30",
    iconClass: "text-purple-500",
  },
  {
    icon: <Award className="h-8 w-8" />,
    color:
      "from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30",
    iconClass: "text-orange-500",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    color:
      "from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30",
    iconClass: "text-green-500",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    color:
      "from-yellow-500/20 to-amber-500/20 hover:from-yellow-500/30 hover:to-amber-500/30",
    iconClass: "text-yellow-500",
  },
  {
    icon: <Crown className="h-8 w-8" />,
    color:
      "from-indigo-500/20 to-violet-500/20 hover:from-indigo-500/30 hover:to-violet-500/30",
    iconClass: "text-indigo-500",
  },
];

export default function LevelsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8 pb-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Follow-up system.
          </h1>
          <p className="text-muted-foreground">
            Choose a level below to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelsData.levels.map((level, index) => {
            const style = levelStyles[index] || levelStyles[0];

            return (
              <Card
                key={index}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl border-none bg-gradient-to-br ${style.color}`}
              >
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 opacity-0 group-hover:opacity-10 transition-opacity" />

                <CardHeader className="space-y-1 flex items-start justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold relative z-50">
                      <Link href={`/levels/${level.id}`}>{level.name}</Link>
                    </CardTitle>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors bg-primary text-primary-foreground">
                      {level.sub_name}
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-full bg-background/80 backdrop-blur-sm ${style.iconClass}`}
                  >
                    {style.icon}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This level includes {level.units.length} unit(s).
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
