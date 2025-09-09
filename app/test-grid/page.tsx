"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";

export default function TestGridPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Test Interactive Grid Pattern</h1>
        
        {/* Test 1: Exemple de base comme dans la doc */}
        <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background mb-8">
          <InteractiveGridPattern
            className={cn(
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            )}
            width={20}
            height={20}
            squares={[80, 80]}
            squaresClassName="hover:fill-blue-500"
          />
          <div className="z-10 text-center">
            <p className="text-lg font-semibold">Test 1: Exemple de base</p>
            <p className="text-sm text-muted-foreground">Survol en bleu</p>
          </div>
        </div>

        {/* Test 2: Version adaptée aux thèmes */}
        <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-muted/50 mb-8">
          <InteractiveGridPattern
            className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
            width={30}
            height={30}
            squares={[50, 30]}
            squaresClassName="hover:fill-gray-500/50 dark:hover:fill-gray-400/30 stroke-gray-600/30 dark:stroke-gray-400/20"
          />
          <div className="z-10 text-center">
            <p className="text-lg font-semibold">Test 2: Version thèmes</p>
            <p className="text-sm text-muted-foreground">Survol en gris adaptatif</p>
          </div>
        </div>

        {/* Test 3: Version simplifiée */}
        <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-card">
          <InteractiveGridPattern
            width={25}
            height={25}
            squares={[40, 25]}
            squaresClassName="hover:fill-red-500/50"
          />
          <div className="z-10 text-center">
            <p className="text-lg font-semibold">Test 3: Version simple</p>
            <p className="text-sm text-muted-foreground">Survol en rouge, sans masque</p>
          </div>
        </div>
      </div>
    </div>
  );
}